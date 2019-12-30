const { getContentsList } = require('../app/handler');
const listUrls = require('../app/listUrls');

jest.mock('../app/listUrls');

describe('handler', () => {
  beforeEach(() => {
    process.env.BUCKET_NAME = 'aa';
  });

  afterEach(() => {
    delete process.env.BUCKET_NAME;
  });

  test('getContentsList', async () => {
    const event = {
      prefix: 'bb',
    };

    listUrls.mockResolvedValueOnce([
      {
        url: 'https://dummy1',
        title: 'ああ',
      },
      {
        url: 'https://dummy2',
        title: 'いい',
      },
    ]);

    const ret = await getContentsList(event);

    expect(ret).toEqual({
      statusCode: 200,
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
