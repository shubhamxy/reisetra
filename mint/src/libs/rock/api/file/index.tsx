import { post, putRaw } from "../../utils/http";

export interface FileUploadSignedUrlResponse {
  url: string;
  signedUrl: string;
  expiresIn: number;
  contentType: string;
  fileName: string;
  fileType: string;
  id: string;
}

export interface fileUploadParams {
  fileType: "images" | "documents";
  fileName: string;
  contentType: string;
}

export function createFileUploadSignedUrl(body: fileUploadParams) {
  return post<fileUploadParams, FileUploadSignedUrlResponse>(
    "file/upload",
    body
  );
}

export function uploadFileToUrl(url: string, contentType: string, file: BodyInit) {
  const config = {};
  config['headers'] = {};
  config['headers']["content-type"] = contentType;
  return putRaw(url, file, config);
}

export async function uploadFile({
  file,
  params,
}: {
  file: BodyInit;
  params: fileUploadParams;
}) {
  const result = await createFileUploadSignedUrl(params);
  await uploadFileToUrl(result.data.signedUrl, result.data.contentType, file);
  return result;
}
