# This bash file is specificaly create to install wine during the build on codeship
sudo dpkg --add-architecture i386
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
sudo apt-add-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ xenial main'
sudo apt update
sudo apt-get -y install --install-recommends winehq-stable
