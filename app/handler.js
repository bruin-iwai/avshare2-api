const listUrls = require('./listUrls');

module.exports.getContentsList = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  const bucket = process.env.BUCKET_NAME;
  const { prefix } = event.pathParameters;
  const urls = await listUrls(bucket, prefix);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(urls),
  };
};
