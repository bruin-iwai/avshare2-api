const mockS3Send = jest.fn();
const mockS3GetObjectCommand = jest.fn();

const mockS3Client = jest.fn(() => ({
  send: mockS3Send,
}));
const mockS3 = jest.fn(() => ({
  send: mockS3Send,
}));

module.exports = {
  mockS3Send,
  mockS3GetObjectCommand,
  S3Client: mockS3Client,
  S3: mockS3,
  GetObjectCommand: mockS3GetObjectCommand,
};
