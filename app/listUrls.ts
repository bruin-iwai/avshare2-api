import { S3, GetObjectCommand } from '@aws-sdk/client-s3';
import AWSXRay from 'aws-xray-sdk';
import { map } from 'async';
import generateSignedUrl from '~/generateSignedUrl';
import { IndexSchema, IndexFileSchema } from '~/indexSchema';

const listUrls = async (bucket: string, prefix: string) => {
  // S3からindex.jsonをダウンロード
  const client = AWSXRay.captureAWSv3Client(new S3({}));
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${prefix}/index.json`,
  });
  const ret = await client.send(command);
  const data = (await ret.Body?.transformToString()) as string;
  const index = JSON.parse(data) as IndexSchema;

  // index.jsonのfiles[].{file, title}を取得し、fileをsingedUrlに変換する
  const urls = await map(index.files, async (item: IndexFileSchema) => {
    const url = await generateSignedUrl(bucket, prefix, item.file);
    return {
      url,
      title: item.title,
    };
  });
  return urls;
};

export default listUrls;
