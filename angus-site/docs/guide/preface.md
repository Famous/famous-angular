---
layout: docs_guide
title: "Welcome to Ionic"
chapter: preface
---

# Chapter 1: All About Ionic

Welcome to the official guide to building HTML5 mobile apps with the Ionic Framework, written by the [creators](http://drifty.com/) of Ionic. It contains all you need to know to get started building apps with Ionic, and lays a foundation for more advanced development.

If you've used other mobile development frameworks in the past, you should find Ionic fairly similar to use. But getting started with any framework is always daunting, so we will start simple and expand on some basic concepts. But first, we need to talk a bit about the Ionic project itself, where it fits into the dev stack, and why we built it.

## What is Ionic, and where does it fit?

Ionic is an HTML5 mobile app development framework targeted at building hybrid mobile apps. Hybrid apps are essentially small websites running in a browser shell in an app that have access to the native platform layer. Hybrid apps have many benefits over pure native apps, specifically in terms of platform support, speed of development, and access to 3rd party code.

Think of Ionic as the front-end UI framework that handles all of the look and feel and UI interactions your app needs in order to be compelling. Kind of like "Bootstrap for Native," but with support for a broad range of common native mobile components, slick animations, and beautiful design.

Unlike a responsive framework, Ionic comes with very native-styled mobile UI elements and layouts that you'd get with a native SDK on iOS or Android but didn't really exist before on the web. Ionic also gives you some opinionated but powerful ways to build mobile applications that eclipse existing HTML5 development frameworks.

Since Ionic is an HTML5 framework, it needs a native wrapper like Cordova or PhoneGap in order to run as a native app. We strongly recommend using Cordova proper for your apps, and the Ionic tools will use Cordova underneath.

## Why did we build Ionic?

We built Ionic because we strongly believed that HTML5 would rule on mobile over time, exactly as it has on the desktop. Once desktop computers became powerful enough and browser technology had advanced enough, almost everyone was spending their computing time in the browser. And developers were overwhelmingly building web applications. With recent advancements in mobile technology, smartphones and tablets are now capable of running many of those same web applications.

With Ionic, we wanted to build an HTML5 mobile development framework that was focused on *native* or hybrid apps instead of mobile websites, since we felt there were [great tools](http://jquerymobile.com/) already for mobile website development. So Ionic apps aren't meant to be run in a mobile browser app like Chrome or Safari, but rather the low-level browser shell like iOS's UIWebView or Android's WebView, which are wrapped by tools like Cordova/PhoneGap.

And above all, we wanted to make sure Ionic was as open source as possible, both by having a permissive open source license that could be used in both commercial and open source apps, but by cultivating a strong community around the project. We felt there were too many frameworks that were *technically* open source, but were not open source in spirit or were not possible to use in both closed source and open source projects without purchasing a commercial license.

## Building Hybrid Apps With Ionic

Those familiar with web development will find the structure of an Ionic app straightforward. At its core, it's just a web page running in an native app shell! That means we can use any kind of HTML, CSS, and Javascript we want. The only difference is, instead of creating a website that others will link to, we are building a self-contained application experience.

The bulk of an Ionic app will be written in HTML, Javascript, and CSS. Eager developers might also dig down into the native layer with custom Cordova plugins or native code, but it's not necessary to get a great app.

Ionic also uses AngularJS for a lot of the core functionality of the framework. While you can still use Ionic with just the CSS portion, we recommend investing in Angular as it's one of the best ways to build browser-based applications today.

## Get building!

Now that you have and understanding of what Ionic is and why it exists, you are ready to start building your first app with it. Continue on to get everything installed and start building with Ionic!

[Chapter 2: Installation](installation.html)
