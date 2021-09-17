import {
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    Req,
    Response,
} from '@nestjs/common'
import { SupportService } from './support.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import { AllTicketsDTO, BounceDTO, TicketDTO, TicketsDTO } from './dto'
import { AuthenticatedRequest } from 'src/auth/auth.interface'
import { Role, Roles } from 'src/auth/decorator/roles.decorator'
import { ROUTES } from 'src/core/constants'
import { Public } from 'src/auth/decorator/public.decorator'
import { ConfigService } from '@nestjs/config'

@Controller(ROUTES.supports)
export class SupportController {
    constructor(
        private readonly support: SupportService,
        private readonly config: ConfigService
    ) {}

    @Public()
    @Get(ROUTES.handle_unsubscribe)
    async handleUnsubscribe(
        @Query('token') token: string,
        @Query('email') email: string,
        @Response() response
    ) {
        try {
            await this.support.handleUnsubscribe(email, token)
            return response.redirect(303, `${this.config.get('app').clientUrl}`)
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.handleUnsubscribe'
            )
        }
    }

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

    @Public()
    @Post(ROUTES.handle_bounce)
    async handleBounce(
        @Headers('x-amz-sns-message-type') messageType: string,
        @Body() body: BounceDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.handleBounce(messageType, body)
            return { data: data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.getAllTicketes'
            )
        }
    }

    @Public()
    @Post(ROUTES.handle_complaint)
    async handleComplaints(
        @Headers('x-amz-sns-message-type') messageType: string,
        @Body() body: BounceDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.handleComplaints(messageType, body)
            return { data: data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.handleComplaints'
            )
        }
    }

    @Public()
    @Post(ROUTES.handle_delivery)
    async handleDeliveries(
        @Headers('x-amz-sns-message-type') messageType: string,
        @Body() body: BounceDTO
    ): Promise<SuccessResponse> {
        try {
            const data = await this.support.handleDeliveries(messageType, body)
            return { data: data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'TicketController.handleDeliveries'
            )
        }
    }
}
