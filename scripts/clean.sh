#!/bin/sh

echo 'Clean Setup'

echo $0

watchman watch-del-all
rm -rf node_modules/

if [ $1 = "ios" ]; then
    rm -rf ios/build/

    if which yarn >/dev/null; then
        yarn clear-xcode
        yarn install
        npx pod-install
    else
        npm clear-xcode
        npm install
        npx pod-install
    fi
else
    if which yarn >/dev/null; then
        yarn install
    else
        npm install
    fi
    cd android && ./gradlew clean && cd ..
fi

# Start Metro Without Cache
if which yarn >/dev/null; then
    yarn start-no-cache
else
    npm start-no-cache
fi
