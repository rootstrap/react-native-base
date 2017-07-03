import { sessionService } from 'redux-react-native-session';
import humps from 'humps';

import { API_URL } from '../constants/config';

const handleErrors = response => {
  return new Promise((resolve, reject) => {
    if (!response) {
      reject({ message: 'No response returned from fetch' });
      return;
    }

    if (response.ok) {
      resolve(response);
      return;
    }
    sessionService.loadSession()
    .then(() => {
      if (response.status === 401) {
        sessionService.deleteSession();
      }
    }, (err) => {
      console.log(err);
    });

    response.json()
      .then((json) => {
        const error = json || { message: response.statusText };
        reject(error);
      }).catch(() => reject({ message: 'Response not JSON' }));
  });
  }

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }
  return response.json();
};

class Api {
  static performRequest(uri, apiUrl, requestData = {}) {
    const url = `${apiUrl}${uri}`;
    return new Promise((resolve, reject) => {
      fetch(url, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => {
          resolve(humps.camelizeKeys(response))
        })
        .catch(error => {
          reject(humps.camelizeKeys(error))
        });
    });
  }

  static async buildRequestData(method, config, data){
    const requestData = {
      method: method,
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        ...config.headers
      }
    };
    if(data){
      requestData.body = !config.disableTransformBody ? JSON.stringify(humps.decamelizeKeys(data)) : data
    }
    try {
      authHeaders = await Api.getTokenHeader();
    }catch(err) {
      console.log(err);
    }
    requestData.headers = { ...requestData.headers, ...authHeaders };
    return requestData;
  }

  static async getTokenHeader() {
    const headers = {};
    try {
      session = await sessionService.loadSession();
      const { accessToken, tokenType } = session;
      headers['Authorization'] = `${tokenType} ${accessToken}`;
    } catch (er) {
      console.log(er);
    }
    return headers;
  }

  static async get(uri, apiUrl = API_URL, config = {}) {
    const requestData = await Api.buildRequestData('GET', config, null)
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async post(uri, data, apiUrl = API_URL, config = {}) {
    const requestData = await Api.buildRequestData('POST', config, data)
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async delete(uri, data, apiUrl = API_URL, config = {}) {
    const requestData = await Api.buildRequestData('DELETE', config, data)
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async put(uri, data, apiUrl = API_URL, config = {}) {
    const requestData = await Api.buildRequestData('PUT', config, data);
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async patch(uri, data, apiUrl = API_URL, config = {}) {
    const requestData = await Api.buildRequestData('PATCH', config, data);
    return Api.performRequest(uri, apiUrl, requestData);
  }
}

export default Api;
