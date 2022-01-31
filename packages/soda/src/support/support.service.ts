import { Injectable } from '@nestjs/common'
import { CustomError } from 'src/core/response'
import { TicketDTO } from './dto'
import { sendEmail, supportEmail, supportEmailAck } from 'src/utils'
import { PrismaService } from 'src/core/modules/db/prisma.service'
import { errorCodes } from 'src/core/codes/error'
import {
    CursorPagination,
    CursorPaginationResultInterface,
} from 'src/core/pagination'
import { prismaOffsetPagination } from 'src/utils/prisma'
import { Ticket } from './entity'

@Injectable()
export class SupportService {
    constructor(private readonly db: PrismaService) {}
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
            const result = await prismaOffsetPagination({
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
            return result
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
                sendEmail(
                    supportEmailAck({
                        id: userId,
                        subject: data.subject,
                        email,
                        ticketId,
                    })
                ),
                sendEmail(
                    supportEmail({
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
            const ticket = await this.db.ticket.update({
                where: { id },
                data: {
                    data: {
                        subject: data.subject,
                        description: data.description,
                    },
                },
            })
            return ticket
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
            const ticket = await this.db.ticket.update({
                where: { id },
                data: {
                    active: false,
                },
            })
            return ticket
        } catch (error) {
            throw new CustomError(
                error?.meta?.cause || error.message,
                error.code,
                'SupportService.deleteTicket'
            )
        }
    }
}
