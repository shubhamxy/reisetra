import { post, putRaw } from '../../utils/http'

export interface FileUploadSignedUrlResponse {
    url: string
    signedUrl: string
    expiresIn: number
    contentType: string
    fileName: string
    fileType: string
    id: string
}

export interface fileUploadParams {
    fileType: 'images' | 'documents'
    fileName: string
    contentType: string
}

export function createFileUploadSignedUrl(body: fileUploadParams) {
    return post<fileUploadParams, FileUploadSignedUrlResponse>('files', body)
}

export function uploadFileToUrl(url: string, contentType: string, file: any) {
    const config = {}
    config['headers'] = {}
    config['headers']['Content-Type'] = contentType
    return putRaw(url, file, config)
}

export async function uploadFile({
    file,
    params,
}: {
    file: any
    params: fileUploadParams
}) {
    const result = await createFileUploadSignedUrl(params)
    await uploadFileToUrl(result.data.signedUrl, result.data.contentType, file)
    return result
}
