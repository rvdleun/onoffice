# If virtual-office doesn't exist yet
cd ..
npm install
npm rebuild node-sass --force
npm run build-electron

cd build
if [ ! -d "node_modules" ]; then
  ln -s ../node_modules
fi

if [ ! -d "dist" ]; then
  ln -s ../dist
fi

npm run package-mac