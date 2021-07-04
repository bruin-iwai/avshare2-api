const { S3, GetObjectCommand } = require('@aws-sdk/client-s3');
const AWSXRay = require('aws-xray-sdk');
const map = require('async/map');
const getStream = require('get-stream');
const generateSignedUrl = require('./generateSignedUrl');

module.exports = async function listUrls(bucket, prefix) {
  // S3からindex.jsonをダウンロード
  const client = AWSXRay.captureAWSv3Client(new S3({}));
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${prefix}/index.json`,
  });
  const ret = await client.send(command);
  const data = await getStream(ret.Body);
  const index = JSON.parse(data);

  // index.jsonのfiles[].{file, title}を取得し、fileをsingedUrlに変換する
  const urls = await map(index.files, async (item) => {
    const url = await generateSignedUrl(bucket, prefix, item.file);
    return {
      url,
      title: item.title,
    };
  });
  return urls;
};
