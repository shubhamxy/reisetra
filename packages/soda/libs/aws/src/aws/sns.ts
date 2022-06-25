import { SNS } from 'aws-sdk'
import { PublishResponse } from 'aws-sdk/clients/sns'

export async function subscribeAllSNS(
  sns: SNS,
  awsConfig,
  subscriptionTopics
): Promise<SNS.SubscribeResponse[]> {
  return Promise.all(
    subscriptionTopics.map((topic) => {
      return sns.subscribe(topic).promise()
    })
  )
}

export async function confirmSubscription(
  sns: SNS,
  awsConfig,
  params: {
    Token: string
    TopicArn: string
  }
) {
  return sns.confirmSubscription(params).promise()
}

export function getSMSType(
  sns: SNS,
  awsConfig,
  params: SNS.GetSMSAttributesInput = {
    attributes: ['DefaultSMSType', 'ATTRIBUTE_NAME'],
  }
): Promise<SNS.GetSMSAttributesResponse> {
  return sns.getSMSAttributes(params).promise()
}

export async function setSMSType(
  sns: SNS,
  awsConfig,
  params: SNS.SetSMSAttributesInput = {
    attributes: {
      /* required */
      // 'DefaultSMSType': 'Transactional', /* highest reliability */
      DefaultSMSType: 'Promotional' /* lowest cost */,
    },
  }
): Promise<SNS.SetSMSAttributesResponse> {
  return sns.setSMSAttributes(params).promise()
}

export async function checkIfPhoneNumberIsOptedOut(
  sns: SNS,
  awsConfig,
  params: SNS.CheckIfPhoneNumberIsOptedOutInput
): Promise<SNS.CheckIfPhoneNumberIsOptedOutResponse> {
  return sns.checkIfPhoneNumberIsOptedOut(params).promise()
}

export async function listPhoneNumbersOptedOut(
  sns: SNS,
  awsConfig,
  params: SNS.Types.ListPhoneNumbersOptedOutInput
): Promise<SNS.Types.ListPhoneNumbersOptedOutResponse> {
  return sns.listPhoneNumbersOptedOut(params).promise()
}

export async function sendSMS(
  sns: SNS,
  awsConfig,
  params: SNS.PublishInput
): Promise<PublishResponse> {
  return sns.publish(params).promise()
}
