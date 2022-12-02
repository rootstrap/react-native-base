module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,

  importOrder: [
    '^@(.*)/(.*)$',
    '^components/(.*)$',
    '^constants/(.*)$',
    '^hooks/(.*)$',
    '^navigation',
    '^navigation/(.*)$',
    '^features/(.*)$',
    '^network/(.*)$',
    '^storage/(.*)$',
    '^[./*]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
