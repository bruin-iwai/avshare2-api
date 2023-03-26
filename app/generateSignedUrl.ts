import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const generateSignedUrl = async (bucket: string, prefix: string, file: string) => {
  const client = new S3Client({});
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: `${prefix}/${file}`,
  });
  const url = await getSignedUrl(client, command);
  return url;
};

export default generateSignedUrl;
