---
layout: docs_guide
title: "Testing your App"
chapter: testing
---

Previous: <a href="starting.html">Starting your app</a>

# Chapter 4: Testing your App

Now, since we actually have something to look at, we need to talk about the testing and development process for our app. There are four ways to test your app as you develop: in a desktop WebKit browser, in the iOS or Android simulator, in a mobile browser on your phone, or as a native app on the phone.

### Desktop browser testing

Unless you are using custom Cordova plugins, or a lot of Cordova specific code, it's very easy to test in the desktop browser. The easiest thing is to `cd` into the `www` folder, and run

```bash
$ python -m SimpleHTTPServer 8000
```

Substitute SimpleHTTPServer with http.server if your Python version is 3.x (run `python --version` to check). This will start a tiny web server hosting all of the files in the `www` folder. All you have to do to test it is open Chrome or Safari and navigate to `http://localhost:8000`. You should see something that looks like this:

<img src="http://ionicframework.com.s3.amazonaws.com/guide/0.1.0/3-running.png" style="border: 1px solid #ccc; border-radius: 4px;" alt="Running">

Try dragging the center content to the right (works with the mouse as well) to expose the left menu. Smooth like butter!

### Simulator testing

You can also test right in the simulator using the cordova commands from the previous chapter. For example, to test in the iOS simulator, `cd` into the root of the project (one level up from the `www` folder), and run:

```bash
$ ionic build ios
$ ionic emulate ios
```

Substitute ios with android for Android testing. If you want to get advanced, you can also open up the project file for a specific platform by opening the required XCode or Android Eclipse project in `platforms/PLATFORM` inside the root of your project. Then, you can build and test from inside the platform-specific IDE. Note: if you go this route, I recommend still working inside of the root `www` folder, and when you've made changes to this folder, run the command:

```bash
$ ionic prepare ios
```

Which will update the ios specific project with the code from the `www` folder. Note: this will overwrite any changes you've made to the `platforms/ios/www` and other platform-specific folders.

### Mobile browser testing

You can also test the app directly in a mobile browser. For OS X users, Safari on OS X can directly debug websites and simulator applications. First you have to enable the remote web inspector on both the device and Safari on desktop. To do this with iOS 7 and OS X Mavericks, enable the `Web Inspector` option in the iOS Settings -> Safari -> Advanced section, and also enable the Developer Menu in the Advanced section of the Safari OS X settings.

Android apps supporting Android 4.4 or above can also use Chrome for remote debugging. Check out the Android docs for [more info](http://developer.android.com/guide/webapps/debugging.html).

If you are using the local server method from the Desktop testing section and you are on the same network as the desktop computer, you can connect to the ip address of the desktop computer to test. So, if our desktop is running a test server at `192.168.1.123:8000`, we can just load that address into our mobile Chrome or Safari to test it.

One problem with testing in a mobile browser is that it's probably the furthest of the three options from the actual app experience. This is largely because the browser app is meant for browsing websites, so it often adds functionality that conflicts with your app. For example, Chrome and Safari both listen for drag events on the sides of the app which let you switch between open tabs. They also have issues with the URL bars getting in the way, and some scrolling behavior is not the same as it is in the web view running in Cordova. It is fine for small tests, but not recommended for more complex apps.

### Testing as a native app

Since we are building a native (or "hybrid") app, we can (and should!) test it as one. There are serveral ways to do this. If you are building for iOS, you'll need to sign up for an [Apple Developer](https://developer.apple.com/) account to test as a native app on an iPhone or iPad. Unfortunately, this costs $99 per year (don't blame us!). Once you have an account and you have set up XCode with your certificates to enable device testing, you'll want to open the XCode project from `platforms/ios/` and do your testing from XCode.

Testing on Android is much easier and faster. To test on the device, simply plug it in, and run

```bash
$ cordova run android
```

If this doesn't work, make sure you have USB debugging enabled on your device, as [described](http://developer.android.com/tools/device.html) on the Android developer site.

## Building it out

Now that we have a shell to test and we know how to test our app, let's start building out the guts of the app!

[Chapter 5: Building out your App](building.html)


