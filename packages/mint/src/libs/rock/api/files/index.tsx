import { API_ROUTES, post, putRaw } from '../../utils'

export interface FileUploadSignedUrlResponse {
    url: string
    signedUrl: string
    expiresIn: number
    contentType: string
    fileName: string
    fileType: string
    id: string
}

export interface FileUploadParams {
    fileType: 'images' | 'documents'
    fileName: string
    contentType: string
}

export function createFileUploadSignedUrl(body: FileUploadParams) {
    return post<FileUploadParams, FileUploadSignedUrlResponse>(
        API_ROUTES.files,
        body
    )
}

export function uploadFileToUrl(url: string, contentType: string, file: any) {
    const config = {
        headers: {
            'Content-Type': contentType,
        },
    }
    return putRaw(url, file, config)
}

export async function uploadFile({
    file,
    params,
}: {
    file: any
    params: FileUploadParams
}) {
    const result = await createFileUploadSignedUrl(params)
    await uploadFileToUrl(result.data.signedUrl, result.data.contentType, file)
    return result
}
