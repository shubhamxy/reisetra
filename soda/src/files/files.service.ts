import { Injectable } from '@nestjs/common';
import { getUploadURL, UploadUrlProps, deleteObject } from 'src/utils';
@Injectable()
export class FilesService {
  constructor() {}
  async uploadFile(params: UploadUrlProps) {
    return getUploadURL(params)
  }
  async deleteFile(key: string) {
    return deleteObject(key)
  }
}
