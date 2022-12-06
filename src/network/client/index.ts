import axios from 'axios';
import Config from 'react-native-config';

const APPLICATION_JSON = 'application/json';
export const MULTIPART_FORM_DATA = 'multipart/form-data';
export const CONTENT_TYPE = 'Content-Type';

const AxiosClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: APPLICATION_JSON,
    CONTENT_TYPE: APPLICATION_JSON,
  },
});

export default AxiosClient;
