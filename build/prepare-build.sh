#!/usr/bin/env bash
# Install client dependencies
cd ../client
npm install

# Build application
cd ..
npm install
npm rebuild node-sass --force
npm run build

# Setup build directory, install necessary modules
cd build
npm install

# Remove dist directory
if [ -d "dist" ]; then
  rm -rf dist
fi
cp -r ../dist .

# Remove the symlink and copy the client directory
cd dist
rm -rf client
cp -r ../../client/dist ./client
cd ..

echo 'Now run npm run package-linux / package-mac / package-windows to create a build'
