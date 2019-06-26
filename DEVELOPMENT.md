# Development information

First off, I would like to say that this application is a prototype-turned-commercial-application-turned-open-source-project. While this does not excuse it, the code itself can be slightly messy at times, and I hope to improve this over time. (with your help, if you have the time)

## Frameworks and links
* The project is divided into two parts: The application(that runs on the computer) and the WebVR client that runs in a browser.
* The application is created using Electron, with the code being developed using Angular.
* The VR Client application is developed with vue.js and AFrame.
* The Angular2-Electron-Boilerplate was used as a starting point.
* Communication between the application and client are done via socket.io and WebRTC.

# Getting Started

Clone this repository locally:

``` bash
git clone https://github.com/stokingerl/Angular2-Electron-Boilerplate.git
```

Install dependencies:

``` bash
npm install
```

Build Electron app and run current app locally:

Linux / Mac
``` bash
npm start
```

Windows
``` bash
npm start-windows
```

This will open the application locally. There is currently no hot-reloading available.

## Included Commands

- `npm run build-electron` - builds your Angular2 app and throws the result as well as your electron main.js file into the dist folder
- `npm start` - runs `npm run build-electron` and starts your app in electron by running `main.js`
- `npm run package-mac` - builds your application and generates a `.app` file of your application that can be run on mac. NOTE: I am like 99% sure you need to be on a MAC OS machine to be able to run this.
- `npm run package-windows` - builds your application and creates an app consumable in windows 32 bit systems. NOTE: If you build this on MAC OS or linux you need wine installed, which can be installed with `brew install wine`
- `npm run package-linux` - builds your application and creates an app consumable on linux systems.
- `npm run full-build-mac` - creates a `.dmg` installer for mac platforms.
- `npm run full-build-windows` - creates an installer for windows platforms.

# Application
The application 

# Client
