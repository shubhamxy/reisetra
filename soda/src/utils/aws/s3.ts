import { S3 } from "aws-sdk";
import { services } from "src/config";
var url = require('url');

const awsConfig = services().aws;
const URL_EXPIRATION_SECONDS = 300;

const s3 = new S3({
  region: awsConfig.s3Region,
});

export interface UploadUrlProps {
  userId: string;
  fileType: "images" | "documents";
  fileName: string;
  contentType: string;
}

export const getUploadURL = async function ({
  userId,
  fileType,
  fileName,
  contentType,
}: UploadUrlProps): Promise<{
  url: string;
  signedUrl: string;
  key: string;
  expiresIn: number;
  contentType: any;
}> {
  const key = `${userId}/${fileType}/${fileName}`;
  const s3Params = {
    Bucket: awsConfig.s3BucketName,
    Key: key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: contentType,
    ACL: "public-read",
  };

  const signedUrl = await s3.getSignedUrlPromise("putObject", s3Params);
  return {
    key,
    signedUrl,
    url: signedUrl.split("?").shift(),
    expiresIn: URL_EXPIRATION_SECONDS,
    contentType,
  };
};

export const deleteObject = async function (key: string): Promise<{ key: string}> {
  const s3Params = {
    Bucket: awsConfig.s3BucketName,
    Key: key,
  };
  await s3.deleteObject(s3Params).promise();
  return {
    key,
  };
};
