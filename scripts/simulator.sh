#!/bin/sh

if [[ $# = 0 ]]; then
  echo "Usage: $0 Scheme-Name Debug/Release"
  exit 1
fi

TS_FILE="./scripts/validate-env.ts"

if command -v ts-node >/dev/null 2>&1; then
  TS_NODE_PATH="ts-node"
else
  echo "ts-node not found. Installing ts-node locally..."
  yarn add -D ts-node
  TS_NODE_PATH="./node_modules/.bin/ts-node"
fi

$TS_NODE_PATH "$TS_FILE"

EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo "An error occurred while executing validate-env.ts"
  echo "Exiting..."
  exit 1
fi

if [[ $USE_RN_CLI = true ]]; then
  echo "Using react-native-cli"
  react-native run-ios --scheme $1 --mode $2 ${@:3}
  exit 0
else
  # check if expo is in node_modules
  if [ ! -d "./node_modules/expo" ]; then
    echo "expo not found. Installing expo locally..."
    yarn add -D expo
  fi

  echo "Using expo-cli"
  expo run:ios --scheme $1 --configuration $2 ${@:3}
  exit 0
fi