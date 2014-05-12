---
layout: docs
title: "Framework Support"
---

# Ionic Framework Support

Ionic was designed to be framework agnostic. We wanted to build a vanilla HTML, CSS, and Javascript framework that didn't rely on any single framework for functionality.

We designed all of the low level View Controllers and Views (like Side Menus and Tabs) such that they would only need a DOM Element reference to work on.

For the first few releases of Ionic, we have shipped AngularJS extensions __that are the recommended way to build Ionic apps__. Unfortunately, some functionality (in particular, animations) are only available in the AngularIonic extensions. This was mainly due to time constraints for the first release. However, we are working to remove this reliance on AngularJS and equalize the Angular extensions and the low-level APIs.
