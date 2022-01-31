import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
} from '@nestjs/common'
import { SupportService } from './support.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import { TicketDTO, AllTicketsDTO, TicketsDTO } from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Roles, Role } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/constants'

@Controller(ROUTES.supports)
export class SupportController {
    constructor(private readonly support: SupportService) {}

    @Roles(Role.ADMIN)
    @Get(ROUTES.supports_all)
    async getAllTicketes(
        @Query() query: AllTicketsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.support.getAllTicketes(
                query
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.getAllTicketes'
            )
        }
    }

    @Get()
    async getTicketes(
        @Req() req: AuthenticatedRequest,
        @Query() query: TicketsDTO
    ): Promise<SuccessResponse> {
        try {
            const { results, ...meta } = await this.support.getTicketesByUser(
                query,
                req.user.id
            )
            return { data: results || [], meta: meta }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.getTicketes'
            )
        }
    }

    @Post()
    async createTicket(
        @Req() request: AuthenticatedRequest,
        @Body() body: TicketDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.createTicket(
                request.user.id,
                request.user.email,
                body
            )
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'SupportController.createTicket'
            )
        }
    }

    @Get(ROUTES.support_by_ticketId)
    async getTicket(
        @Param('ticketId') ticketId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.getTicketById(ticketId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.getTicket'
            )
        }
    }

    @Put(ROUTES.support_by_ticketId)
    async updateTicket(
        @Param('ticketId') ticketId: string,
        @Body() body: TicketDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.updateTicket(ticketId, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.updateTicket'
            )
        }
    }

    @Roles(Role.ADMIN)
    @Delete(ROUTES.support_by_ticketId)
    async deleteTicket(
        @Param('ticketId') ticketId: string
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.deleteTicket(ticketId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.deleteTicket'
            )
        }
    }
}
