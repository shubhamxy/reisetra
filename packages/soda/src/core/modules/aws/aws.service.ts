import { Injectable } from '@nestjs/common'
import {
    deleteObject,
    getUploadURL,
    UploadUrlParams,
    UploadUrlResponse,
} from 'src/utils'

@Injectable()
export class AWSService {
    async getUploadURL(options: UploadUrlParams): Promise<UploadUrlResponse> {
        return getUploadURL(options)
    }

    async deleteObject(key: string): Promise<{ key: string }> {
        return deleteObject(key)
    }
}
