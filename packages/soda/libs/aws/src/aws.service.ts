import {
  confirmSubscription,
  deleteObject,
  FileUploadDTO,
  FileUploadRTO,
  getUploadURL,
  sendEmail,
  sendSMS,
  subscribeAllSNS,
} from './aws'
import { S3, SES, SNS } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'
import { AppEnv, Config, ServicesEnv } from '@app/config'
import { Injectable, Logger } from '@nestjs/common'
import { DbService } from '@app/db'
import { AppError, AWSSNSFailure, EMailNotVerified } from '@app/core'
import { LogParams } from '@app/auth'
import {
  EMAIL_IS_UNVERIFIED,
  PHONE_IS_UNVERIFIED,
  SNS_SUBSCRIPTION_FAILED,
  SNS_SUBSCRIPTION_SETUP_FAILED,
  SNS_SUBSCRIPTION_SUCCESS,
} from '@app/aws/aws.const'

@Injectable()
export class AWSService {
  private readonly appConfig
  private readonly awsConfig
  private readonly s3: S3
  private readonly ses: SES
  private readonly sns: SNS
  private readonly subscriptionTopics
  private readonly logger = new Logger(AWSService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly db: DbService
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
      {
        Protocol: 'https',
        TopicArn: this.awsConfig.snsTopicArnSMS,
        Endpoint: this.awsConfig.snsTopicArnSMSEndpoint,
      },
    ]
  }

  async onApplicationBootstrap() {
    this.subscribeAllSNS()
      .then((result) => {
        this.logger.log(SNS_SUBSCRIPTION_SUCCESS, AWSService.name)
        this.logger.log(result)
      })
      .catch((error) => {
        this.logger.log(SNS_SUBSCRIPTION_FAILED, AWSService.name)
        this.logger.log(error)
      })
  }

  @LogParams()
  async getUploadURL(options: FileUploadDTO): Promise<FileUploadRTO> {
    return getUploadURL(this.s3, this.awsConfig, options)
  }

  @LogParams()
  async deleteObject(key: string): Promise<{ key: string }> {
    return deleteObject(this.s3, this.awsConfig, key)
  }

  @LogParams()
  async sendEmail(params: SES.SendEmailRequest, verifiedOnly = true) {
    try {
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
        throw new AppError(
          `${EMAIL_IS_UNVERIFIED}: ${allEmails.length - verifiedUsers}`,
          EMailNotVerified
        )
      }
      return sendEmail(this.ses, this.awsConfig, params)
    } catch (error) {
      throw new AppError(
        `${SNS_SUBSCRIPTION_SETUP_FAILED}: ${error}`,
        AWSSNSFailure
      )
    }
  }

  @LogParams()
  async sendSMS(params: SNS.PublishInput, verifiedOnly = true) {
    try {
      if (verifiedOnly) {
        // send sms if it exists in user table only.
        const phoneExists = await this.db.user.count({
          where: {
            phone: params.PhoneNumber,
          },
        })
        if (phoneExists > 0) {
          if (this.appConfig.isProduction) {
            return sendSMS(this.sns, this.awsConfig, params)
          } else {
            return {
              MessageId: 'String',
              SequenceNumber: 'String',
            }
          }
        }
        throw new Error(`${PHONE_IS_UNVERIFIED}: ${phoneExists}`)
      }
      if (this.appConfig.isProduction) {
        return sendSMS(this.sns, this.awsConfig, params)
      } else {
        return {
          MessageId: 'String',
          SequenceNumber: 'String',
        }
      }
    } catch (error) {
      throw new AppError(
        `${SNS_SUBSCRIPTION_SETUP_FAILED}: ${error}`,
        AWSSNSFailure
      )
    }
  }

  @LogParams()
  async confirmSubscription(params: { Token: string; TopicArn: string }) {
    try {
      return confirmSubscription(this.sns, this.awsConfig, params)
    } catch (error) {
      throw new AppError(
        `${SNS_SUBSCRIPTION_SETUP_FAILED}: ${error}`,
        AWSSNSFailure
      )
    }
  }

  async subscribeAllSNS() {
    try {
      return await subscribeAllSNS(
        this.sns,
        this.awsConfig,
        this.subscriptionTopics
      )
    } catch (error) {
      throw new AppError(
        `${SNS_SUBSCRIPTION_SETUP_FAILED}: ${error}`,
        AWSSNSFailure
      )
    }
  }
}
