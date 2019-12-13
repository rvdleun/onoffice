#!/usr/bin/env bash
cd ..
npm install
npm rebuild node-sass --force
npm run build

cd build
if [ -d "dist" ]; then
  rm -rf dist
fi
cp -r ../dist .

echo 'Now run npm run package-linux / package-mac / package-windows to create a build'
