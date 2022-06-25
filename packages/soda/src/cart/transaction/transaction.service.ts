/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService, Injectable, Logger } from '@nestjs/common'

import { AxiosResponse } from 'axios'
import {
  AppError,
  BillingCalculationError,
  CursorPagination,
  CursorPaginationResultInterface,
  OrderDoesNotExistWithUser,
  RazorPayFailure,
  RecordDoesNotExist,
  TransactionAlreadySucceded,
  UserNotFound,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import { UpdateTransactionDTO } from './dto'
import { Transaction } from './entity'
import { createHmac } from 'crypto'
import { ConfigService } from '@nestjs/config'
import { Config, ServicesEnv } from '@app/config'
import { nanoid } from 'nanoid'
import { Order } from 'src/order/entity'
import { AuthService } from '@app/auth'
import { AWSService } from '@app/aws'
import { User } from '@app/user'
import { TemplateService } from '@app/aws/template.service'
import { ErrorHandler } from '@app/core/decorators'
import {
  CALCULATION_ERROR,
  CREATED,
  CREATED_AT,
  DESC,
  ORDER_DOES_NOT_EXIST,
  RAZORPAY,
  RAZORPAY_ERROR,
  TRANSACTION,
  TRANSACTION_ALREADY_SUCCEDED,
  TRANSACTION_DOES_NOT_EXIST,
  USER_DOES_NOT_EXIST,
} from './transaction.const'
import {
  TransactionStatus,
  Address,
  Locality,
  State,
  Country,
} from '@prisma/client'

interface RazorpayOrderResponse {
  id: string
  entity: string
  amount: number
  amount_paid: 0
  amount_due: number
  currency: string
  receipt: string
  offer_id: string
  status: string
  attempts: number
  notes: any
  created_at: number
}

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(AWSService.name)
  private readonly servicesConfig: ServicesEnv
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService,
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService
  ) {
    this.servicesConfig = this.config.get<ServicesEnv>(Config.services)
  }

  @ErrorHandler()
  async allTransactions(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Partial<Transaction>>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options
    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: TRANSACTION,
      prisma: this.db,
    })
  }

  @ErrorHandler()
  async transactions(
    options: CursorPagination,
    userId: string
  ): Promise<CursorPaginationResultInterface<Partial<Transaction>>> {
    const {
      cursor,
      size = 10,
      buttonNum = 10,
      orderBy = CREATED_AT,
      orderDirection = DESC,
    } = options

    return await prismaOffsetPagination({
      cursor,
      size: Number(size),
      buttonNum: Number(buttonNum),
      orderBy,
      orderDirection,
      model: TRANSACTION,
      where: {
        userId,
      },
      prisma: this.db,
    })
  }

  async transaction(transactionId: string): Promise<Transaction> {
    const product = await this.db.transaction.findUnique({
      where: { id: transactionId },
    })
    if (!product) {
      throw new AppError(TRANSACTION_DOES_NOT_EXIST, RecordDoesNotExist)
    }
    return product
  }

  @ErrorHandler()
  async createTransaction(
    user: User & {
      orders: (Order & {
        transaction: Transaction
        address: Address & {
          state: State
          country: Country
        }
      })[]
    }
  ): Promise<Order & { razorpayOptions: Record<string, any> }> {
    const order = user.orders[0]
    if (!order.grandTotal) {
      throw new AppError(
        CALCULATION_ERROR,
        BillingCalculationError,
        this.createTransaction.name
      )
    }

    const {
      razorpayKeyId,
      razorpaySecretKey,
      razorpayOrderAPI,
    } = this.servicesConfig.razorpay
    const response: AxiosResponse<RazorpayOrderResponse> = await this.httpService
      .post<RazorpayOrderResponse>(
        razorpayOrderAPI,
        {
          amount: order.grandTotal * 100,
          currency: 'INR',
          receipt: 'rcpt_' + nanoid(10),
        },
        {
          auth: {
            username: razorpayKeyId,
            password: razorpaySecretKey,
          },
        }
      )
      .toPromise()

    const razorpayData = response.data
    if (razorpayData?.status === CREATED) {
      try {
        const product = await this.db.order.update({
          where: {
            id: order.id,
          },
          include: {
            transaction: true,
          },
          data: {
            transaction: {
              upsert: {
                create: {
                  paymentOrderId: razorpayData.id,
                  receipt: razorpayData.receipt,
                  notes: razorpayData.notes,
                  currency: razorpayData.currency,
                  amount: razorpayData.amount,
                  type: RAZORPAY,
                  status: TransactionStatus.PENDING,
                  userId: user.id,
                },
                update: {
                  paymentOrderId: razorpayData.id,
                  receipt: razorpayData.receipt,
                  notes: razorpayData.notes,
                  currency: razorpayData.currency,
                  amount: razorpayData.amount,
                  type: RAZORPAY,
                  status: TransactionStatus.PENDING,
                  userId: user.id,
                },
              },
            },
          },
        })
        const razorpayOptions = {
          key: razorpayKeyId,
          amount: product.transaction.amount,
          currency: product.transaction.currency,
          name: this.config.get<ServicesEnv>(Config.services).razorpay.name,
          description: this.config.get<ServicesEnv>(Config.services).razorpay
            .description,
          order_id: product.transaction.paymentOrderId,
          prefill: {
            name: user.name,
            email: user.email,
            contact: order.address.phone || user.phone || '',
          },
          notes: [
            ...razorpayData.notes,
            { userId: user.id, addressId: order.address.id },
          ],
          theme: {
            color: '#000000',
          },
        }
        return { ...product, razorpayOptions }
      } catch (error) {
        throw new AppError(
          error?.meta?.cause || error.message,
          error.code,
          this.createTransaction.name
        )
      }
    } else {
      throw new AppError(
        RAZORPAY_ERROR,
        RazorPayFailure,
        this.createTransaction.name
      )
    }
  }

  async createTransactionFromOrderId(
    userId: string,
    data: { orderId: any }
  ): Promise<Order & { razorpayOptions: Record<string, any> }> {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          where: {
            id: data.orderId,
          },
          include: {
            address: {
              include: {
                state: true,
                country: true,
              },
            },
            transaction: true,
          },
        },
      },
    })

    if (!user) {
      throw new AppError(
        USER_DOES_NOT_EXIST,
        UserNotFound,
        this.createTransaction.name
      )
    }

    if (!user.orders[0]?.id) {
      throw new AppError(
        ORDER_DOES_NOT_EXIST,
        OrderDoesNotExistWithUser,
        this.createTransaction.name
      )
    }

    const order = user.orders[0]

    if (order.transaction.status === TransactionStatus.SUCCESS) {
      throw new AppError(
        TRANSACTION_ALREADY_SUCCEDED,
        TransactionAlreadySucceded,
        this.createTransaction.name
      )
    }

    try {
      const servicesConfig = this.config.get<ServicesEnv>(Config.services)
      const {
        razorpayKeyId,
        razorpaySecretKey,
        razorpayOrderAPI,
      } = servicesConfig.razorpay
      const response: AxiosResponse<RazorpayOrderResponse> = await this.httpService
        .post<RazorpayOrderResponse>(
          razorpayOrderAPI,
          {
            amount: order.grandTotal,
            currency: 'INR',
            receipt: 'rcpt_' + nanoid(10),
          },
          {
            auth: {
              username: razorpayKeyId,
              password: razorpaySecretKey,
            },
          }
        )
        .toPromise()

      const razorpayData = response.data
      if (razorpayData.status === CREATED) {
        try {
          const product = await this.db.order.update({
            where: {
              id: data.orderId,
            },
            include: {
              transaction: true,
            },
            data: {
              transaction: {
                upsert: {
                  create: {
                    paymentOrderId: razorpayData.id,
                    receipt: razorpayData.receipt,
                    notes: razorpayData.notes,
                    currency: razorpayData.currency,
                    amount: razorpayData.amount,
                    type: RAZORPAY,
                    status: TransactionStatus.PENDING,
                    userId,
                  },
                  update: {
                    paymentOrderId: razorpayData.id,
                    receipt: razorpayData.receipt,
                    notes: razorpayData.notes,
                    currency: razorpayData.currency,
                    amount: razorpayData.amount,
                    type: RAZORPAY,
                    status: TransactionStatus.PENDING,
                    userId,
                  },
                },
              },
            },
          })
          const razorpayOptions = {
            key: razorpayKeyId,
            amount: product.transaction.amount,
            currency: product.transaction.currency,
            name: this.config.get<ServicesEnv>(Config.services).razorpay.name,
            description: this.config.get<ServicesEnv>(Config.services).razorpay
              .description,
            order_id: product.transaction.paymentOrderId,
            prefill: {
              name: user.name,
              email: user.email,
              contact: user.phone,
            },
            notes: [...razorpayData.notes, { userId }],
            theme: {
              color: '#3399cc',
            },
          }
          return { ...product, razorpayOptions }
        } catch (error) {
          throw new AppError(error?.meta?.cause || error.message, error.code)
        }
      } else {
        throw new AppError(RAZORPAY_ERROR, RazorPayFailure)
      }
    } catch (error) {
      throw new AppError(error?.meta?.cause || error.message, error.code)
    }
  }

  @ErrorHandler()
  async updateTransaction(
    transactionId: string,
    update: UpdateTransactionDTO
  ): Promise<Transaction> {
    const { razorpaySecretKey } = this.servicesConfig.razorpay
    const data = await this.db.transaction.findUnique({
      where: { id: transactionId },
    })
    const generatedSignature = createHmac('sha256', razorpaySecretKey)
      .update(data.paymentOrderId + '|' + update.paymentId)
      .digest('hex')
    if (generatedSignature === update.paymentSignature) {
      const updatedData = await this.db.transaction.update({
        where: { id: transactionId },
        data: {
          order: {
            update: {
              cart: {
                update: {
                  checkedOut: true,
                },
              },
              user: {
                update: {
                  cart: {
                    create: {},
                  },
                },
              },
            },
          },
          paymentId: update.paymentId,
          paymentSignature: update.paymentSignature,
          verified: true,
          type: RAZORPAY,
          status: TransactionStatus.SUCCESS,
        },
        include: {
          user: {
            select: {
              email: true,
              username: true,
            },
          },
          order: {
            include: {
              address: {
                include: {
                  state: true,
                  country: true,
                },
              },
              cart: {
                select: {
                  items: {
                    select: {
                      color: true,
                      size: true,
                      quantity: true,
                      product: {
                        include: {
                          inventory: {
                            select: {
                              sku: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      })
      try {
        const response = await this.aws.sendEmail(
          await this.template.transactionEmail({
            username: updatedData.user.username,
            subject: `Your Reisetra.com order #${
              updatedData.order.id
            } received for ${updatedData.order.cart.items.length} item${
              updatedData.order.cart.items.length > 1 ? 's' : ''
            }`,
            description: `Thank you for shopping with us. We'd like to let you know that we have received your order, and is preparing it for shipment. If you would like to view the status of your order or make any changes to it, please visit Your Orders on reisetra.com.`,
            orderId: updatedData.order.id,
            address: `${updatedData.order.address.address}, ${updatedData.order.address.region}, ${updatedData.order.address.nearby},  ${updatedData.order.address.locality}, ${updatedData.order.address.state.name},   ${updatedData.order.address.country.name}, ${updatedData.order.address.zipcode}`,
            email: updatedData.order.address.email,
            phone: updatedData.order.address.phone,
            status: `Your Reisetra.com order #${
              updatedData.order.id
            } received for ${updatedData.order.cart.items.length} item${
              updatedData.order.cart.items.length > 1 ? 's' : ''
            }.`,
            transaction: {
              id: updatedData.id,
              grandTotal: updatedData.order.grandTotal,
              shipping: updatedData.order.shipping,
              subTotal: updatedData.order.subTotal,
              taxes: updatedData.order.tax,
            },
            orderItems: updatedData.order.cart.items.map((item) => ({
              sku: item.product.inventory.sku,
              title: item.product.title,
              options: item.size + ' - ' + item.color,
              qty: item.quantity,
            })),
          })
        )
      } catch (error) {
        this.logger.log(error)
      }
      return updatedData
    } else {
      return await this.db.transaction.update({
        where: { id: transactionId },
        data: {
          paymentId: update.paymentId,
          paymentSignature: update.paymentSignature,
          type: RAZORPAY,
          status: TransactionStatus.FAILED,
        },
      })
    }
  }

  @ErrorHandler()
  async deleteTransaction(transactionId: string): Promise<Transaction> {
    return await this.db.transaction.delete({
      where: { id: transactionId },
    })
  }
}
