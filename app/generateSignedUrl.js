const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

module.exports = async (bucket, prefix, file) => {
  const client = new S3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${prefix}/${file}`,
  });
  const url = await getSignedUrl(client, command);
  return url;
};
