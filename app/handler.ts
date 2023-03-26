import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyResult,
} from 'aws-lambda';
import listUrls from '~/listUrls';

export async function getContentsList(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  console.log(JSON.stringify(event, null, 2));

  const bucket = process.env.BUCKET_NAME as string;
  const prefix = (event.pathParameters as APIGatewayProxyEventPathParameters)['prefix'] as string;
  const urls = await listUrls(bucket, prefix);
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    },
    body: JSON.stringify(urls),
  };
}
