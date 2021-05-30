const listUrls = require('./listUrls');

module.exports.getContentsList = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const bucket = process.env.BUCKET_NAME;
  const { prefix } = event.pathParameters;
  const urls = await listUrls(bucket, prefix);
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
    body: JSON.stringify(urls),
  };
};
