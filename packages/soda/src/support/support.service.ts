import { Injectable } from '@nestjs/common'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  CustomError,
  errorCodes,
} from '@app/core'
import { BounceDTO, TicketDTO } from './dto'
import { prismaOffsetPagination } from '@app/utils'
import { DbService } from '@app/db'
import { Ticket } from './entity'
import { ConfigService } from '@nestjs/config'
import { ServicesEnv } from '@app/config'
import { AuthService } from '@app/auth'
import { AWSService } from '@app/aws'
import { TemplateService } from '@app/aws/template.service'

@Injectable()
export class SupportService {
  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService
  ) {}

  async getAllTicketes(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<Ticket>> {
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
        model: 'ticket',
        prisma: this.db,
        where: {
          active: true,
        },
      })
      return result
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.getAllTickets'
      )
    }
  }

  async getTicketesByUser(
    options: CursorPagination,
    userId: string
  ): Promise<CursorPaginationResultInterface<Ticket>> {
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
        model: 'ticket',
        prisma: this.db,
        where: {
          userId,
          active: true,
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.getTicketes'
      )
    }
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await this.db.ticket.findUnique({
      where: { id },
    })
    if (!ticket) {
      throw new CustomError(
        'Ticket does not exist',
        errorCodes.RecordDoesNotExist
      )
    }
    return ticket
  }

  async createTicket(
    userId: string,
    email: string,
    data: TicketDTO
  ): Promise<any> {
    try {
      const ticket = await this.db.ticket.create({
        data: {
          userId,
          data: {
            email,
            subject: data.subject,
            description: data.description,
            orderId: data.orderId,
          },
        },
      })
      const ticketId = ticket.id || data.ticketId
      const results = await Promise.all([
        this.aws.sendEmail(
          await this.template.supportEmailAck({
            id: userId,
            subject: data.subject,
            email,
            ticketId,
          })
        ),
        this.aws.sendEmail(
          await this.template.supportEmail({
            id: userId,
            email,
            ticketId,
            orderId: data.orderId,
            subject: data.subject,
            description: data.description,
          })
        ),
      ])
      return {
        ...ticket,
        messages: results,
      }
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.createSupportTicket'
      )
    }
  }

  async updateTicket(id: string, data: TicketDTO): Promise<Ticket> {
    try {
      return await this.db.ticket.update({
        where: { id },
        data: {
          data: {
            subject: data.subject,
            description: data.description,
          },
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.updateTicket'
      )
    }
  }

  async deleteTicket(id: string): Promise<Ticket> {
    try {
      return await this.db.ticket.update({
        where: { id },
        data: {
          active: false,
        },
      })
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.deleteTicket'
      )
    }
  }

  async handleBounce(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (messageType === 'Notification' && body.Message) {
        await this.handleSnsNotification(body)
      } else if (messageType === 'SubscriptionConfirmation') {
        const params = {
          Token: body.Token,
          TopicArn: this.config.get<ServicesEnv>('services').aws
            .snsTopicArnBounce,
        }
        await this.aws.confirmSubscription(params)
      }
      return body
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.handleBounce'
      )
    }
  }

  async handleComplaints(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (messageType === 'Notification' && body.Message) {
        await this.handleSnsNotification(body)
      } else if (messageType === 'SubscriptionConfirmation') {
        const params = {
          Token: body.Token,
          TopicArn: this.config.get<ServicesEnv>('services').aws
            .snsTopicArnComplaint,
        }
        await this.aws.confirmSubscription(params)
      }
      return body
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.handleComplaints'
      )
    }
  }

  async handleDeliveries(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (messageType === 'Notification' && body.Message) {
        await this.handleSnsNotification(body)
      } else if (messageType === 'SubscriptionConfirmation') {
        const params = {
          Token: body.Token,
          TopicArn: this.config.get<ServicesEnv>('services').aws
            .snsTopicArnDelivery,
        }
        await this.aws.confirmSubscription(params)
      } else {
        throw Error('Invalid Notification')
      }
      return body
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.handleDeliveries'
      )
    }
  }

  async handleSnsNotification(body: BounceDTO) {
    const message = JSON.parse(body.Message)
    if (
      message &&
      (message.notificationType === 'Bounce' ||
        message.notificationType === 'Complaint')
    ) {
      const mail = message.mail
      if (mail && mail.destination) {
        for (let i = 0; i < mail.destination.length; i++) {
          const address = mail.destination[i]

          try {
            const user = await this.db.user.update({
              where: { email: address },
              data: {
                emailVerified: false,
              },
            })
            this.createTicket(user.id, user.email, {
              subject: message.notificationType as string,
              description: body.Message,
            })
          } catch (error) {
            console.error(error.message)
          }
        }
      }
    }
  }

  async handleUnsubscribe(email: string, token: string): Promise<any> {
    try {
      if (await this.template.verifyUnsubscribeToken(email, token)) {
        await this.db.user.update({
          where: { email },
          data: {
            emailVerified: false,
          },
        })
      } else {
        throw Error('Invalid verification token.')
      }
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.handleUnsubscribe'
      )
    }
  }
}