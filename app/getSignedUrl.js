const AWS = require('aws-sdk');

const s3 = new AWS.S3();

module.exports = async function getSignedUrl(bucket, prefix, file) {
  const url = await s3.getSignedUrlPromise('getObject', {
    Bucket: bucket,
    Key: `${prefix}/${file}`,
  });
  return url;
};
