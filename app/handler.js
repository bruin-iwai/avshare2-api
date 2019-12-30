const listUrls = require('./listUrls');

module.exports.getContentsList = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const bucket = process.env.BUCKET_NAME;
  const { prefix } = event;
  const urls = await listUrls(bucket, prefix);
  return {
    statusCode: 200,
    body: JSON.stringify(urls),
  };
};
