/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Prisma } from '@prisma/client'
import { Product } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  AppError,
  errorCodes,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import { GetAllOrdersDocumentsDTO, OrderDTO } from './dto'
import { File } from '@app/master'
import { AuthService } from '@app/auth'
import { AWSService } from '@app/aws'
import { TemplateService } from '@app/aws/template.service'

@Injectable()
export class OrderService {
  constructor(
    private readonly db: DbService,
    private readonly cache: CacheService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService
  ) {}

  async getAllOrders(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options
      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'order',
        include: {
          address: {
            include: {
              locality: true,
              state: true,
              country: true,
            },
          },
          user: true,
          cart: {
            include: {
              items: true,
            },
          },
          documents: {
            where: {
              meta: {
                path: ['invoice'],
                equals: true,
              },
            },
          },
        },
        where: {
          transaction: {
            status: 'SUCCESS',
          },
          active: true,
        },
        prisma: this.db,
      })
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.getAllOrders'
      )
    }
  }

  async getUserOrders(
    userId: string,
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Partial<Product>>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options
      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'order',
        where: {
          transaction: {
            status: 'SUCCESS',
          },
          userId,
          active: true,
        },
        include: {
          cart: {
            include: {
              items: true,
            },
          },
          address: {
            include: {
              locality: true,
              state: true,
              country: true,
            },
          },
          user: true,
          documents: {
            where: {
              meta: {
                path: ['invoice'],
                equals: true,
              },
            },
          },
        },
        prisma: this.db,
      })
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.getAllOrders'
      )
    }
  }

  async getOrder(id: string): Promise<any> {
    try {
      const product = await this.db.order.findUnique({
        where: { id },
        include: {
          cart: {
            include: {
              items: {
                select: {
                  active: true,
                  productId: true,
                  quantity: true,
                  size: true,
                  createdAt: true,
                  updatedAt: true,
                  product: {
                    select: {
                      slug: true,
                      title: true,
                      description: true,
                      brand: true,
                      mrp: true,
                      price: true,
                      id: true,
                      images: {
                        select: {
                          url: true,
                          fileType: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          address: {
            include: {
              state: true,
              country: true,
            },
          },
          transaction: {
            select: {
              id: true,
              notes: true,
              verified: true,
              status: true,
              type: true,
              amount: true,
              active: true,
            },
          },
          documents: {
            where: {
              meta: {
                path: ['invoice'],
                equals: true,
              },
            },
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      if (!product) {
        throw new AppError(
          'Order does not exist',
          errorCodes.RecordDoesNotExist
        )
      }
      return product
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.getOrder'
      )
    }
  }

  async getOrderDocuments(
    id: string,
    options: GetAllOrdersDocumentsDTO
  ): Promise<CursorPaginationResultInterface<Partial<File>>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options
      return await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'file',
        where: {
          orderId: id,
          fileType: 'documents',
          active: true,
        },
        prisma: this.db,
      })
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.getOrderDocuments'
      )
    }
  }

  async createOrder(userId: string, data: OrderDTO): Promise<any> {
    try {
      return await this.db.order.create({
        data: {
          ...data,
          userId: userId,
        },
        include: {
          address: {
            include: {
              state: true,
              country: true,
            },
          },
          user: true,
        },
      })
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.createOrder'
      )
    }
  }

  async updateOrder(
    orderId: string,
    update: OrderDTO,
    userId: string
  ): Promise<any> {
    try {
      const {
        title,
        description,
        sendUpdate,
        status,
        documents,
        ...orderData
      } = update
      const updateData: Prisma.XOR<
        Prisma.OrderUpdateInput,
        Prisma.OrderUncheckedUpdateInput
      > = {}

      if (documents && documents.length > 0) {
        updateData.documents = {
          connectOrCreate: documents.map((item) => ({
            create: {
              url: item.url,
              fileType: item.fileType,
              meta: item.meta,
              userId,
            },
            where: {
              url: item.url,
            },
          })),
          update: documents.map((item) => ({
            data: {
              url: item.url,
              fileType: item.fileType,
              meta: item.meta,
              userId,
            },
            where: {
              url: item.url,
            },
          })),
        }
      }

      if (status) {
        updateData.status = status
      }

      const data = await this.db.order.update({
        where: { id: orderId },
        data: updateData,
        include: {
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
          address: {
            include: {
              state: true,
              country: true,
            },
          },
          user: true,
          documents: {
            where: {
              meta: {
                path: ['invoice'],
                equals: true,
              },
            },
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })

      try {
        if (sendUpdate) {
          const response = await this.aws.sendEmail(
            await this.template.transactionEmail({
              id: data.user.id,
              subject:
                title ||
                `Your Reisetra.com order #${
                  data.id
                } ${data.status.toLowerCase()} for ${
                  data.cart.items.length
                } item${data.cart.items.length > 1 ? 's' : ''}`,
              description:
                description ||
                `Thank you for shopping with us. We'd like to let you know that we have ${data.status.toLowerCase()} your order. If you would like to view the status of your order or make any changes to it, please visit Your Orders on reisetra.com.`,
              orderId: data.id,
              address: `${data.address.address}, ${data.address.region}, ${data.address.nearby}, ${data.address.locality}, ${data.address.state.name}, ${data.address.country.name}, ${data.address.zipcode}`,
              email: data.address.email,
              phone: data.address.phone,
              status: `Your Reisetra.com order #${
                data.id
              } ${data.status.toLowerCase()} for ${
                data.cart.items.length
              } item${data.cart.items.length > 1 ? 's' : ''}.`,
              transaction: {
                id: data.id,
                grandTotal: data.grandTotal,
                shipping: data.shipping,
                subTotal: data.subTotal,
                taxes: data.tax,
              },
              orderItems: data.cart.items.map((item) => ({
                sku: item.product.inventory.sku,
                title: item.product.title,
                options: item.size + ' - ' + item.color,
                qty: item.quantity,
              })),
            })
          )
        }
      } catch (error) {
        console.log(error)
      }
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.updateOrder'
      )
    }
  }

  async deleteOrder(orderId: string): Promise<any> {
    try {
      const data = await this.db.order.update({
        where: { id: orderId },
        include: {
          address: {
            include: {
              state: true,
              country: true,
            },
          },
          user: true,
        },
        data: {
          active: false,
        },
      })
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.deleteOrder'
      )
    }
  }

  async cancelOrder(orderId: string): Promise<any> {
    try {
      const data = await this.db.order.update({
        where: { id: orderId },
        include: {
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
          address: {
            include: {
              state: true,
              country: true,
            },
          },
          user: true,
        },
        data: {
          status: 'CANCELLED',
        },
      })
      try {
        const response = await this.aws.sendEmail(
          await this.template.transactionEmail({
            id: data.user.id,
            subject: `Your Reisetra.com order #${
              data.id
            } ${data.status.toLowerCase()} for ${data.cart.items.length} item${
              data.cart.items.length > 1 ? 's' : ''
            }`,
            description: `Thank you for shopping with us. We'd like to let you know that we have ${data.status.toLowerCase()} your order. we will initiate refund in 1-2 business days. please visit your orders on reisetra.com to check status.`,
            orderId: data.id,
            address: `${data.address.address}, ${data.address.region}, ${data.address.nearby}, ${data.address.locality}, ${data.address.state.name}, ${data.address.country.name}, ${data.address.zipcode}`,
            email: data.address.email,
            phone: data.address.phone,
            status: `Your Reisetra.com order #${
              data.id
            } ${data.status.toLowerCase()} for ${data.cart.items.length} item${
              data.cart.items.length > 1 ? 's' : ''
            }.`,
            transaction: {
              id: data.id,
              grandTotal: data.grandTotal,
              shipping: data.shipping,
              subTotal: data.subTotal,
              taxes: data.tax,
            },
            orderItems: data.cart.items.map((item) => ({
              sku: item.product.inventory.sku,
              title: item.product.title,
              options: item.size + ' - ' + item.color,
              qty: item.quantity,
            })),
          })
        )
      } catch (error) {
        console.log(error)
      }
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'OrderService.cancelOrder'
      )
    }
  }
}
