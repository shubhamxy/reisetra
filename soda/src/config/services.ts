import { registerAs } from '@nestjs/config';

export interface ServicesEnv {
  razorpay: {
    razorpayKeyId: string;
    razorpaySecretKey: string;
  };
  mailer: {
    senderName: string;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    s3BucketName: string;
    s3Region: string;
    sesEndpoint: string;
    sesEmailSender: string;
    sesRegion: string;
  };
}

export const services = (): ServicesEnv => ({
  razorpay: {
    razorpayKeyId: process.env.RAZORPAY_KEY_ID,
    razorpaySecretKey: process.env.RAZORPAY_SECRET_KEY,
  },
  mailer: {
    senderName: process.env.EMAIL_SENDER_NAME || 'Reisetra',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_S3_REGION,
    // S3
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
    s3Region: process.env.AWS_S3_REGION,
    // SES
    sesEndpoint: process.env.AWS_SES_ENDPOINT,
    sesEmailSender: process.env.AWS_SES_DEFAULT_EMAIL_SENDER,
    sesRegion: process.env.AWS_SES_REGION,
  },
});

export default registerAs('services', services);