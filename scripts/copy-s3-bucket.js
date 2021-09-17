/**
 * Copies s3 bucket from src to dest.
 * make sure to add permission on dest. s3 bucket policy for src aws account.
 * ↪ node -e "require('./copy-s3-bucket.js')()" src_bucket dest_bucket
 */
const AWS = require('aws-sdk');

// replace default with local profile that has permission for s3.
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
const s3 = new AWS.S3();

module.exports = async function copyS3Bucket(event, context, callback) {
    return new Promise((resolve, reject) => {
        if (process.argv.length < 3) {
            throw Error("Invalid arguments.")
        }
        const srcBucket = process.argv[2];
        const destBucket = process.argv[3];
        s3.listObjectsV2({
            Bucket: srcBucket
        }, function (err, data) {
            if (err) {
                console.log("Error: " + err)
                reject(err);
            } else {
                resolve(Promise.all(data.Contents.map(item => new Promise((resolve, reject) => {
                    s3.copyObject({
                        CopySource: srcBucket + '/' + item.Key,
                        Bucket: destBucket,
                        Key: item.Key,
                        ACL: 'bucket-owner-full-control', // make sure you enforce bucket policy on dest bucket.
                    }, function (copyErr, copyData) {
                        if (copyErr) {
                            console.log("Error: " + copyErr)
                            reject(err)
                        } else {
                            console.log('Copied OK', copyData)
                            resolve(copyData)
                        }
                    });
                }))));
            }
        });
    })
};
