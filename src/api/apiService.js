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
      debugger;
      if (response.status === 401) {
        sessionService.deleteSession();
      }
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

 static async get(uri, apiUrl = API_URL) {
    const requestData = {
      method: 'get',
      headers: {
        accept: 'application/json'
      }
    };
    try {
      headers = await Api.getTokenHeader();
    }catch(a) {
      console.log('bu');
    }
    requestData.headers = { ...requestData.headers, ...headers };
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async post(uri, data, apiUrl = API_URL, config = {}) {
    const requestData = {
      method: 'post',
      headers: {
        accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: !config.notJson ? JSON.stringify(humps.decamelizeKeys(data)) : data
    };
    try {
      headers = await Api.getTokenHeader();
    }catch(err) {
      console.log(err);
    }
    requestData.headers = { ...requestData.headers, ...headers };
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async delete(uri, data, apiUrl = API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'delete',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    try {
      headers = await Api.getTokenHeader();
    }catch(err) {
      console.log(err);
    }
    if (headers.client){
      requestData.headers = { ...requestData.headers, ...headers };
    }
    return Api.performRequest(uri, apiUrl, requestData);
  }

  static async put(uri, data, apiUrl = API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'put',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return Api.getTokenHeader()
    .then((headers) => {
      requestData.headers = { ...requestData.headers, ...headers };
      return Api.performRequest(uri, apiUrl, requestData);
    }).catch(() => Api.performRequest(uri, apiUrl, requestData));
  }

  static async patch(uri, data, apiUrl = API_URL) {
    const decamelizeData = humps.decamelizeKeys(data);
    const requestData = {
      method: 'patch',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(decamelizeData)
    };
    return Api.getTokenHeader()
    .then((headers) => {
      requestData.headers = { ...requestData.headers, ...headers };
      return Api.performRequest(uri, apiUrl, requestData);
    },() => Api.performRequest(uri, apiUrl, requestData));
  }
}

export default Api;
