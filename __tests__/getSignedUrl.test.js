const getSignedUrl = require('../app/getSignedUrl');
const { mockS3GetSignedUrlPromise } = require('../__mocks__/aws-sdk');

describe('getSignedUrl', () => {
  test('main', async () => {
    mockS3GetSignedUrlPromise.mockResolvedValueOnce('https://dummy');

    const ret = await getSignedUrl('aa', 'bb', 'cc');

    expect(ret).toEqual('https://dummy');

    expect(mockS3GetSignedUrlPromise).toHaveBeenCalledTimes(1);
    expect(mockS3GetSignedUrlPromise).toHaveBeenCalledWith('getObject', {
      Bucket: 'aa',
      Key: 'bb/cc',
    });
  });
});
