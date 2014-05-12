---
layout: docs_api
active: angularjs
title: "Nav View"
header_sub_title: "Navigation stack"
---

Available in:
<div class="label label-primary">Ionic 0.9.x</div>

Nav Controller
===

The `<ion-nav-view>` directive is used to render templates in your application.  Each template is part of a state.  States are usually mapped to a url, and are defined programatically using angular-ui-router (see (https://github.com/angular-ui/ui-router/wiki)[their docs], and remember to replace ui-view with ion-nav-view in examples).

## API

<table class="table">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>animation</td>
      <td><b>string|expression</b></td>
      <td>slide-left-right</td>
      <td>The animation used to transition between pages. 'Available: slide-left-right', 'slide-left-right-ios7'</td>
    </tr>
  </tbody>
</table>

## \<ion-nav-view\> Example

In this example, we will create a navigation view that contains our different states for the app.

To do this, in our markup use the `<ion-nav-view>` top level directive, adding a `<ion-nav-bar>` directive which will render a header bar that updates as we navigate through the navigation stack.

```html
<ion-nav-view>
  <!-- Center content -->
  <ion-nav-bar>
  </ion-nav-bar>
</ion-nav-view>
```

Next, we need to setup our states that will be rendered.

```js
var app = angular.module('myApp', ['ionic']);
app.config(function($stateProvider) {
  $stateProvider
  .state('index', {
    url: '/',
    templateUrl: 'home.html'
  })
  .state('music', {
    url: '/music',
    templateUrl: 'music.html'
  });
});
```

Then on app start, `$stateProvider` will look at the url, see it matches the `index` state, and then try to load `home.html` into the `<ion-nav-view>`.

Pages are loaded by the URLs given. One simple way to create templates in Angular is to put them directly into your HTML file and use the `<script type="text/ng-template">` syntax. So here is one way to put `home.html` into our app:

```html
<script id="home" type="text/ng-template">
  <!-- The title of the ion-view will be shown on the navbar -->
  <ion-view title="'Home'">
    <ion-content ng-controller="HomeCtrl">
      <!-- The content of the page -->
      <a href="#/music">Go to music page!</a>
    </ion-content>
  </ion-view>
</script>
```

This is good to do because the template will be cached for very fast loading, instead of loading it off of the network.

We can use urls to navigate, or use anything from the angular-ui-router library (see [angular-ui-router's documentation](https://github.com/angular-ui/ui-router/wiki) for more information on states and transitioning between them.
