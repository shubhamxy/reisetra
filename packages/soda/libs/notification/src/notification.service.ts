import { Injectable } from '@nestjs/common'
import { Config, ServicesEnv } from '@app/config'
import { CustomError } from '@app/core'
import { DbService } from '@app/db'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '@app/auth'
import { AWSService, TemplateService } from '@app/aws'
import { BounceDTO } from './dto'

@Injectable()
export class NotificationService {
  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService
  ) {}

  async handleBounce(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (messageType === 'Notification' && body.Message) {
        await this.handleSnsNotification(body)
      } else if (messageType === 'SubscriptionConfirmation') {
        const params = {
          Token: body.Token,
          TopicArn: this.config.get<ServicesEnv>(Config.services).aws
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
          TopicArn: this.config.get<ServicesEnv>(Config.services).aws
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
          TopicArn: this.config.get<ServicesEnv>(Config.services).aws
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
