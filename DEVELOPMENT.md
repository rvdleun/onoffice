# Development information

First off, I would like to say that this application is a prototype-turned-commercial-application-turned-open-source-project. While this does not excuse it, the code itself can be slightly messy at times, and I hope to improve this over time. (with your assistance, if you have the time)

Nonetheless, thank you for taking the time to read this document and are possibly interested in helping out. Let me know if there is anything unclear. The easiest way to reach me is via the following methods...

* I've opened an #onoffice channel at the [AFrame Slack group](https://aframe.io/slack-invite/).
* You can reach me via a direct message on Twitter at [@rvdleun](https://twitter.com/rvdleun).
* Finally, you can also email me at [onoffice@leunix.nl](mailto:onoffice@leunix.nl).

# Vision
To create a virtual environment where Windows, Mac and Linux users can work in peace using any HMD that supports WebVR.

On/Office can promote the pro's of building a VR application with standard browser technology. For years, we've been building apps that work on nearly any device, from the mobile to the desktop. WebVR offers this as well, letting us build something that can work from the Cardboard to the Vive.

This is why it's key that any feature in On/Office should be accessible on any device, regardless of whether it is 3DOF, 6DOF or has controllers. The Electron application allows us to develop an interface that the user can access to control his environment.

However, this doesn't mean that we should ignore the hardware with more capabilities. If a feature can be enhanced with controller input, it should. But my personal preference is to first get something working on less powerful hardware and then move upwards.

## Why a standalone Electron application?
Technically, everything in On/Office could also be done by hosting a server online to exchange WebRTC information, and the client could be hosted online as well. This was actually the original setup. The main reason why I went for this route instead is two-fold...

### Mouse tracker
This is the big one. There is still a lot of lag when streaming the desktop to the headset. To accommodate this, the cursor position is sent to the client whenever it moves. This data is so small that it's basically sent instantaneously, and the cursor can be updated automatically on the client. 

Because the mouse reacts nearly one-on-one with what the user is doing, it kinda feels like working with a remote computer. It makes the implementation actually useful.

Unfortunately, I have not found a way to replicate this in a browser. I can only track the cursor if it is within an active browser window. If there is way to do this via, say, an extension in the browser, I might be interested in getting an online option to work.

### No need to host anything
I will have to be honest that this is the other reason why I prefer an Electron application. This project is very much a hobby project, and I do not want people to be dependent off me to keep the application running. That is why I want it to be as standalone as possible.

# How can I contribute?
The [README.md](./README.md) file contains a roadmap with features that I would like to implement. Please check the issues page for any progress on the feature and indicate if you want to put some work into it.

# Frameworks and links
* The project is divided into two parts: The desktop application(that runs on the computer and acts as a server) and the WebVR client that runs in a browser.
* The application is created using [Electron](https://electronjs.org/), with the code being developed using [Angular](https://angular.io/). The client files are served using [Express](https://expressjs.com/).
* The VR Client application is developed with [vue.js](https://vuejs.org/) for the splashscreen and [AFrame](https://aframe.io) for the WebVR part.
* The [Angular2-Electron-Boilerplate](https://github.com/stokingerl/Angular2-Electron-Boilerplate) was used as a starting point.

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

## Tips
* When adding `?no-source` to the URL, then no video will be streamed and the splashscreen is automatically removed once the client has finished connecting. This was added to ease development.

# WebRTC implementation
This section will cover how a connection is setup between the desktop and the VR Headset. In the code(and this section), the desktop will be referred to as *host*, and the headset connection as the *client*.

WebRTC has been implemented using [SimplePeer](https://github.com/feross/simple-peer).

* (*host*) After the user has pressed 'Start Streaming', `setWebServerActive` is called in [webserver.component.js](./src/electron/components/webserver.component.js). This boots the Express server to serve the client's files and an API to exchange signal information.
* (*client*) Once the user has opened the client in the browser, it will first initialise the VR scene. After that, it will try to connect to the server and create a session. This is coded in [splash-screen.js](client/splash-screen/splash-screen.js).
* (*server*) The server creates a new session by creating a new ID(using [uniqid](http://github.com/adamhalasz/uniqid/)) and preparing an array to store responses. More on that later.
* (*host*) The host creates a new SimplePeer object for this session in [peer.service.ts](src/app/shared/peer.service.ts).
* (*client*) Once the connection has been established, the [peer system](client/systems/peer.system.js) will create a new SimplePeer instance and start creating signals. These signals are sent to the server by doing a POST request to `/signal` and supplying it with the Session ID. It will send 2-3 signals.
* (*server*) The response object is stored in the session's object(so no response given yet), and the signal is passed to host.
* (*host*) The signals are passed to the peer's session object. New signals are created and passed back to the server.
* (*server*) At this point, the server grabs one of the open requests from the client and returns the signal from the server.
* (*client*) The client passes the received signal to the SimplePeer object.
* (*client*) Eventually, the two browsers are connected.

## Shouldn't the client just get the signals by polling?
I suppose. I wanted to avoid polling and thought this was a neat way to solve it. If there are any drawbacks, I could refactor it.
