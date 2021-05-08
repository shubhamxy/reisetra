import { SES } from 'aws-sdk';
import {AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, AWS_SES_ENDPOINT, AWS_SES_REGION} from 'src/config';
const ses = new SES({
  region: AWS_SES_REGION,
  endpoint: AWS_SES_ENDPOINT,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_KEY,
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
        Charset: 'UTF-8',
        Data: html,
      },
      Text: {
        Charset: 'UTF-8',
        Data: text,
      },
    },
    Subject: {
      Charset: 'UTF-8',
      Data: subject,
    },
  },
  Source: source,
  Tags: tags,
});

interface IData {
  MessageId: string;
}

export function sendEmail(params: SES.SendEmailRequest): Promise<IData> {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, function (error, data) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(JSON.stringify(data))
        resolve(data);
      }
    });
  });
}
