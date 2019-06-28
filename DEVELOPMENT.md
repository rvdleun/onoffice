# Development information

First off, I would like to say that this application is a prototype-turned-commercial-application-turned-open-source-project. While this does not excuse it, the code itself can be slightly messy at times, and I hope to improve this over time. (with your help, if you have the time)

## Frameworks and links
* The project is divided into two parts: The desktop application(that runs on the computer and acts as a server) and the WebVR client that runs in a browser.
* The application is created using [Electron](https://electronjs.org/), with the code being developed using [Angular](https://angular.io/). The files are served using [Express](https://expressjs.com/).
* The VR Client application is developed with [vue.js](https://vuejs.org/) and [AFrame](https://aframe.io).
* The [Angular2-Electron-Boilerplate](https://github.com/stokingerl/Angular2-Electron-Boilerplate) was used as a starting point.
* Communication between the application and client are done via [socket.io](https://socket.io) and [WebRTC](https://webrtc.org/).

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

This will open the application locally. There is currently no hot-reloading available, so you will need to close down and rerun the command to see your desktop changes.

# Build
[![Codeship Status for realitylab_ruben/virtual-office](https://app.codeship.com/projects/ae839ad0-b113-0136-608f-02af9aea0ff6/status?branch=master)](https://app.codeship.com/projects/310549)
New builds are automatically generated after a new commit in the master branch, using [Codeship](https://codeship.com).

## Instructions
Due to some issues with running the standard commands(in particular the size being 3x as big as it should be), a separate project in the `build` directory is setup to facilitate new builds.

Take the following steps to create a new build...

1. Enter the `build` directory
1. Run `sh prepare-build.sh`. This will prepare the source files in the directory
1. Next, run either `package-mac`, `package-linux` or `package-windows` to build a version for your platform.

# Application
The application is a simple user interface that lets the user setup a 360 panoramic image, pick what screen is going to be displayed in the virtual environment and set a pin for additional security.

Once the user starts streaming, an Express web-server will start serving the files for the client. After the user has logged in, a user interface will pop up that lets the user resize and center the screen in the virtual world.

## Important directories
* [src/app](src/app) - Angular source files
* [src/assets](src/assets) - Assets(images, fonts, etc)
* [src/electron](src/electron) - Electron source files

### src/app
* [src/app/pages/main](src/app/pages/main)

The app only has a single page implemented with two separate screens. The `MainPageComponent` is responsible for what screen is being displayed and playing the right animation to switch.

* [src/app/pages/main/settings-screen](src/app/pages/main/settings-screen)

Contains all components required for the settings screens, the first screen that the user sees

* [src/app/pages/main/streaming-screen](src/app/pages/main/streaming-screen)

Contains all components required when the user is actively sharing his desktop.

* [src/app/shared](src/app/shared)

Contains services that are required by multiple components

### src/electron
* [src/electron](src/electron)

Contains the main.js Electron script that initializes the application

* [src/electron/components](src/electron/components)

Contains components files, each one responsible for a certain feature within the application

# Client
The client contains the browser application that the user visits on his headset to view the Virtual Office.

## Important directories
* [client/assets](client/assets) - Assets(images, fonts, etc))
* [client/components](client/components) - AFrame components
* [client/splash-screen](client/splash-screen) - Vue scripts that handle the splash screen
* [client/systems](client/systems) - AFrame systems
* [client/vendor](client/vendor) - All vendor files
