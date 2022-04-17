import { applyArrayQueryParam } from 'utils/helpers';
import httpClient from '../httpClient';

/**
 * Reference Links:
 * https://github.com/diogobh93/IEX-Cloud/blob/master/src/screens/App.js
 * https://iexcloud.io/docs/api/
 */
class StocksService {
    getStockSymbolData(symbol: string) {
        return httpClient.get(`/stock/${symbol?.toLocaleLowerCase()}/quote`);
    }

    async getAllStocksSymbolData(symbolIds: string[]) {
        const reqUrl =
            applyArrayQueryParam(`/stock/market/batch`, symbolIds, `symbols`) + `&types=quote`;
        return await httpClient.get(reqUrl);
    }
}

export default new StocksService();
