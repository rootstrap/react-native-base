import Config from 'react-native-config';
import axios from 'axios';
import { retrieveUserSession } from '../utils/sessionUtil'
import { sessionKey } from 'config/commonStrings';

const APPLICATION_JSON = 'application/json';
const CONTENT_TYPE = 'Content-Type';
const ACCESS_TOKEN = 'token';

const client = axios.create({
    baseURL: Config.IEX_UR || 'https://cloud.iexapis.com/stable',
    headers: {
        Accept: APPLICATION_JSON,
        [CONTENT_TYPE]: APPLICATION_JSON,
    },
    params: { [ACCESS_TOKEN]: Config.IEX_TOKEN || retrieveUserSession(sessionKey).then((session) => {return session?.token})},
});



export default client;
