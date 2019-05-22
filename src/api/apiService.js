import { sessionService } from 'redux-react-native-session';
import humps from 'humps';
import Config from 'react-native-config';

import handleErrors from './utils/handleErrors';
import getResponseBody from './utils/getResponseBody';

const ACCESS_TOKEN = 'access-token';
const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

const HTTP_VERB = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

class Api {
  static get(uri, apiUrl = Config.API_URL) {
    const requestData = this.buildRequestData(HTTP_VERB.GET);
    return this.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static post(uri, data, apiUrl = Config.API_URL) {
    const requestData = this.buildRequestData(HTTP_VERB.POST, data);
    return this.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static delete(uri, data, apiUrl = Config.API_URL) {
    const requestData = this.buildRequestData(HTTP_VERB.DELETE, data);
    return this.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static put(uri, data, apiUrl = Config.API_URL) {
    const requestData = this.buildRequestData(HTTP_VERB.PUT, data);
    return this.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static patch(uri, data, apiUrl = Config.API_URL) {
    const requestData = this.buildRequestData(HTTP_VERB.PATCH, data);
    return this.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static buildRequestData(httpVerb, data = null) {
    const requestData = {
      method: httpVerb,
      headers: {
        accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
      }
    };

    if (data) {
      const decamelizedData = humps.decamelizeKeys(data);
      requestData.body = JSON.stringify(decamelizedData);
    }

    return requestData;
  }

  static loadHeadersAndPerformRequest(uri, apiUrl, data) {
    return this.getTokenHeader()
      .then((headers) => {
        data.headers = { ...data.headers, ...headers };
        return this.performRequest(uri, apiUrl, data);
      })
      .catch(() => this.performRequest(uri, apiUrl, data));
  }

  static performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(humps.camelizeKeys(response)))
        .catch(error => reject(humps.camelizeKeys(error)));
    });
  }

  static getTokenHeader() {
    return new Promise((resolve, reject) => {
      sessionService.loadSession()
        .then((session) => {
          const headers = {};
          const { token, client, uid } = session;
          headers[ACCESS_TOKEN] = token;
          headers.client = client;
          headers.uid = uid;
          resolve(headers);
        }).catch(() => reject());
    });
  }
}

export default Api;
