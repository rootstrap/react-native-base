import Config from 'react-native-config';
import ApiService from './apiService';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';

export default new ApiService({
  baseUrl: Config.API_URL,
  headers: { accept: APPLICATION_JSON, [CONTENT_TYPE]: APPLICATION_JSON },
});
