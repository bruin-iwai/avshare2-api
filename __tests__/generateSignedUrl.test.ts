import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import generateSignedUrl from '~/generateSignedUrl';

jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: jest.fn(),
}));
const mockedGetSignedUrl = getSignedUrl as jest.MockedFunction<typeof getSignedUrl>;

jest.mock('@aws-sdk/client-s3');
const mockedS3Client = S3Client as jest.MockedClass<typeof S3Client>;
const mockedGetObjectCommand = GetObjectCommand as jest.MockedClass<typeof GetObjectCommand>;

describe('generateSignedUrl', () => {
  test('main', async () => {
    mockedGetSignedUrl.mockResolvedValueOnce('https://dummy');

    const ret = await generateSignedUrl('aa', 'bb', 'cc');

    expect(ret).toEqual('https://dummy');

    expect(getSignedUrl).toHaveBeenCalledTimes(1);
    expect(getSignedUrl).toHaveBeenCalledWith(expect.any(S3Client), expect.any(GetObjectCommand));

    expect(mockedS3Client.mock.calls[0][0]).toEqual({});
    expect(mockedGetObjectCommand.mock.calls[0][0]).toEqual({
      Bucket: 'aa',
      Key: 'bb/cc',
    });
  });
});
