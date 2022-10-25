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

    getAllStocksSymbolData(symbolIds: string[]) {
        return httpClient.get(
            applyArrayQueryParam(`/stock/market/batch`, symbolIds ? symbolIds : ["fb"], `symbols`) + `&types=quote`,
        );
    }

    getAllStockTickerSymbols() {
        return httpClient.get(`/ref-data/iex/symbols`);
    }
}

export default new StocksService();