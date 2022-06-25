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
import { CustomException, Message, Routes, SuccessResponse } from '@app/core'
import { Config } from '@app/config'
import { NotificationService } from './notification.service'
import { BounceDTO } from './dto'
import { Throttle } from '@nestjs/throttler'

@Controller(Routes.notification)
export class NotificationController {
  constructor(
    private readonly notification: NotificationService,
    private readonly config: ConfigService
  ) {}

  @Throttle(3, 120)
  @Public()
  @Get(Routes.unsubscribe)
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
        NotificationController.name
      )
    }
  }

  @Throttle(3, 120)
  @Public()
  @Post(Routes.bounce)
  async handleBounce(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleBounce(messageType, body)
      return { data: data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        NotificationController.name
      )
    }
  }

  @Throttle(3, 120)
  @Public()
  @Post(Routes.complaint)
  async handleComplaints(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleComplaints(messageType, body)
      return { data: data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        NotificationController.name
      )
    }
  }

  @Throttle(3, 120)
  @Public()
  @Post(Routes.delivery)
  async handleDeliveries(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleDeliveries(messageType, body)
      return { data: data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        NotificationController.name
      )
    }
  }

  @Throttle(1, 120)
  @Public()
  @Post(Routes.sms)
  async handleSMS(
    @Headers('x-amz-sns-message-type') messageType: string,
    @Body() body: BounceDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.notification.handleSMS(messageType, body)
      return { data, message: Message.success }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        NotificationController.name
      )
    }
  }
}
