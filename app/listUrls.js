const AWS = require('aws-sdk');
const map = require('async/map');
const getSignedUrl = require('./getSignedUrl');

const s3 = new AWS.S3();

module.exports = async function listUrls(bucket, prefix) {
  // S3からindex.jsonをダウンロード
  const index = await s3
    .getObject({
      Bucket: bucket,
      Key: `${prefix}/index.json`,
    })
    .promise()
    .then((ret) => JSON.parse(ret.Body.toString()));

  // index.jsonのfiles[].{file, title}を取得し、fileをsingedUrlに変換する
  const urls = await map(index.files, async (item) => {
    const url = await getSignedUrl(bucket, prefix, item.file);
    return {
      url,
      title: item.title,
    };
  });
  return urls;
};
