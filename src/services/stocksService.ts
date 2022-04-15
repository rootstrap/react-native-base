import { applyArrayQueryParam } from 'utils/helpers';
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

    async getAllStocksSymbolData(symbolIds: string[]) {
        const reqUrl = await Promise.resolve(
            applyArrayQueryParam(`/stock/market/batch`, symbolIds, `symbols`),
        ).then((result) => result);
        +`&types=quote`;
        return httpClient.get(reqUrl);
    }
}

export default new UserService();
