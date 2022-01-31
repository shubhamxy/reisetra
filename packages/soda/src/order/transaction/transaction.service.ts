/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpService, Injectable } from '@nestjs/common'

import { AxiosResponse } from 'axios'
import { errorCodes } from 'src/core/codes/error'
import {
    CursorPagination,
    CursorPaginationResultInterface,
} from 'src/core/pagination'
import { CustomError } from 'src/core/response'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { CacheService } from 'src/core/modules/cache/cache.service'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { UpdateTransactionDTO } from './dto'
import { Transaction } from './entity'
import { createHmac } from 'crypto'
import { ConfigService } from '@nestjs/config'
import { ServicesEnv } from 'src/config'
import { nanoid } from 'nanoid'
import { Order } from 'src/order/entity'
import { Address } from 'src/master/address/entity'
import { User } from 'src/user/entity'
import { sendEmail, transactionEmail } from 'src/utils'

interface RazororpayOrderResponse {
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
    constructor(
        private readonly db: PrismaService,
        private readonly cache: CacheService,
        private httpService: HttpService,
        private config: ConfigService
    ) {}

    async allTransactions(
        options: CursorPagination
    ): Promise<CursorPaginationResultInterface<Partial<Transaction>>> {
        try {
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = 'desc',
            } = options
            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: 'transaction',
                prisma: this.db,
            })
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.allTransactions'
            )
        }
    }

    async transactions(
        options: CursorPagination,
        userId: string
    ): Promise<CursorPaginationResultInterface<Partial<Transaction>>> {
        try {
            const {
                cursor,
                size = 10,
                buttonNum = 10,
                orderBy = 'createdAt',
                orderDirection = 'desc',
            } = options

            const result = await prismaOffsetPagination({
                cursor,
                size: Number(size),
                buttonNum: Number(buttonNum),
                orderBy,
                orderDirection,
                model: 'transaction',
                where: {
                    userId,
                },
                prisma: this.db,
            })
            return result
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.allTransactions'
            )
        }
    }

    async transaction(transactionId: string): Promise<Transaction> {
        const product = await this.db.transaction.findUnique({
            where: { id: transactionId },
        })
        if (!product) {
            throw new CustomError(
                'Transaction does not exist',
                errorCodes.RecordDoesNotExist
            )
        }
        return product
    }

    async createTransaction(
        user: User & {
            orders: (Order & {
                transaction: Transaction
                address: Address
            })[]
        }
    ): Promise<Order & { razorpayOptions: Record<string, any> }> {
        try {
            console.log('createTransaction::started')
            const order = user.orders[0]
            if (!order.grandTotal) {
                throw new CustomError(
                    'Calculation error please try again',
                    errorCodes.BillingCalculationError,
                    'TransactionService.createTransaction'
                )
            }

            const servicesConfig = this.config.get<ServicesEnv>('services')
            const { razorpayKeyId, razorpaySecretKey } = servicesConfig.razorpay
            console.log('createTransaction::razorpay::started', razorpayKeyId)
            const response: AxiosResponse<RazororpayOrderResponse> = await this.httpService
                .post<RazororpayOrderResponse>(
                    'https://api.razorpay.com/v1/orders',
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
            console.log(
                'createTransaction::razorpay::data',
                JSON.stringify(razorpayData, null, 4)
            )
            if (razorpayData?.status === 'created') {
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
                                        type: 'RAZORPAY',
                                        status: 'PENDING',
                                        userId: user.id,
                                    },
                                    update: {
                                        paymentOrderId: razorpayData.id,
                                        receipt: razorpayData.receipt,
                                        notes: razorpayData.notes,
                                        currency: razorpayData.currency,
                                        amount: razorpayData.amount,
                                        type: 'RAZORPAY',
                                        status: 'PENDING',
                                        userId: user.id,
                                    },
                                },
                            },
                        },
                    })
                    console.log(
                        'createTransaction::razorpay::order.update',
                        JSON.stringify(product, null, 4)
                    )
                    const razorpayOptions = {
                        key: razorpayKeyId,
                        amount: product.transaction.amount,
                        currency: product.transaction.currency,
                        name: this.config.get<string>('services.razorpay.name'),
                        description: this.config.get<string>(
                            'services.razorpay.description'
                        ),
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
                    console.log(
                        'createTransaction::razorpay::order.update::error',
                        JSON.stringify(error, null, 4)
                    )
                    throw new CustomError(
                        error?.meta?.cause || error.message,
                        error.code,
                        'TransactionService.createTransaction.database'
                    )
                }
            } else {
                console.log('createTransaction::razorpay::data::error')
                throw new CustomError(
                    'Razorpay failed, please try again',
                    errorCodes.RazorPayFailure,
                    'TransactionService.createTransaction.razorpay'
                )
            }
        } catch (error) {
            console.log(
                'createTransaction::transaction::data',
                JSON.stringify(error, null, 4)
            )
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.createTransaction.razorpay'
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
                        address: true,
                        transaction: true,
                    },
                },
            },
        })

        if (!user) {
            throw new CustomError(
                'User does not exist',
                errorCodes.UserNotFound,
                'TransactionService.createTransaction'
            )
        }

        if (!user.orders[0]?.id) {
            throw new CustomError(
                'Order does not exist with user',
                errorCodes.OrderDoesNotExistWithUser,
                'TransactionService.createTransaction'
            )
        }

        const order = user.orders[0]

        if (order.transaction.status === 'SUCCESS') {
            throw new CustomError(
                'Transaction already Succeded',
                errorCodes.TransactionAlreadySucceded,
                'TransactionService.createTransaction'
            )
        }

        try {
            const servicesConfig = this.config.get<ServicesEnv>('services')
            const { razorpayKeyId, razorpaySecretKey } = servicesConfig.razorpay
            const response: AxiosResponse<RazororpayOrderResponse> = await this.httpService
                .post<RazororpayOrderResponse>(
                    'https://api.razorpay.com/v1/orders',
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
            if (razorpayData.status === 'created') {
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
                                        type: 'RAZORPAY',
                                        status: 'PENDING',
                                        userId,
                                    },
                                    update: {
                                        paymentOrderId: razorpayData.id,
                                        receipt: razorpayData.receipt,
                                        notes: razorpayData.notes,
                                        currency: razorpayData.currency,
                                        amount: razorpayData.amount,
                                        type: 'RAZORPAY',
                                        status: 'PENDING',
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
                        name: this.config.get<string>('app.name'),
                        description: this.config.get<string>('app.description'),
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
                    throw new CustomError(
                        error?.meta?.cause || error.message,
                        error.code,
                        'TransactionService.createTransaction.database'
                    )
                }
            } else {
                throw new CustomError(
                    'Razorpay failed, please try again',
                    errorCodes.RazorPayFailure,
                    'TransactionService.createTransaction.razorpay'
                )
            }
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.createTransaction.razorpay'
            )
        }
    }

    async updateTransaction(
        transactionId: string,
        update: UpdateTransactionDTO
    ): Promise<Transaction> {
        try {
            const { razorpaySecretKey } = this.config.get<ServicesEnv>(
                'services'
            ).razorpay
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
                        type: 'RAZORPAY',
                        status: 'SUCCESS',
                    },
                    include: {
                        user: {
                            select: {
                                email: true,
                                id: true,
                            },
                        },
                        order: {
                            include: {
                                address: true,
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
                    const response = await sendEmail(
                        transactionEmail({
                            id: updatedData.user.id,
                            subject: `Your Reisetra.com order #${
                                updatedData.order.id
                            } received for ${
                                updatedData.order.cart.items.length
                            } item${
                                updatedData.order.cart.items.length > 1
                                    ? 's'
                                    : ''
                            }`,
                            description: `Thank you for shopping with us. We'd like to let you know that we have received your order, and is preparing it for shipment. If you would like to view the status of your order or make any changes to it, please visit Your Orders on reisetra.com.`,
                            orderId: updatedData.order.id,
                            address: `${updatedData.order.address.address}, ${updatedData.order.address.region}, ${updatedData.order.address.nearby},  ${updatedData.order.address.city}, ${updatedData.order.address.state},   ${updatedData.order.address.country}, ${updatedData.order.address.zipcode}`,
                            email: updatedData.order.address.email,
                            phone: updatedData.order.address.phone,
                            status: `Your Reisetra.com order #${
                                updatedData.order.id
                            } received for ${
                                updatedData.order.cart.items.length
                            } item${
                                updatedData.order.cart.items.length > 1
                                    ? 's'
                                    : ''
                            }.`,
                            transaction: {
                                id: updatedData.id,
                                grandTotal: updatedData.order.grandTotal,
                                shipping: updatedData.order.shipping,
                                subTotal: updatedData.order.subTotal,
                                taxes: updatedData.order.tax,
                            },
                            orderItems: updatedData.order.cart.items.map(
                                (item) => ({
                                    sku: item.product.inventory.sku,
                                    title: item.product.title,
                                    options: item.size + ' - ' + item.color,
                                    qty: item.quantity,
                                })
                            ),
                        })
                    )
                } catch (error) {
                    console.log(error)
                }
                return updatedData
            } else {
                const updatedData = await this.db.transaction.update({
                    where: { id: transactionId },
                    data: {
                        paymentId: update.paymentId,
                        paymentSignature: update.paymentSignature,
                        type: 'RAZORPAY',
                        status: 'FAILED',
                    },
                })
                return updatedData
            }
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.updateTransaction'
            )
        }
    }

    async deleteTransaction(transactionId: string): Promise<Transaction> {
        try {
            const data = await this.db.transaction.delete({
                where: { id: transactionId },
            })
            return data
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'TransactionService.deleteTransaction'
            )
        }
    }
}
