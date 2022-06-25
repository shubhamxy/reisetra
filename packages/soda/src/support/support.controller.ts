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
import { CustomException, Routes, SuccessResponse } from '@app/core'
import { AllTicketsDTO, TicketDTO, TicketsDTO } from './dto'
import { AuthenticatedRequest, Role, Roles } from '@app/auth'
import { ConfigService } from '@nestjs/config'

@Controller(Routes.supports)
export class SupportController {
  constructor(
    private readonly support: SupportService,
    private readonly config: ConfigService
  ) {}

  @Roles(Role.ADMIN)
  @Get(Routes.supports_all)
  async getAllTicketes(
    @Query() query: AllTicketsDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.support.getAllTickets(query)
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
      const { results, ...meta } = await this.support.getTicketsByUser(
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
        request.user.username,
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

  @Get(Routes.support_by_ticketId)
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

  @Put(Routes.support_by_ticketId)
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
  @Delete(Routes.support_by_ticketId)
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
