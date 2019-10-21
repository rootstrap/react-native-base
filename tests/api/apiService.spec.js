import Config from 'react-native-config';
import nock from 'nock';
import ApiService from 'api';

import '../test-helper';

describe('ApiService', () => {
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
        const response = await ApiService.performRequest('/path', {
          method: 'post',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: '{"data": 1}',
        });

        expect(response.data).toEqual({ responseData: 1 });
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
          await ApiService.performRequest('/path', {
            method: 'post',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
            data: '{"data": 1}',
          });
        } catch (error) {
          expect(error.data).toEqual({ error: 'Unauthorized' });
        }
      });
    });
  });
});
