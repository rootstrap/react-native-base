- Fix module resoluton on jest test
- Implement the 1st component StockFeed
- Add some high level charts and a live feed from IEX Cloud


// use for module res. in test runner
"moduleNameMapper": {
      "actions": "<rootDir>/src/actions/$1",
      "httpClient": "<rootDir>/src/httpClient/$1",
      "services": "<rootDir>/src/services/$1",
      "components": "<rootDir>/src/components/$1",
      "constants": "<rootDir>/src/constants/$1",
      "screens": "<rootDir>/src/screens/$1",
      "hooks": "<rootDir>/src/hooks/$1",
      "locale": "<rootDir>/src/locale/$1",
      "reducers": "<rootDir>/src/reducers/$1",
      "selectors": "<rootDir>/src/selectors/$1",
      "store": "<rootDir>/src/store/$1",
      "utils": "<rootDir>/src/utils/$1",
      "navigators": "<rootDir>/src/navigators/$1",
      "validations": "<rootDir>/src/validations/$1"
    },