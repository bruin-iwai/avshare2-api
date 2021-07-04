const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const generateSignedUrl = require('../app/generateSignedUrl');

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));

describe('generateSignedUrl', () => {
  test('main', async () => {
    getSignedUrl.mockResolvedValueOnce('https://dummy');

    const ret = await generateSignedUrl('aa', 'bb', 'cc');

    expect(ret).toEqual('https://dummy');

    expect(getSignedUrl).toHaveBeenCalledTimes(1);
    expect(getSignedUrl).toHaveBeenCalledWith(
      new S3Client(),
      new GetObjectCommand({
        Bucket: 'aa',
        Key: 'bb/cc',
      })
    );
  });
});
