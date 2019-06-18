import getResponseBody from 'api/utils/getResponseBody';

describe('getResponseBody', () => {
  describe('when response is empty', () => {
    it('returns undefined', async () => {
      const response = await getResponseBody();

      expect(response).toBeUndefined();
    });
  });

  describe('when response has http 204 status', () => {
    it('returns undefined', async () => {
      const response = await getResponseBody({ status: 204 });

      expect(response).toBeUndefined();
    });
  });

  describe('when response is a valid json', () => {
    it('returns the valid json', async () => {
      const response = await getResponseBody({
        json: () => Promise.resolve({ data: 'test' }),
      });

      expect(response).toEqual({ data: 'test' });
    });
  });
});
