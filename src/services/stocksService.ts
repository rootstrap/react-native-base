import httpClient from '../httpClient';

/**
 * Reference Links:
 * https://github.com/diogobh93/IEX-Cloud/blob/master/src/screens/App.js
 * https://iexcloud.io/docs/api/
 */
class UserService {
    getStockSymbolData(symbol: string) {
        return httpClient.get(`/stock/${symbol?.toLocaleLowerCase()}/quote`);
    }
}

export default new UserService();
