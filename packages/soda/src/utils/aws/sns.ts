import { SNS } from 'aws-sdk'

export async function subscribeAllSNS(sns: SNS, awsConfig, subscriptionTopics) {
    subscriptionTopics.forEach((topic) => {
        sns.subscribe(topic, function (error, data) {
            if (error)
                throw new Error(`Unable to set up SNS subscription: ${error}`)
            console.log(
                `SNS subscription set up successfully: ${JSON.stringify(data)}`
            )
        })
    })
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
