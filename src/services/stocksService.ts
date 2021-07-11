import httpClient from '../httpClient';

class UserService {
  getStockSymbolData(symbol: { code: any }) {
    return httpClient.get(`/stock/${symbol.code}/quote`);
  }
}

export default new UserService();
