#!/bin/bash

cd rnb-cli 
yarn install
yarn link
cd ..
yarn link rnb-cli
npx rnb-cli rename
npx pod-install