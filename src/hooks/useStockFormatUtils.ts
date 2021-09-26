import { isNumber } from 'lodash';
import moment from 'moment';

const useStockFormatUtils = () => {
    const defaultCurrencyOptions = {
        significantDigits: 2,
        thousandsSeparator: ',',
        decimalSeparator: '.',
        symbol: '$',
    };

    // Formats currency values, default $ prefix
    const currencyFormatter = (value: string | number, options?: any) => {
        if (typeof value !== 'number') value = 0.0;
        options = { ...defaultCurrencyOptions, ...options };
        value = value.toFixed(options.significantDigits);

        const [currency, decimal] = value.split('.');
        return `${options.symbol} ${currency.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            options.thousandsSeparator,
        )}${options.decimalSeparator}${decimal}`;
    };

    const getMetricBySymbolKey = (data: any[], symbol: string, key: string): string | number => {
        const priceTypeKeySubstrings = ['price', 'high', 'low'];
        var isPriceKeyType = priceTypeKeySubstrings.some((substring) => {
            return key.toLocaleLowerCase().indexOf(substring) >= 0;
        });

        const isMarketCapType = key.toLocaleLowerCase().includes('cap');
        let isTimeKeyType = key.toLocaleLowerCase().includes('time');
        let isPercentKeyType = key.toLocaleLowerCase().includes('percent');

        const datetimeFormat = 'DD MMM YYYY hh:mm a';
        let foundMetrics;
        let formattedValue = '';

        if (data.length) {
            foundMetrics = data.find(
                (item) => item.id?.toLocaleLowerCase() === symbol?.toLocaleLowerCase(),
            )?.metrics;

            if (foundMetrics && foundMetrics[key]) {
                if (isPriceKeyType && isNumber(foundMetrics[key])) {
                    formattedValue = `$${foundMetrics[key]}`;
                } else if (isTimeKeyType) {
                    formattedValue = moment(foundMetrics[key]).format(datetimeFormat);
                } else if (isPercentKeyType) {
                    formattedValue = `${foundMetrics[key]}%`;
                } else if (isMarketCapType) {
                    formattedValue = currencyFormatter(foundMetrics[key]);
                } else {
                    // default case, no format
                    formattedValue = foundMetrics[key];
                }

                return formattedValue;
            }
        }
        return '';
    };

    return {
        formatCurrency: currencyFormatter,
        getMetricBySymbolKey: getMetricBySymbolKey,
    };
};

export default useStockFormatUtils;
