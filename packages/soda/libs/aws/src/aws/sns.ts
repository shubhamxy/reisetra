import { SNS } from 'aws-sdk'

export async function subscribeAllSNS(sns: SNS, awsConfig, subscriptionTopics) {
  return Promise.all(
    subscriptionTopics.map((topic) => {
      return new Promise((resolve, reject) => {
        sns.subscribe(topic, function (error, data) {
          if (error) {
            reject(error)
          }
          resolve({ data, topic })
        })
      })
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
  return new Promise((resolve, reject) => {
    sns.confirmSubscription(params, function (err, data) {
      if (err) reject(err)
      resolve(data)
    })
  })
}
