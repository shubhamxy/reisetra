import { registerAs } from "@nestjs/config";

export interface ServicesEnv {
    razorpay: {
        name: string;
        description: string;
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
        s3Url: string;
        sesEndpoint: string;
        sesEmailSender: string;
        sesRegion: string;
    };
    logzio: {
        enable: boolean;
        token: string;
        host: string;
    };
}

export const services = (): ServicesEnv => ({
    razorpay: {
        name: "Reisetra",
        description: "Reisetra description",
        razorpayKeyId: process.env.RAZORPAY_KEY_ID,
        razorpaySecretKey: process.env.RAZORPAY_SECRET_KEY,
    },
    mailer: {
        senderName: process.env.EMAIL_SENDER_NAME || "Reisetra",
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
    },
    logzio: {
        enable: Boolean(process.env.LOGZIO_TOKEN),
        host: process.env.LOGZIO_HOST,
        token: process.env.LOGZIO_TOKEN,
    },
});

export default registerAs("services", services);
