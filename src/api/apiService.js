import { sessionService } from 'redux-react-native-session';
import humps from 'humps';
import Config from 'react-native-config';

import handleErrors from 'api/utils/handleErrors';
import getResponseBody from 'api/utils/getResponseBody';

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
    const requestData = Api.buildRequestData(HTTP_VERB.GET);
    return Api.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static post(uri, data, apiUrl = Config.API_URL) {
    const requestData = Api.buildRequestData(HTTP_VERB.POST, data);
    return Api.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static delete(uri, data, apiUrl = Config.API_URL) {
    const requestData = Api.buildRequestData(HTTP_VERB.DELETE, data);
    return Api.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static put(uri, data, apiUrl = Config.API_URL) {
    const requestData = Api.buildRequestData(HTTP_VERB.PUT, data);
    return Api.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static patch(uri, data, apiUrl = Config.API_URL) {
    const requestData = Api.buildRequestData(HTTP_VERB.PATCH, data);
    return Api.loadHeadersAndPerformRequest(uri, apiUrl, requestData);
  }

  static buildRequestData(httpVerb, data = undefined) {
    return {
      method: httpVerb,
      headers: {
        accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      ...(data && { body: JSON.stringify(humps.decamelizeKeys(data)) }),
    };
  }

  static async loadHeadersAndPerformRequest(uri, apiUrl, data) {
    const requestData = { ...data };
    try {
      const headers = await Api.getTokenHeader();
      requestData.headers = { ...requestData.headers, ...headers };
      return Api.performRequest(uri, apiUrl, requestData);
    } catch (err) {
      return Api.performRequest(uri, apiUrl, requestData);
    }
  }

  static async performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;

    try {
      const response = await fetch(url, requestData);
      const processedResponse = await handleErrors(response);
      const body = await getResponseBody(processedResponse);
      return humps.camelizeKeys(body);
    } catch (error) {
      throw humps.camelizeKeys(error);
    }
  }

  static async getTokenHeader() {
    const { token, client, uid } = await sessionService.loadSession();
    return { [ACCESS_TOKEN]: token, client, uid };
  }
}

export default Api;
