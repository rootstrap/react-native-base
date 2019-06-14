import parseError from 'api/utils/parseError';

describe('parseError', () => {
  describe('when response is a valid json', () => {
    describe('with an non empty body', () => {
      it('returns the json response', async () => {
        const response = {
          json: () => Promise.resolve({ data: 'Test data' }),
        };

        const error = await parseError(response);

        expect(error).toEqual({ data: 'Test data' });
      });
    });

    describe('with an empty body', () => {
      it('returns the statusText', async () => {
        const response = {
          json: () => Promise.resolve(),
          statusText: 'Test message',
        };

        const error = await parseError(response);

        expect(error).toEqual({ message: 'Test message' });
      });
    });
  });

  describe('when response is not a valid json', () => {
    it('returns an error message', async () => {
      const response = {
        json: () => Promise.reject(),
      };

      const error = await parseError(response);

      expect(error).toEqual({ message: 'Response not JSON' });
    });
  });
});
