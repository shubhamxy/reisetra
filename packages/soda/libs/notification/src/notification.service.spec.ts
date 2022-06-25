import { Test, TestingModule } from '@nestjs/testing'
import { NotificationService } from './notification.service'
import { AppTestModule } from '@app/config'
import { DbModule } from '@app/db'
import { AuthModule } from '@app/auth'
import { CacheModule } from '@app/cache'
import { HttpModule } from '@nestjs/common'
import { AWSModule } from '@app/aws'

describe('NotificationService', () => {
  let service: NotificationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppTestModule,
        AWSModule,
        CacheModule,
        AuthModule,
        HttpModule,
        DbModule,
      ],
      providers: [NotificationService],
    }).compile()

    service = module.get<NotificationService>(NotificationService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    service.validate({
      Type: 'Notification',
      MessageId: '4c807a89-9ef9-543b-bfab-2f4ed41e91b4',
      TopicArn:
        'arn:aws:sns:us-east-1:853553028582:marbot-dev-alert-Topic-8CT7ZJRNSA5Y',
      Subject:
        'INSUFFICIENT_DATA: "insufficient test" in US East (N. Virginia)',
      Message:
        '{"AlarmName":"insufficient test","AlarmDescription":null,"AWSAccountId":"853553028582","NewStateValue":"INSUFFICIENT_DATA","NewStateReason":"tets","StateChangeTime":"2019-08-09T10:19:19.614+0000","Region":"US East (N. Virginia)","OldStateValue":"OK","Trigger":{"MetricName":"CallCount2","Namespace":"AWS/Usage","StatisticType":"Statistic","Statistic":"AVERAGE","Unit":null,"Dimensions":[{"value":"API","name":"Type"},{"value":"PutMetricData","name":"Resource"},{"value":"CloudWatch","name":"Service"},{"value":"None","name":"Class"}],"Period":300,"EvaluationPeriods":1,"ComparisonOperator":"GreaterThanThreshold","Threshold":1.0,"TreatMissingData":"- TreatMissingData:                    missing","EvaluateLowSampleCountPercentile":""}}',
      Timestamp: '2019-08-09T10:19:19.644Z',
      SignatureVersion: '1',
      Signature:
        'gnCKAUYX6YlBW3dkOmrSFvdB6r82Q2He+7uZV9072sdCP0DSaR46ka/4ymSdDfqilqxjJ9hajd9l7j8ZsL98vYdUbut/1IJ2hsuALF9nd/HwNLPPWvKXaK/Y3Hp57izOpeBAkuR6koitSbXX50lEj7FraaMVQfpexm01z7IUcx4vCCvZBTdQLbkWw+TYWkWNsMrqarW39zy474SmTBCSZlz1eoV6tCwYk2Z2G2awiXpnfsQRRZvHn4ot176oY+ADAFJ0sIa44effQXq+tAWE6/Z3M5rjtfg6OULDM+NGEmnVZL3xyWK8bIzB48ZclQo3ZsvLPGmCNQLlFpaP/3fGGg==',
      SigningCertURL:
        'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-6aad65c2f9911b05cd53efda11f913f9.pem',
      UnsubscribeURL:
        'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:853553028582:marbot-dev-alert-Topic-8CT7ZJRNSA5Y:86a160f0-c3c5-4ae1-ae50-2903eede0af1',
    })
  })
})
