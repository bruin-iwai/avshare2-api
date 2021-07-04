const listUrls = require('../app/listUrls');
const { mockS3Send, mockS3GetObjectCommand } = require('../__mocks__/@aws-sdk/client-s3');
const generateSignedUrl = require('../app/generateSignedUrl');

jest.mock('../app/generateSignedUrl');

describe('listUrls', () => {
  test('main', async () => {
    mockS3Send.mockResolvedValueOnce({
      Body: Buffer.from(
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
      ),
    });

    generateSignedUrl
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

    expect(mockS3GetObjectCommand).toHaveBeenCalledTimes(1);
    expect(mockS3GetObjectCommand).toHaveBeenCalledWith({
      Bucket: 'bucket1',
      Key: 'prefix1/index.json',
    });

    expect(generateSignedUrl).toHaveBeenCalledTimes(2);
    expect(generateSignedUrl).toHaveBeenNthCalledWith(1, 'bucket1', 'prefix1', 'aa.mp4');
    expect(generateSignedUrl).toHaveBeenNthCalledWith(2, 'bucket1', 'prefix1', 'bb.mp4');
  });
});
