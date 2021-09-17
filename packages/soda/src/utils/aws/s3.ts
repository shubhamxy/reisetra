import { S3 } from 'aws-sdk'
import { nanoid } from 'nanoid'
import { File } from 'src/masters/files/entity'

const URL_EXPIRATION_SECONDS = 300

export interface UploadUrlParams {
    userId: string
    fileType: 'images' | 'documents'
    fileName: string
    contentType: string
}

export type UploadUrlResponse = Partial<File> & {
    id: string
    url: string
    fileName: string
    signedUrl: string
    expiresIn: number
    contentType: any
}

const RE = /(?:\.([^.]+))?$/

export const getUploadURL = async function (
    s3: S3,
    awsConfig,
    { userId, fileType, fileName, contentType }: UploadUrlParams
): Promise<UploadUrlResponse> {
    const ext = RE.exec(fileName)[1] || ''
    const key = `${userId}/${fileType}/${nanoid()}${ext ? `.${ext}` : ''}`
    const s3Params = {
        Bucket: awsConfig.s3BucketName,
        Key: key,
        Expires: URL_EXPIRATION_SECONDS,
        ContentType: contentType,
        ACL: 'public-read',
    }
    const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params)
    return {
        id: key,
        contentType,
        fileType,
        fileName,
        expiresIn: URL_EXPIRATION_SECONDS,
        signedUrl,
        url: awsConfig.s3Url + '/' + key,
    }
}

export const deleteObject = async function (
    s3: S3,
    awsConfig,
    key: string
): Promise<{ key: string }> {
    const s3Params = {
        Bucket: awsConfig.s3BucketName,
        Key: key,
    }
    await s3.deleteObject(s3Params).promise()
    return {
        key,
    }
}
