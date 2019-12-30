const mockAwsPromise = jest.fn();

const mockS3GetObject = jest.fn(() => ({
  promise: mockAwsPromise,
}));

const mockS3GetSignedUrlPromise = jest.fn();

const S3 = jest.fn(() => ({
  getObject: mockS3GetObject,
  getSignedUrlPromise: mockS3GetSignedUrlPromise,
}));

module.exports = {
  mockAwsPromise,
  mockS3GetObject,
  mockS3GetSignedUrlPromise,
  S3,
};
