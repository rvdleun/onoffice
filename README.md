# Angular2 Electron Boilerplate

A boilerplate for using Angular2 to create multi-platform desktop apps in Electron. Currently runs with:

- Angular v4.0.0
- Angular-CLI v1.0.0
- Electron v1.6.2
- Electron-Packager v8.6.0

This app gives you the capability to:

- Run Angular2 in a local development environment in Electron
- Package your application into apps that run on Mac, Windows and Linux
- Build installers that run on Mac and Windows

## System requirements

- Global installs of Node.js (prfererably lastest v6.10.1), npm (preferably latest v3.10.10), @angular/cli (preferably latest v1.0.0), Electron (preferably latest v1.6.2) and Electron-Packager.

## Getting Started

Clone this repository locally:

``` bash
git clone https://github.com/stokingerl/Angular2-Electron-Boilerplate.git
```

Install dependencies:

``` bash
npm install
```

Build angular2 code and run current app locally (DOES NOT CURRENTLY DO HOT RELOAD):

``` bash
npm start
```

This should pop up your Angular2 in Electron:

![Demo](http://i.imgur.com/NJ7w7rd.png)

To be able to use Developer tools, go to `View > Toggle Developer Tools`. You should be able to fine all of your Angular2 code in the 'webpack' section of 'sources'.

## Included Commands

- `npm run build-electron` - builds your Angular2 app and throws the result as well as your electron main.js file into the dist folder
- `npm start` - runs `npm run build-electron` and starts your app in electron by running `main.js`
- `npm run package-mac` - builds your application and generates a `.app` file of your application that can be run on mac. NOTE: I am like 99% sure you need to be on a MAC OS machine to be able to run this.
- `npm run package-windows` - builds your application and creates an app consumable in windows 32 bit systems. NOTE: If you build this on MAC OS or linux you need wine installed, which can be installed with `brew install wine`
- `npm run package-linux` - builds your application and creates an app consumable on linux systems.
- `npm run full-build-mac` - creates a `.dmg` installer for mac platforms.
- `npm run full-build-windows` - creates an installer for windows platforms.

## Electron

This app is run with a simple Electron window. The code for this is managed at `/src/electron/main.js` and any configuration can be altered there. Check out [Electron](https://github.com/electron/electron) for more information

## Angular-CLI

This project was created intially with @angular/cli version 1.0.0, all angular-cli commands should work with this app. Even if you do `ng build` and `ng serve`, you can open the strictly web portion of this app in `http://localhost:4200`. Check out [Angular-CLI](https://github.com/angular/angular-cli) for more details.

## Build

Run `npm run build-electron` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Special thanks and recommendations

This boilerplate would not be possible without these repositories:

- [Auth0 Angular2 and Electron starter app](https://github.com/auth0-blog/angular2-electron)
- [Electron Quick Start Guide](https://github.com/electron/electron-quick-start)
- [Electron Tutorial App](https://github.com/crilleengvall/electron-tutorial-app)

Recommended packages:

- [ngx-electron](https://www.npmjs.com/package/ngx-electron)
