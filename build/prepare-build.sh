cd ..
npm install
npm rebuild node-sass --force
npm run build-electron

cd build
if [ ! -d "dist" ]; then
  ln -s ../dist
fi

npm install

echo 'Now run npm run package-linux / package-mac / package-windows to create a build'