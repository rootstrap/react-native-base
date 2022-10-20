#!/bin/sh

echo 'React Native Setup'

echo ''
echo 'Installing Node Modules...'
if which yarn >/dev/null; then
    yarn install
else
    npm install
fi

echo ''
echo 'Installing Pods Modules...'
npx pod-install

echo ''
echo 'Creating .env File...'
cp .env.example .env

echo ''
echo 'Creating Debug.keystore...'
curl https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore >android/app/debug.keystore
