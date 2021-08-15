import humps from 'humps';
import { Store } from 'redux';
import { updateSession, logout } from '../actions/userActions';
import Config from 'react-native-config';

const ACCESS_TOKEN = 'token';
const UID = 'uid';
const CLIENT = 'client';

const UNAUTHORIZED = 401;

export default (
    store: Store,
    client: {
        interceptors: {
            request: { use: (arg0: (config: any) => any) => void };
            response: {
                use: (
                    arg0: (response: any) => Promise<any>,
                    arg1: (error: any) => Promise<never>,
                ) => void;
            };
        };
    },
) => {
    client.interceptors.request.use((config: { headers: any; data: any; params: any }) => {
        const { info } = store.getState().session;
        const { data, headers } = config;
        if (info) {
            const { client, uid } = info;
            config.headers = {
                ...headers,
                client,
                uid,
            };
        }
        config.params = { [ACCESS_TOKEN]: Config.IEX_TOKEN };

        config.data = humps.decamelizeKeys(data);
        return config;
    });

    client.interceptors.response.use(
        async (response: { data: any; headers?: any }) => {
            const { headers, data } = response;
            const token = headers[ACCESS_TOKEN];
            if (token) {
                const session = {
                    uid: headers[UID],
                    client: headers[CLIENT],
                };
                store.dispatch(updateSession(session));
            }
            response.data = humps.camelizeKeys(data);
            return response;
        },
        (error: { response: { status: number } }) => {
            if (error.response && error.response.status === UNAUTHORIZED) {
                store.dispatch(logout());
            }

            return Promise.reject(error);
        },
    );
};
