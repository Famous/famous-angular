---
layout: docs_api
active: angularjs
title: "View State Service"
header_sub_title: "Navigation and history stack"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.x</div>

Views and Navigation
===

{% include codepen.html id="HjnFx" %}

As a user navigates throughout your app, Ionic is able to keep track of their navigation history. By knowing their history, transitions between views correctly slide either left or right, or no transition at all. An additional benefit to Ionic's navigation system is its ability to manage multiple histories.

Ionic uses the [AngularUI Router](https://github.com/angular-ui/ui-router) module so app interfaces can be organized into various "states". Like Angular's core `$route` service, URLs _can_ be used to control the views. However, the AngularUI Router provides a more powerful state manager in that states are bound to named, nested, and parallel views, allowing more than one template to be rendered on the same page. Additionally, each state is not required to be bound to a URL, and data can be pushed to each state which allows much flexibility. More about the [navView directive here](/docs/angularjs/controllers/nav/).

With Angular's core [$route service](http://docs.angularjs.org/api/ngRoute.$route), the `ngView` was used to render the template of the current route. With the AngularUI Router as the base, Ionic instead uses the `navView` directive to renders templates. One of the largest advantages to `navView` is that views can be nested, and allows multiple nav-views on one page.

## Navigation History

The View Service keeps track of the user's navigation history, such as what views are forward and backward from the current view (like a browser's back button). Using the service, the directives also know which direction an animations transition should happen, such as navigating between views (should it  slide left because you're navigating forward, or slide right because you're navigating backwards).

The View Service is leveraged by the Ionic's `tabs` directive, which has child `tab` directives. Each tab requires its own history stack (forward and back buttons), and to do so each tab has its own `navView` directive. This system is similar to what you see in modern apps, such as iOS's App Store, or Android's Play Store.

## \<ion-nav-view\>

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
      <td><b>string</b></td>
      <td>slide-left-right</td>
      <td>The animation used to transition between pages.</td>
    </tr>
  </tbody>
</table>


## \<ion-nav-bar\>

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
      <td><b>string</b></td>
      <td>nav-title-slide-ios7</td>
      <td>The animation used to transition between titles.</td>
    </tr>
    <tr>
      <td>type</td>
      <td><b>string</b></td>
      <td></td>
      <td>The class to assign to the navbar.  For example, 'bar-positive'.</td>
    </tr>
    <tr>
      <td>back-button-type</td>
      <td><b>string</b></td>
      <td>button-icon</td>
      <td>Set to empty string to disable back button.</td>
    </tr>
    <tr>
      <td>back-button-icon</td>
      <td><b>string</b></td>
      <td>ion-{<span>{</span>platform}}-arrow-back</td>
      <td>Any class name from ionicons.</td>
    </tr>
    <tr>
      <td>back-button-label</td>
      <td><b>string</b></td>
      <td>Title of previous view</td>
      <td></td>
    </tr>
    <tr>
      <td>align-title</td>
      <td><b>string</b></td>
      <td>center</td>
      <td>Where to align the title of the navbar.  Available: 'left', 'right', 'center'.</td>
    </tr>
  </tbody>
</table>

## Quick Start

To start, we place a `<ion-nav-view></ion-nav-view>` at the root of the app. The ion-nav-view directive tells Ionic where to place your templates. A view can be unnamed or named, but only one unnamed view can be within any template (or root html). The ion-nav-view directive is based off of the [ui-view directive within the ui-router](https://github.com/angular-ui/ui-router/wiki/Quick-Reference#ui-view).

If have an `<ion-nav-view>` element, we can also create an `<ion-nav-bar>` which will create a topbar that updates as the application state changes. We can also add some styles and set up animations:

```html
<body ng-app="starter">

  <!-- The nav bar that will be updated as we navigate -->
  <ion-nav-bar animation="nav-title-slide-ios7"
           type="bar-positive"
           back-button-type="button-icon"
           back-button-icon="ion-arrow-left-c"></ion-nav-bar>

  <!-- where the initial view template will be rendered -->
  <ion-nav-view animation="slide-left-right"></ion-nav-view>

</body>
```

### State Provider Setup

We can set up Angular to listen for various routes, match which state should be loaded, and render the state's template into the correct `<ion-nav-view>`.

```javascript
angular.module('myApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "home.html",
      controller: 'HomeCtrl'
    })
    .state('about', {
      url: "/about",
      templateUrl: "about.html",
      controller: 'AboutCtrl'
    })
    .state('contact', {
      url: "/contact",
      templateUrl: "contact.html"
    })

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/home");
})

.controller('HomeCtrl', function($scope) {
  console.log('HomeCtrl');
})

.controller('AboutCtrl', function($scope) {
  console.log('AboutCtrl');
});
```

Please visit [AngularUI Router's docs](https://github.com/angular-ui/ui-router/wiki) for more info. Below is a great video by the AngularUI Router guys that may help to explain how it all works:

<iframe width="560" height="315" src="//www.youtube.com/embed/dqJRoh8MnBo" frameborder="0" allowfullscreen></iframe>


### Nav Bar And Header Titles

The `ion-nav-bar` uses the View Service to update the header title as the user transitions through the app. For each transition, the title comes from the `title` attribute within the `view` transitioning in.


### Templates and Views

Next, in each state's template should contain a `view` directive, which provides the view's title:

```javascript
{% raw %}
<script id="home.html" type="text/ng-template">
  <ion-view title="'Home'">
    <ion-content has-header="true" padding="true">
      ...
    </ion-content>
  </ion-view>
</script>

<script id="about.html" type="text/ng-template">
  <ion-view title="'About'">
    <ion-content has-header="true" padding="true">
      ...
    </ion-content>
  </ion-view>
</script>

<script id="contact.html" type="text/ng-template">
  <ion-view title="'Contact'">
    <ion-content has-header="true" padding="true">
      ...
    </ion-content>
  </ion-view>
</script>
{% endraw %}
```

Inside of each `<ion-view>` we can specify the title, left buttons, and right buttons that will be updated on the nav bar.

Note: To hide the back button for a given view, use the `hide-back-button="true"` attribute on the `<ion-view>`.

```html
<ion-view ng-controller="AppCtrl" title="myTitle" left-buttons="leftButtons" right-buttons="rightButtons">
</ion-view>
```

We can then specify these fields on the scope in our controller:

```javascript
app.controller('AppCtrl', function($scope) {
  $scope.myTitle = 'Page One';

  $scope.leftButtons = [
    {
      type: 'button-positive',
      content: '<i class="icon ion-navicon"></i>',
      tap: function(e) {
      }
    }
  ];
  $scope.rightButtons = [
    {
      type: 'button-clear',
      content: 'Edit',
      tap: function(e) {
      }
    }
  ]
});
```
