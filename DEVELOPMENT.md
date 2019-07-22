# Development information

First off, I would like to say that this application is a prototype-turned-commercial-application-turned-open-source-project. While this does not excuse it, the code itself can be slightly messy at times, and I hope to improve this over time. (with your assistance, if you have the time)

Nonetheless, thank you for taking the time to read this document and are possibly interested in helping out. Let me know if there is anything unclear. The easiest way to reach me is via the following methods...

* I've opened an #onoffice channel at the [AFrame Slack group](https://aframe.io/slack-invite/).
* You can reach me via a direct message on Twitter at [@rvdleun](https://twitter.com/rvdleun).
* Finally, you can also email me at [onoffice@leunix.nl](mailto:onoffice@leunix.nl).


## What can I contribute
The [README.md](./README.md) file contains a roadmap with features that I would like to implement. Please check the issues page for any progress on the feature and indicate if you want to put some work into it.

## Frameworks and links
* The project is divided into two parts: The desktop application(that runs on the computer and acts as a server) and the WebVR client that runs in a browser.
* The application is created using [Electron](https://electronjs.org/), with the code being developed using [Angular](https://angular.io/). The client files are served using [Express](https://expressjs.com/).
* The VR Client application is developed with [vue.js](https://vuejs.org/) for the splashscreen and [AFrame](https://aframe.io) for the WebVR part.
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

# Build
[![Codeship Status for rvdleun/onoffice](https://app.codeship.com/projects/7a60cb80-7e6b-0137-53f1-322a9402e464/status?branch=master)](https://app.codeship.com/projects/351651)

New builds are automatically generated after a new commit in the master branch, using [Codeship](https://codeship.com). The results are uploaded to an Amazon S3 bucket.

The latest builds can be found at: [Windows](https://on-office.s3.eu-west-2.amazonaws.com/builds/OnOffice-windows.zip) - [Mac](https://on-office.s3.eu-west-2.amazonaws.com/builds/OnOffice-mac.zip) - [Linux](https://on-office.s3.eu-west-2.amazonaws.com/builds/OnOffice-linux.zip)

At the moment, I have to admit that I do most of my development and testing on my Macbook. I do try out and test it as thoroughly on Linux and Windows as possible, but not as much as I'd should/want to.

## Instructions
Due to some issues with running the standard commands(in particular the size being 3x as big as it should be), a separate project in the `build` directory is setup to facilitate new builds.

Take the following steps to create a new build...

1. Enter the `build` directory.
1. Run `sh prepare-build.sh`. This will prepare the source files in the directory.
1. Next, run either `package-linux`, `package-mac` or `package-windows` to build a version for your platform.
1. The result can be found in the `release-builds` directory.

# Application
The application is a user interface that lets the user setup a 360 panoramic image, pick what screen is going to be displayed in the virtual environment and set a numeric pincode for additional security.

Once the user starts streaming, an Express web-server will start serving the files for the client. After the user has logged in, a user interface will pop up that lets the user resize and center the screen in the virtual world.

## To start development

* Run `npm start` or `npm start-windows` to build and run the project.

This will open the application locally. There is currently no hot-reloading available, so you will need to close down and rerun the command to see your desktop changes.

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

## To start development

* Run `npm start` or `npm start-windows` to open the Electron app.  
* Press 'Start Streaming'
* Open a browser and connect to `http://localhost:24242`

Note that you won't need to rerun the start command. Any changes made in the `client` directory will immediately be displayed on refreshing the page.

## Important directories
* [client/assets](client/assets) - Assets(images, fonts, etc))
* [client/components](client/components) - AFrame components
* [client/splash-screen](client/splash-screen) - Vue scripts that handle the splash screen
* [client/systems](client/systems) - AFrame systems
* [client/vendor](client/vendor) - All vendor files

# WebRTC implementation
This section will cover how a connection is setup between the desktop and the VR Headset. In the code(and this section), the desktop will be referred to as *host*, and the headset connection as the *client*.

WebRTC has been implemented using [PeerJS](http://peerjs.com). The PeerJS server runs on the host. [Socket.io](socket.io) is used to send the client ID to the host.

* (*host*) After the user has pressed 'Start Streaming', `setWebServerActive` is called in [webserver.component.js](./src/electron/components/webserver.component.js). This boots the Express server to serve the client's files, starts socket.io and initialises the PeerJS server.
* (*client*) Once the user has opened the client in the browser, it will first initialise the VR scene and then connects to the host via socket.io. This is coded in [splash-screen.js](client/splash-screen/splash-screen.js).
* (*client*) After receiving a `client_message`(indicating that the host has approved and wants to start streaming), the `setup()` function in [webrtc.system.js](./client/systems/webrtc.system.js) is called.
* (*client*) A connection the PeerJS server is made. Once this has been opened, the client has received a random ID to identify itself. This ID is sent to the host.
* (*host*) The `setupConnection()` function in [stream.service.ts](./src/app/shared/stream.service.ts) handles the clientID, along with the sources that it has to stream. At the moment, streaming only one display is supported.
* (*host*) A stream is created. The host also connects to PeerJS now. Once this is done, it uses the [call()](https://peerjs.com/docs.html#peercall) to connection to the Client ID.
* (*client*) Back in [webrtc.system.js](./client/systems/webrtc.system.js), the call is received and answered. This results in the stream being available in the `stream` event.
