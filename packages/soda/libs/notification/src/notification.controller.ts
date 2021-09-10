import {
  Body,
  Controller,
  Get,
  Headers,
  HttpStatus,
  Post,
  Query,
  Response,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Public } from '@app/auth'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import { Config } from '@app/config'
import { NotificationService } from '@app/notification/notification.service'
import { BounceDTO } from './dto'

@Controller(ROUTES.notification)
export class NotificationController {
  constructor(
    private readonly notification: NotificationService,
    private readonly config: ConfigService
  ) {}

  @Public()
  @Get(ROUTES.unsubscribe)
  async handleUnsubscribe(
    @Query('token') token: string,
    @Query('email') email: string,
    @Response() response
  ) {
    try {
      await this.notification.handleUnsubscribe(email, token)
      return response.redirect(303, `${this.config.get(Config.app).clientUrl}`)
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'NotificationController.handleUnsubscribe'
      )
    }
  }

  @Public()
  @Post(ROUTES.bounce)
  async handleBounce(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      // @eslint-ignore
      const x = 10
      const data = await this.notification.handleBounce(messageType, body)
      return { data: data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'NotificationController.getAllTicketes'
      )
    }
  }

  @Public()
  @Post(ROUTES.complaint)
  async handleComplaints(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleComplaints(messageType, body)
      return { data: data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'NotificationController.handleComplaints'
      )
    }
  }

  @Public()
  @Post(ROUTES.delivery)
  async handleDeliveries(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleDeliveries(messageType, body)
      return { data: data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'NotificationController.handleDeliveries'
      )
    }
  }
}
