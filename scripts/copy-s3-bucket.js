const AWS = require('aws-sdk');
// replace default with local profile that has permission for s3.
// make sure to add permission on dest. s3 bucket policy for src aws account.
const credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;
const s3 = new AWS.S3();

const srcBucket = "raw-soda";
const destBucket = "soda-raw";

function copy_s3_across_accounts(event, context, callback) {
    s3.listObjectsV2({
        Bucket: srcBucket
    }, function (err, data) {
        if (err) {
            console.log("Error: " + err);
        } else {
            data.Contents.forEach(item => {
                s3.copyObject({
                    CopySource: srcBucket + '/' + item.Key,
                    Bucket: destBucket,
                    Key: item.Key,
                    ACL: 'bucket-owner-full-control', // make sure you enforce bucket policy on dest bucket.
                }, function (copyErr, copyData) {
                    if (copyErr) {
                        console.log("Error: " + copyErr);
                    } else {
                        console.log('Copied OK', copyData);
                    }
                });
            })
        }
    });
}

// copy_s3_across_accounts();

module.exports = copy_s3_across_accounts;
