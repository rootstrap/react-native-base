import { sessionService } from 'redux-react-native-session';

import handleErrors from 'api/utils/handleErrors';
import * as parseError from 'api/utils/parseError';
import * as saveSessionHeaders from 'api/utils/saveSessionHeaders';

describe('handleErrors', () => {
  beforeEach(() => {
    sessionService.deleteSession = jest.fn(() => Promise.resolve());
    sessionService.loadSession = jest.fn(() => Promise.resolve());
    saveSessionHeaders.default = jest.fn(() => Promise.resolve());
    parseError.default = jest.fn(() => Promise.resolve());
  });

  describe('with no response', () => {
    it('raises an error', async () => {
      await expect(handleErrors()).rejects.toThrow(new Error({ message: 'No response returned from fetch' }));
    });
  });

  describe('with a success response', () => {
    const response = {
      ok: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    it('calls saveSessionHeaders', async () => {
      await handleErrors(response);

      expect(saveSessionHeaders.default).toHaveBeenCalledWith({ 'Content-Type': 'application/json' });
    });

    it('returns the response', async () => {
      expect(await handleErrors(response)).toEqual(response);
    });
  });

  describe('with an error response', () => {
    const response = {
      ok: false,
      headers: {
        'Content-Type': 'application/json',
      },
      status: 401,
    };

    it('calls loadSession on sessionService', async () => {
      try {
        await handleErrors(response);
      } catch (error) {
        expect(sessionService.loadSession).toHaveBeenCalled();
      }
    });

    it('calls deleteSession on sessionService', async () => {
      try {
        await handleErrors(response);
      } catch (error) {
        expect(sessionService.deleteSession).toHaveBeenCalled();
      }
    });

    it('calls parseError', async () => {
      try {
        await handleErrors(response);
      } catch (error) {
        expect(parseError.default).toHaveBeenCalled();
      }
    });
  });
});
