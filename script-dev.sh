#!/bin/bash
yarn link "@klassroom/klassroom-react-lib" &&
yarn link "@klassroom/klassroom-sdk-js" &&
yarn link "react" &&
PORT=3002 npm run start
