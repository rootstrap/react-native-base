import Config from 'react-native-config';
import nock from 'nock';
import { sessionService } from 'redux-react-native-session';
import ApiService from 'api/apiService';

import '../test-helper';

describe('ApiService', () => {
  beforeEach(() => {
    sessionService.loadSession = jest.fn(() =>
      Promise.resolve({ token: 'test-token', client: 'test-client', uid: 'test-uid' }),
    );
  });

  describe('buildRequestData', () => {
    describe('with no body', () => {
      it('returns httpVerb and headers', () => {
        const requestData = ApiService.buildRequestData('get');

        expect(requestData).toEqual({
          method: 'get',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      });
    });

    describe('with body', () => {
      it('returns httpVerb, headers and the decamelized body', () => {
        const requestData = ApiService.buildRequestData('get', {
          someData: 2,
          anotherData: {
            innerData: 2,
          },
        });

        expect(requestData).toEqual({
          method: 'get',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: '{"some_data":2,"another_data":{"inner_data":2}}',
        });
      });
    });
  });

  describe('loadHeadersAndPerformRequest', () => {
    let performRequestSpy;

    beforeEach(() => {
      performRequestSpy = jest
        .spyOn(ApiService, 'performRequest')
        .mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
      performRequestSpy.mockRestore();
    });

    describe('with session headers', () => {
      let getTokenHeaderSpy;

      beforeEach(() => {
        getTokenHeaderSpy = jest
          .spyOn(ApiService, 'getTokenHeader')
          .mockImplementation(() => Promise.resolve({ token: 'test' }));
      });

      afterEach(() => {
        getTokenHeaderSpy.mockRestore();
      });

      it('calls performRequest appending session headers', async () => {
        await ApiService.loadHeadersAndPerformRequest('base-url', '/path', {
          headers: { 'Content-Type': 'application/json' },
        });

        expect(ApiService.performRequest).toHaveBeenCalledWith('base-url', '/path', {
          headers: { 'Content-Type': 'application/json', token: 'test' },
        });
      });
    });

    describe('with no session headers', () => {
      let getTokenHeaderSpy;

      beforeEach(() => {
        getTokenHeaderSpy = jest
          .spyOn(ApiService, 'getTokenHeader')
          .mockImplementation(() => Promise.reject());
      });

      afterEach(() => {
        getTokenHeaderSpy.mockRestore();
      });

      it('calls performRequest with the given data', async () => {
        await ApiService.loadHeadersAndPerformRequest('base-url', '/path', {
          headers: { 'Content-Type': 'application/json' },
        });

        expect(ApiService.performRequest).toHaveBeenCalledWith('base-url', '/path', {
          headers: { 'Content-Type': 'application/json' },
        });
      });
    });
  });

  describe('getTokenHeader', () => {
    it('loads the headers from the session', async () => {
      const headers = await ApiService.getTokenHeader();

      expect(headers).toEqual({
        'access-token': 'test-token',
        client: 'test-client',
        uid: 'test-uid',
      });
    });
  });

  describe('performRequest', () => {
    describe('with success response', () => {
      beforeEach(() => {
        nock(Config.API_URL)
          .post('/path', { data: 1 })
          .reply(200, { response_data: 1 });
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('returns the response camelized', async () => {
        const response = await ApiService.performRequest('/path', Config.API_URL, {
          method: 'post',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: '{"data": 1}',
        });

        expect(response).toEqual({ responseData: 1 });
      });
    });

    describe('with an error response', () => {
      beforeEach(() => {
        nock(Config.API_URL)
          .post('/path', { data: 1 })
          .reply(401, { error: 'Unauthorized' });
      });

      afterEach(() => {
        nock.cleanAll();
      });

      it('throws an error', async () => {
        try {
          await ApiService.performRequest('/path', Config.API_URL, {
            method: 'post',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: '{"data": 1}',
          });
        } catch (error) {
          expect(error).toEqual({ error: 'Unauthorized' });
        }
      });
    });
  });
});
