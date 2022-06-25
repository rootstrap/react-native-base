import Config from 'react-native-config';
import axios from 'axios';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';
const ACCESS_TOKEN = 'token';

const client = axios.create({
    baseURL: Config.IEX_URL,
    headers: {
        Accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
    },
    params: { [ACCESS_TOKEN]: Config.IEX_TOKEN },
});

export default client;
