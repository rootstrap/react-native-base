export const getLocales = () => [
  { countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false },
  { countryCode: 'EC', languageTag: 'es-EC', languageCode: 'es', isRTL: false },
];

export const findBestAvailableLanguage = () => ({ languageTag: 'es', isRTL: 'false' });
export const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

export const getCalendar = () => 'gregorian';
export const getCountry = () => 'ES';
export const getCurrencies = () => ['USD'];
export const getTemperatureUnit = () => 'celsius';
export const getTimeZone = () => 'Ecuador/Guayaquil';
export const uses24HourClock = () => true;
export const usesMetricSystem = () => true;

export const addEventListener = jest.fn();
export const removeEventListener = jest.fn();
