import { Allow } from 'class-validator'

export class BounceDTO {
  @Allow()
  Type: string

  @Allow()
  MessageId: string

  @Allow()
  Token: string

  @Allow()
  TopicArn: string

  @Allow()
  Message: string

  @Allow()
  SubscribeURL: string

  @Allow()
  Timestamp: Date

  @Allow()
  SignatureVersion: string

  @Allow()
  Signature: string

  @Allow()
  SigningCertURL: string
}

export class SMSDTO {
  @Allow()
  Type: string

  @Allow()
  MessageId: string

  @Allow()
  Token: string

  @Allow()
  TopicArn: string

  @Allow()
  Message: string

  @Allow()
  SubscribeURL: string

  @Allow()
  Timestamp: Date

  @Allow()
  SignatureVersion: string

  @Allow()
  Signature: string

  @Allow()
  SigningCertURL: string
}
