import processResponse from 'api/utils/processResponse';

describe('processResponse', () => {
  describe('with no response', () => {
    it('raises an error', async () => {
      await expect(processResponse()).rejects.toThrow(
        new Error({ message: 'No response returned from fetch' }),
      );
    });
  });

  describe('with a success response', () => {
    const response = {
      ok: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    it('returns the response', async () => {
      expect(await processResponse(response)).toEqual(response);
    });
  });
});
