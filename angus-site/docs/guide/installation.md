---
layout: docs_guide
title: "Installing Ionic and its Dependencies"
chapter: installation
---

Previous: <a href="preface.html">What is Ionic?</a>

# Chapter 2: Getting Everything Installed

In this chapter, we are going to walk through the process of downloading Ionic and installing all necessary dependencies for development.

## Platform notes

First, we need to start with a note about minimum requirements for building your app with the current release of Ionic. Ionic only works on iPhone and Android devices (currently). We support iOS 6+, and Android 2.3+ (though we recommend 4.1+ for the best experience). However, since there are a lot of different Android devices, it's possible certain ones might not work. As always, we are looking for help testing and improving our device compatibility and would love help from the community on our [GitHub](https://github.com/driftyco/ionic) project.

You can develop Ionic apps on any operating system you prefer. In fact, Ionic has been developed at various times on Mac OS X, Linux, and Windows. However, right now you'll need to use the command line in order to follow this guide and you must have OS X in order to develop and deploy iPhone apps, so OS X is recommended if possible.

If you are on Windows, make sure to download and install [Git for Windows](http://git-scm.com/download/win) and optionally [Console2](http://sourceforge.net/projects/console/). You will be executing any commands in this guide in the Git Bash or Console2 windows.

First, we will go and install the most recent version of [Apache Cordova](http://cordova.apache.org/), which will take our app and bundle it into a native wrapper to turn it into a traditional native app.

To install Cordova, make sure you have [Node.js](http://nodejs.org/) installed, then run

    $ sudo npm install -g cordova

Drop `sudo` from the above command if running on Windows. Depending on the platforms you wish to develop for, you'll need to install platform-specific tools. Follow the Cordova platform guides for [Android](http://cordova.apache.org/docs/en/3.4.0/guide_platforms_android_index.md.html#Android%20Platform%20Guide) and [iOS](http://cordova.apache.org/docs/en/3.4.0/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide) to make sure you have everything needed for development on those platforms. Luckily, you'll only need to do this once.

<button type="button" class="btn btn-danger btn-sm" data-toggle="collapse" data-target="#android-linux-note">
  Linux Android note
</button>

<div id="android-linux-note" class="collapse well">
<p>
  If you are running a 64-bit version of Ubuntu, you'll need to install the 32-bit libraries since Android is only 32-bit at the moment.
  <code>$ sudo apt-get install ia32-libs</code>
</p>
</div>

<button type="button" class="btn btn-danger btn-sm" data-toggle="collapse" data-target="#java-note">
  Windows note on Java, Ant and Android
</button>

<div id="java-note" class="collapse well">
<p>
  Windows users developing for Android: You'll want to make sure you have the most recent [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html) (NOT just the JRE) installed and that you have installed ant. To install ant, download a zip from <a href="http://www.interior-dsgn.com/apache//ant/binaries/apache-ant-1.9.2-bin.zip">here</a>, extract it, move the first folder in the zip to a safe place, and update your PATH to the <code>bin/</code> folder in that folder. For example, if you moved the ant folder to <code>c:/</code>, you'd want to add this to your PATH: <code>C:\apache-ant-1.9.2\bin</code>.
</p>
<p>
  Next, set a path entry for JAVA_HOME pointing to the root of the JDK folder that was created when you installed the Java JDK above. So, if you installed the JDK into <code>C:\Program Files\Java\jdk7</code>, set JAVA_HOME to be this path. After that add the JDK's bin directory to the PATH variable as well, following the previous assumption, this should be <code>C:\Program Files\Java\jdk7\bin</code>
</p>
<p>
  Cordova also requires the ANDROID_HOME entry to be set, this should point to the <code>[ANROID_SDK_DIR]\sdk\tools</code> directory.
</p>
<p>
Whenever you make changes to the PATH, or any other environment variable, you'll need to restart or open a new tab in your shell program for the PATH change to take effect.
</p>
</div>

## Install Ionic

Ionic comes with a convenient command line utility to start, build, and package Ionic apps.  It uses [gulp](http://gulpjs.com) to help us build.

To install it, simply run:

```bash
$ sudo npm install -g gulp ionic
```

## Create the project

Now, we need to create a new Cordova project somewhere on the computer for the code for our app:

    $ ionic start hello

That will create a folder called `hello` in the directory the command was run. Next, we will change into that directory:

    $ cd hello

If you are planning on using any version control system, you can go ahead and set it up using this new folder. For new apps, follow this folder structure to get up and running quickly:

## Configure Platforms

Now, we need to tell ionic that we want to enable the iOS and Android platforms. Note: if you are on Windows, leave out the iOS platform:

```bash
$ ionic platform ios
$ ionic platform android
```

If you see errors here, make sure to follow the platform guides above to install necessary platform tools.

<button type="button" class="btn btn-danger btn-sm" data-toggle="collapse" data-target="#osx-android-note">
  Android on OS X note
</button>

<div id="osx-android-note" class="collapse well">
<p>
  If you get this error: <code>[Error: ERROR : Make sure JAVA_HOME is set, as well as paths to your JDK and JRE for java.]</code> Then try running this command first before adding the android platform:
</p>
<p>
  <code>$ export JAVA_HOME=$(/usr/libexec/java_home)</code>
</p>
</div>

## Test it out

Just to make sure the default project worked, try building and running the project (substitute ios for android to build for Android instead):

```bash
$ ionic build ios
$ ionic emulate ios
```

<button type="button" class="btn btn-danger btn-sm" data-toggle="collapse" data-target="#android-emulator-note">
  Android emulator note
</button>

<div id="android-emulator-note" class="collapse well">
<p>
If you chose to emulate on Android, be patient as this takes serveral minutes as the Android emulator is booted up. If you don't see anything happen for a few minutes, make sure you've created an Android Virtual Device (AVD), and that it is using the Android SDK version 17 or above. You might have to <a href="http://stackoverflow.com/questions/7222906/failed-to-allocate-memory-8">reduce the amount of memory</a> the AVD is using if you don't see the emulator boot up in a minute. The platform guide above has more information. You may also want to double check that you have the sdk and platform tools in your PATH as noted in the platform guide.
</p>
<p>

The emulator takes a LONG time to boot. After about 5 or 10 minutes, you should see the default Cordova app running in the emulator:

<img src="http://ionicframework.com.s3.amazonaws.com/guide/0.1.0/1-emulator.jpg" alt="Android Emulator">
</p>
<p>
Of course, you can always test directly on the device, and that is the recommended way to develop on Android due to the slow emulator. To do that,
substitute <code>emulate</code> with <code>run</code> and ensure you have an Android device connected to the computer.
</p>
</div>


## Clearing the defaults

Before we start building our app, we should remove all the Cordova default code. Go ahead and run the following commands:

```bash
$ rm www/index.html
$ rm www/js/*
$ rm www/css/app.css
```

## Cordova Config

We need to make some quick configuration changes to Cordova defaults to make sure our app behaves normally. Specifically, we need to turn off Web View bouncing that is on by default for iOS apps. Open up `config.xml` and add these preferences to the bottom:

```xml
<preference name="webviewbounce" value="false" />
<preference name="UIWebViewBounce" value="false" />
<preference name="DisallowOverscroll" value="true" />
```

## Let's go!

Now we are ready to start building our app, so continue on to the next chapter:

[Chapter 3: Starting your app](starting.html)
