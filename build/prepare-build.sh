#!/usr/bin/env bash
cd ..
npm install
npm rebuild node-sass --force
npm run build-electron

cd build
if [ -d "dist" ]; then
  rm -rf dist
fi

cp -r ../dist .
npm install

node ./minify-client.js

echo 'Now run npm run package-linux / package-mac / package-windows to create a build'