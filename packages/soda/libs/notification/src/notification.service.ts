import { HttpService, Injectable, Logger } from '@nestjs/common'
import { Config, ServicesEnv } from '@app/config'
import { AppError, ValidationFailedException } from '@app/core'
import { DbService } from '@app/db'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '@app/auth'
import { AWSService, TemplateService } from '@app/aws'
import { BounceDTO, SMSDTO } from './dto'
import { AxiosResponse } from 'axios'
import { CacheService } from '@app/cache'
import * as crypto from 'crypto'

const CERT_URL_PATTERN = /^https:\/\/sns\.[a-zA-Z0-9-]{3,}\.amazonaws\.com(\.cn)?\/SimpleNotificationService-[a-zA-Z0-9]{32}\.pem$/
function fieldsForSignature(type) {
  if (
    type === 'SubscriptionConfirmation' ||
    type === 'UnsubscribeConfirmation'
  ) {
    return [
      'Message',
      'MessageId',
      'SubscribeURL',
      'Timestamp',
      'Token',
      'TopicArn',
      'Type',
    ]
  } else if (type === 'Notification') {
    return ['Message', 'MessageId', 'Subject', 'Timestamp', 'TopicArn', 'Type']
  } else {
    return []
  }
}
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(AWSService.name)

  constructor(
    private readonly db: DbService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
    private readonly aws: AWSService,
    private readonly template: TemplateService,
    private readonly httpService: HttpService,
    private readonly cache: CacheService
  ) {}

  async getCertificate(certUrl) {
    const cachedCertificate = await this.cache.get(certUrl)
    if (cachedCertificate !== undefined) {
      return cachedCertificate
    } else {
      const response: AxiosResponse<string> = await this.httpService
        .get(certUrl)
        .toPromise()
      await this.cache.set(certUrl, response.data)
      return response.data
    }
  }

  async validate(message) {
    if (
      !(
        'SignatureVersion' in message &&
        'SigningCertURL' in message &&
        'Type' in message &&
        'Signature' in message
      )
    ) {
      this.logger.log('Missing field')
      return false
    } else if (message.SignatureVersion !== '1') {
      this.logger.log('Invalid SignatureVersion')
      return false
    } else if (!CERT_URL_PATTERN.test(message.SigningCertURL)) {
      this.logger.log('Invalid certificate URL')
      return false
    } else {
      const certificate = await this.getCertificate(message.SigningCertURL)
      if (!certificate) {
        return false
      }
      const verify = crypto.createVerify('sha1WithRSAEncryption')
      fieldsForSignature(message.Type).forEach((key) => {
        if (key in message) {
          verify.write(`${key}\n${message[key]}\n`)
        }
      })
      verify.end()
      return verify.verify(certificate, message.Signature, 'base64')
    }
  }

  async handleBounce(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (!(await this.validate(body))) {
        throw new Error('Validation Failed: Invalid SNS Message Body.')
      }
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
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        NotificationService.name
      )
    }
  }

  async handleComplaints(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (!(await this.validate(body))) {
        throw new Error('Validation Failed: Invalid SNS Message Body.')
      }
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
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        `${NotificationService.name}.${this.handleComplaints.name}`
      )
    }
  }

  async handleDeliveries(messageType: string, body: BounceDTO): Promise<any> {
    try {
      if (!(await this.validate(body))) {
        throw new Error('Validation Failed: Invalid SNS Message Body.')
      }
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
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        `${NotificationService.name}.${this.handleDeliveries.name}`
      )
    }
  }

  async handleSMS(messageType: string, body: SMSDTO): Promise<any> {
    try {
      if (!(await this.validate(body))) {
        throw new Error('Validation Failed: Invalid SNS Message Body.')
      }
      if (messageType === 'Notification' && body.Message) {
        await this.handleSnsNotification(body)
      } else if (messageType === 'SubscriptionConfirmation') {
        const params = {
          Token: body.Token,
          TopicArn: this.config.get<ServicesEnv>(Config.services).aws
            .snsTopicArnSMS,
        }
        await this.aws.confirmSubscription(params)
      } else {
        this.logger.error(body, 'handleSMS')
      }
      return body
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        `${NotificationService.name}.${this.handleSMS.name}`
      )
    }
  }

  async handleSnsNotification(body) {
    try {
      const message = JSON.parse(body.Message)
      if (!message || !message.notificationType) {
        return
      }
      switch (message.notificationType) {
        case 'Bounce':
        case 'Complaint': {
          const mail = message.mail
          if (mail && mail.destination) {
            for (let i = 0; i < mail.destination.length; i++) {
              const address = mail.destination[i]
              try {
                const user = await this.db.user.update({
                  where: { email: address },
                  data: {
                    emailSubscribed: false,
                  },
                })
              } catch (error) {
                this.logger.error(message, 'handleSnsNotification')
              }
            }
          }
          break
        }
        case 'Delivery': {
          this.logger.log(message, 'handleSnsNotification')
          break
        }
        case 'SMS': {
          const PhoneNumber = message.PhoneNumber
          if (PhoneNumber) {
            try {
              const user = await this.db.user.update({
                where: { phone: PhoneNumber },
                data: {
                  phoneSubscribed: false,
                },
              })
            } catch (error) {
              this.logger.error(message, 'handleSnsNotification')
            }
          }
          this.logger.log(message, 'handleSnsNotification')
          break
        }
        default: {
          this.logger.log(message, 'handleSnsNotification')
        }
      }
    } catch (error) {
      throw Error('Parsing Error: Invalid Body.Message')
    }
  }

  async handleUnsubscribe(email: string, token: string): Promise<any> {
    try {
      if (await this.template.verifyUnsubscribeToken(email, token)) {
        await this.db.user.update({
          where: { email },
          data: {
            emailSubscribed: false,
          },
        })
      } else {
        throw Error('Verification Error: Invalid verification token.')
      }
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        `${NotificationService.name}.${this.handleUnsubscribe.name}`
      )
    }
  }
}
