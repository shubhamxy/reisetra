import { SES, SESV2 } from 'aws-sdk'
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

export async function putSuppressedDestination(
  ses: SESV2,
  awsConfig,
  params: SESV2.PutSuppressedDestinationRequest
): Promise<SESV2.PutSuppressedDestinationResponse> {
  return ses.putSuppressedDestination(params).promise()
}

export async function deleteSuppressedDestination(
  ses: SESV2,
  awsConfig,
  params: SESV2.DeleteSuppressedDestinationRequest
): Promise<SESV2.DeleteSuppressedDestinationResponse> {
  return ses.deleteSuppressedDestination(params).promise()
}
