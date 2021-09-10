import {
  confirmSubscription,
  deleteObject,
  FileUploadDTO,
  FileUploadRTO,
  getUploadURL,
  sendEmail,
  subscribeAllSNS,
} from './aws'
import { S3, SES, SNS } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'
import { AppEnv, Config, ServicesEnv } from '@app/config'
import { Injectable } from '@nestjs/common'
import { DbService } from '@app/db'
import { CustomError, errorCodes } from '@app/core'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'

@Injectable()
export class AWSService {
  private readonly appConfig
  private readonly awsConfig
  private readonly s3: S3
  private readonly ses: SES
  private readonly sns: SNS
  private readonly subscriptionTopics

  constructor(
    private readonly configService: ConfigService,
    private readonly db: DbService,
    @InjectPinoLogger(AWSService.name)
    private readonly logger: PinoLogger
  ) {
    this.appConfig = configService.get<AppEnv>(Config.app)
    this.awsConfig = configService.get<ServicesEnv>(Config.services).aws
    this.s3 = new S3({
      region: this.awsConfig.s3Region,
    })
    this.ses = new SES({
      region: this.awsConfig.sesRegion,
      endpoint: this.awsConfig.sesEndpoint,
      accessKeyId: this.awsConfig.accessKeyId,
      secretAccessKey: this.awsConfig.secretAccessKey,
    })

    this.sns = new SNS({
      region: this.awsConfig.snsRegion,
    })

    this.subscriptionTopics = [
      {
        Protocol: 'https',
        TopicArn: this.awsConfig.snsTopicArnBounce,
        Endpoint: this.awsConfig.snsTopicArnBounceEndpoint,
      },
      {
        Protocol: 'https',
        TopicArn: this.awsConfig.snsTopicArnComplaint,
        Endpoint: this.awsConfig.snsTopicArnComplaintEndpoint,
      },
      {
        Protocol: 'https',
        TopicArn: this.awsConfig.snsTopicArnDelivery,
        Endpoint: this.awsConfig.snsTopicArnDeliveryEndpoint,
      },
    ]

    console.log(this.subscriptionTopics)
  }

  async getUploadURL(options: FileUploadDTO): Promise<FileUploadRTO> {
    return getUploadURL(this.s3, this.awsConfig, options)
  }

  async deleteObject(key: string): Promise<{ key: string }> {
    return deleteObject(this.s3, this.awsConfig, key)
  }

  async sendEmail(params: SES.SendEmailRequest, verifiedOnly = true) {
    if (verifiedOnly) {
      const allEmails = [
        ...(params.Destination.CcAddresses || []),
        ...(params.Destination.ToAddresses || []),
        ...(params.Destination.BccAddresses || []),
      ]
        .filter((item) => !this.appConfig.contactEmail)
        .filter(Boolean)

      const verifiedUsers = await this.db.user.count({
        where: {
          email: { in: allEmails },
          emailVerified: true,
        },
      })
      if (verifiedUsers === allEmails.length) {
        return sendEmail(this.ses, this.awsConfig, params)
      }
      throw new CustomError(
        `Email is unverified: ${allEmails.length - verifiedUsers}`,
        errorCodes.EMailNotVerified,
        'AWSService.sendEmail'
      )
    }
    return sendEmail(this.ses, this.awsConfig, params)
  }

  async subscribeAllSNS() {
    try {
      const result = await subscribeAllSNS(
        this.sns,
        this.awsConfig,
        this.subscriptionTopics
      )
      this.logger.info(result, 'SNS subscription set up successfully.')
      return result
    } catch (error) {
      throw new CustomError(
        `Unable to set up SNS subscription: ${error}`,
        errorCodes.Error,
        'AWSService.subscribeAllSNS'
      )
    }
  }

  async confirmSubscription(params: { Token: string; TopicArn: string }) {
    return confirmSubscription(this.sns, this.awsConfig, params)
  }
}
