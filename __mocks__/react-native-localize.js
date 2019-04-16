const getLocales = () => [
  { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'EC', languageTag: 'es-EC', languageCode: 'es', isRTL: false },
];

const findBestAvailableLanguage = () => ({ languageTag: 'es', isRTL: 'false' });
const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

const getCalendar = () => 'gregorian';
const getCountry = () => 'ES';
const getCurrencies = () => ['USD'];
const getTemperatureUnit = () => 'celsius';
const getTimeZone = () => 'Ecuador/Guayaquil';
const uses24HourClock = () => true;
const usesMetricSystem = () => true;

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener,
};
