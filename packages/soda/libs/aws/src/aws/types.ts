import { File } from '@app/master'

export interface FileUploadDTO {
  userId: string
  fileType: 'images' | 'documents'
  fileName: string
  contentType: string
}

export type FileUploadRTO = Partial<File> & {
  id: string
  url: string
  fileName: string
  signedUrl: string
  expiresIn: number
  contentType: any
}

export interface SESMailDTO {
  subject: string
  text: string
  html: string
  source: string
  to: string[]
  cc: string[]
  bcc: string[]
  replyTo: any[]
  tags: any[]
}

export interface SESMailRTO {
  MessageId: string
}
