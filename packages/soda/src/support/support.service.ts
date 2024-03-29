import { Injectable } from '@nestjs/common'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  AppError,
  errorCodes,
} from '@app/core'
import { TicketDTO } from './dto'
import { prismaOffsetPagination } from '@app/utils'
import { DbService } from '@app/db'
import { Ticket } from './entity'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '@app/auth'
import { AWSService, TemplateService } from '@app/aws'

@Injectable()
export class SupportService {
  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService
  ) {}

  async getAllTickets(
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
      return await prismaOffsetPagination({
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
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.getAllTickets'
      )
    }
  }

  async getTicketsByUser(
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
      throw new AppError(
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
      throw new AppError('Ticket does not exist', errorCodes.RecordDoesNotExist)
    }
    return ticket
  }

  async createTicket(
    userId: string,
    username: string,
    data: TicketDTO
  ): Promise<any> {
    try {
      const ticket = await this.db.ticket.create({
        data: {
          userId,
          data: {
            subject: data.subject,
            description: data.description,
            orderId: data.orderId,
          },
        },
        select: {
          id: true,
          user: true,
        },
      })
      const ticketId = ticket.id || data.ticketId
      const results = await Promise.all([
        this.aws.sendEmail(
          await this.template.supportEmailAck({
            username,
            subject: data.subject,
            email: ticket.user.email,
            ticketId,
          })
        ),
        this.aws.sendEmail(
          await this.template.supportEmail({
            username,
            email: ticket.user.email,
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
      throw new AppError(
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
      throw new AppError(
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
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'SupportService.deleteTicket'
      )
    }
  }
}
