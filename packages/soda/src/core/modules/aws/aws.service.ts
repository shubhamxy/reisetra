import { Injectable } from '@nestjs/common'
import {
    deleteObject,
    getUploadURL,
    UploadUrlParams,
    UploadUrlResponse,
    sendEmail,
    subscribeAllSNS,
    confirmSubscription,
} from 'src/utils'
import { S3, SES, SNS } from 'aws-sdk'
import { ConfigService } from '@nestjs/config'
import { ServicesEnv } from '../../config'
import { CONFIG } from '../../config/type'

@Injectable()
export class AWSService {
    private readonly awsConfig
    private readonly s3: S3
    private readonly ses: SES
    private readonly sns: SNS
    private readonly subscriptionTopics
    constructor(private readonly configService: ConfigService) {
        this.awsConfig = configService.get<ServicesEnv>(CONFIG.services).aws
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
    }

    async getUploadURL(options: UploadUrlParams): Promise<UploadUrlResponse> {
        return getUploadURL(this.s3, this.awsConfig, options)
    }

    async deleteObject(key: string): Promise<{ key: string }> {
        return deleteObject(this.s3, this.awsConfig, key)
    }

    async sendEmail(params: SES.SendEmailRequest) {
        return sendEmail(this.ses, this.awsConfig, params)
    }

    async subscribeAllSNS() {
        return subscribeAllSNS(
            this.sns,
            this.awsConfig,
            this.subscriptionTopics
        )
    }

    async confirmSubscription(params: { Token: string; TopicArn: string }) {
        return confirmSubscription(this.sns, this.awsConfig, params)
    }
}
