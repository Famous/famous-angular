---
layout: docs_api
active: angularjs
title: "Platform"
header_sub_title: "Platform Interaction and Information"
---

Platform
===

Ionic is primarily designed to work inside a hybrid app, meaning is should be wrapped with either Cordova or PhoneGap. Included within Ionic is a handful of useful methods to make it easier to interact with the wrapper.

For platform information, the `org.apache.cordova.device` plugin must be installed. If ionic was installed with the [ionic npm module](https://npmjs.org/package/ionic) it'll automatically get installed too.


## ionic.Platform.ready(callback)

Like with the DOM or `window.onload`, Cordova isn't always ready and any code interacting with Cordova needs to wait until it is. Code depending on Cordova should use `ionic.Platform.ready(callback)`. Once Cordova is ready, the callbacks sent into the method will fire off. Additionally, if Cordova is already set, then the callback will immediately fire off.

You can safely run the ready method anywhere within you're Ionic code and trust it'll run when Cordova is all set to go. Also, if the app is not wrapped with Cordova, the ready callbacks will fire off after `window.onload`.

```javascript
ionic.Platform.ready(function(){
  console.log("Cordova is ready, let's do this!");
});
```


## ionic.Platform.device()

Returns information about the device. This information will only be available after the platform is ready. Remember the `org.apache.cordova.device` plugin must be installed, and this method will not provide any information when not in Cordova, or the device plugin isn't installed.

- __device.model__: Get the device's model name.
- __device.platform__: Get the device's operating system name.
- __device.uuid__: Get the device's Universally Unique Identifier (UUID).
- __device.version__: Get the operating system version.

```javascript
ionic.Platform.ready(function(){
  var device = ionic.Platform.device();
  console.log("Hey, I'm an", device.platform);
});
```


## ionic.Platform.fullScreen([showFullScreen[, showStatusBar]])

You can put your app in full screen mode, which removes the status bar at the top. By default `showFullScreen` is set to true, and `showStatusBar` is false. This method does not have to be wrapped in ready().

```javascript
ionic.Platform.fullScreen();
```

## ionic.Platform.exitApp()

Closes the app.

```javascript
ionic.Platform.exitApp();
```

