import { registerAs } from '@nestjs/config'
import { Config } from './type'

export interface ServicesEnv {
  razorpay: {
    name: string
    description: string
    razorpayKeyId: string
    razorpaySecretKey: string
    razorpayOrderAPI: string
  }
  mailer: {
    senderName: string
  }
  aws: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    s3BucketName: string
    s3Region: string
    s3Url: string
    sesEndpoint: string
    sesEmailSender: string
    sesRegion: string
    snsTopicArnBounce: string
    snsTopicArnBounceEndpoint: string
    snsTopicArnComplaint: string
    snsTopicArnComplaintEndpoint: string
    snsTopicArnDelivery: string
    snsTopicArnDeliveryEndpoint: string
    snsTopicArnSMS: string
    snsTopicArnSMSEndpoint: string
    snsRegion: string
  }
  logzio: {
    enable: boolean
    token: string
    host: string
  }
}

export const services = (): ServicesEnv => ({
  razorpay: {
    name: process.env.RAZORPAY_NAME || 'Reisetra',
    description: process.env.RAZORPAY_DESCRIPTION || 'Indian Handicrafts',
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpaySecretKey: process.env.RAZORPAY_SECRET_KEY,
    razorpayOrderAPI: 'https://api.razorpay.com/v1/orders',
  },
  mailer: {
    senderName: process.env.EMAIL_SENDER_NAME || 'Reisetra',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    // S3
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
    s3Region: process.env.AWS_S3_REGION,
    s3Url: process.env.AWS_S3_URL,
    // SES
    sesEndpoint: process.env.AWS_SES_ENDPOINT,
    sesEmailSender: process.env.AWS_SES_DEFAULT_EMAIL_SENDER,
    sesRegion: process.env.AWS_SES_REGION,
    // SNS
    snsRegion: process.env.AWS_SNS_REGION,
    snsTopicArnBounce: process.env.AWS_SNS_TOPIC_ARN_BOUNCES,
    snsTopicArnBounceEndpoint: process.env.AWS_SNS_TOPIC_ARN_BOUNCES_ENDPOINT,
    snsTopicArnComplaint: process.env.AWS_SNS_TOPIC_ARN_COMPLAINTS,
    snsTopicArnComplaintEndpoint:
      process.env.AWS_SNS_TOPIC_ARN_COMPLAINTS_ENDPOINT,
    snsTopicArnDelivery: process.env.AWS_SNS_TOPIC_ARN_DELIVERIES,
    snsTopicArnDeliveryEndpoint:
      process.env.AWS_SNS_TOPIC_ARN_DELIVERIES_ENDPOINT,
    snsTopicArnSMS: process.env.AWS_SNS_TOPIC_ARN_SMS,
    snsTopicArnSMSEndpoint: process.env.AWS_SNS_TOPIC_ARN_SMS_ENDPOINT,
  },
  logzio: {
    enable: Boolean(process.env.LOGZIO_TOKEN),
    host: process.env.LOGZIO_HOST,
    token: process.env.LOGZIO_TOKEN,
  },
})

export default registerAs(Config.services, services)
