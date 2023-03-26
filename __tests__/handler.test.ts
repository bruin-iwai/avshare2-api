import { APIGatewayProxyEvent } from 'aws-lambda';
import { getContentsList } from '~/handler';
import listUrls from '~/listUrls';

jest.mock('~/listUrls');
const mockedListUrls = listUrls as jest.MockedFunction<typeof listUrls>;

describe('handler', () => {
  beforeEach(() => {
    process.env.BUCKET_NAME = 'aa';
  });

  afterEach(() => {
    delete process.env.BUCKET_NAME;
  });

  test('getContentsList', async () => {
    const event = {
      pathParameters: {
        prefix: 'bb',
      },
    };

    mockedListUrls.mockResolvedValueOnce([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    const ret = await getContentsList(event as unknown as APIGatewayProxyEvent);

    expect(ret).toEqual({
      statusCode: 200,
      headers: {
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
      },
      body: JSON.stringify([
        {
          url: 'https://dummy1',
          title: 'ああ',
        },
        {
          url: 'https://dummy2',
          title: 'いい',
        },
      ]),
    });

    expect(listUrls).toHaveBeenCalledTimes(1);
    expect(listUrls).toHaveBeenCalledWith(process.env.BUCKET_NAME, 'bb');
  });
});
