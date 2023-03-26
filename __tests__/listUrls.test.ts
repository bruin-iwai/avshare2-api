import type { SdkStreamMixin } from '@aws-sdk/types';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { mockClient } from 'aws-sdk-client-mock';
import listUrls from '~/listUrls';
import generateSignedUrl from '~/generateSignedUrl';

jest.mock('aws-xray-sdk', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  captureAWSv3Client: jest.fn((x) => x),
}));

jest.mock('~/generateSignedUrl');
const mockedGenerateSignedUrl = generateSignedUrl as jest.MockedFunction<typeof generateSignedUrl>;

const s3Mock = mockClient(S3Client);

describe('listUrls', () => {
  test('main', async () => {
    const bodyData = {
      transformToString() {
        return Promise.resolve(
          JSON.stringify({
            files: [
              {
                file: 'aa.mp4',
                title: 'ああ',
              },
              {
                file: 'bb.mp4',
                title: 'いい',
              },
            ],
          })
        );
      },
    };

    s3Mock
      .on(GetObjectCommand, {
        Bucket: 'bucket1',
        Key: 'prefix1/index.json',
      })
      .resolvesOnce({
        Body: bodyData as SdkStreamMixin,
      });

    mockedGenerateSignedUrl
      .mockResolvedValueOnce('https://dummy1')
      .mockResolvedValueOnce('https://dummy2');

    const urls = await listUrls('bucket1', 'prefix1');

    expect(urls).toEqual([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    expect(generateSignedUrl).toHaveBeenCalledTimes(2);
    expect(generateSignedUrl).toHaveBeenNthCalledWith(1, 'bucket1', 'prefix1', 'aa.mp4');
    expect(generateSignedUrl).toHaveBeenNthCalledWith(2, 'bucket1', 'prefix1', 'bb.mp4');
  });
});
