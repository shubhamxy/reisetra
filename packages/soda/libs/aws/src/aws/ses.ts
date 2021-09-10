import { SES } from 'aws-sdk'
import { SESMailDTO, SESMailRTO } from './types'

export const createParams = ({
  subject,
  text,
  html,
  source,
  to,
  cc,
  bcc,
  tags,
}: Partial<SESMailDTO>): SES.SendEmailRequest => ({
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
})

export function sendEmail(
  ses: SES,
  awsConfig,
  params: SES.SendEmailRequest
): Promise<SESMailRTO> {
  return new Promise((resolve, reject) => {
    ses.sendEmail(params, function (error, data) {
      if (error) {
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}
