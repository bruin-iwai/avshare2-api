const listUrls = require('../app/listUrls');
const { mockAwsPromise, mockS3GetObject } = require('../__mocks__/aws-sdk');
const getSignedUrl = require('../app/getSignedUrl');

jest.mock('../app/getSignedUrl');

describe('listUrls', () => {
  test('main', async () => {
    mockAwsPromise.mockResolvedValueOnce({
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

    getSignedUrl.mockResolvedValueOnce('https://dummy1').mockResolvedValueOnce('https://dummy2');

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

    expect(mockS3GetObject).toHaveBeenCalledTimes(1);
    expect(mockS3GetObject).toHaveBeenCalledWith({
      Bucket: 'bucket1',
      Key: 'prefix1/index.json',
    });

    expect(getSignedUrl).toHaveBeenCalledTimes(2);
    expect(getSignedUrl).toHaveBeenNthCalledWith(1, 'bucket1', 'prefix1', 'aa.mp4');
    expect(getSignedUrl).toHaveBeenNthCalledWith(2, 'bucket1', 'prefix1', 'bb.mp4');
  });
});
