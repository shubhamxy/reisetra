import { SES } from "aws-sdk";
import { services } from "src/config";

const config = services();

const ses = new SES({
    region: config.aws.sesRegion,
    endpoint: config.aws.sesEndpoint,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
});

export interface IParams {
    subject: string;
    text: string;
    html: string;
    source: string;
    to: string[];
    cc: string[];
    bcc: string[];
    replyTo: any[];
    tags: any[];
}

export const createParams = ({
    subject,
    text,
    html,
    source,
    to,
    cc,
    bcc,
    tags,
}: Partial<IParams>): SES.SendEmailRequest => ({
    Destination: {
        BccAddresses: bcc,
        CcAddresses: cc,
        ToAddresses: to,
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: html,
            },
            Text: {
                Charset: "UTF-8",
                Data: text,
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: subject,
        },
    },
    Source: source,
    Tags: tags,
});

export interface IData {
    MessageId: string;
}

export function sendEmail(params: SES.SendEmailRequest): Promise<IData> {
    return new Promise((resolve, reject) => {
        ses.sendEmail(params, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}
