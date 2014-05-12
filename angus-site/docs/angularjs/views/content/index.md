---
layout: docs_api
active: angularjs
title: "Content"
header_sub_title: "Content and scrollable areas"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.0</div>
<div class="label label-primary">Ionic 0.9.0</div>


Content
===

Ionic provides easy to use content area directives for use in AngularJS projects that can be configured to use Ionic's custom Scroll View, or use the built in overflow scrolling of the browser.

While we recommend using the custom Scroll features in Ionic in most cases, sometimes (for performance reasons) only the browser's native overflow scrolling will suffice, and so we've made it easy to toggle between the Ionic scroll implementation and overflow scrolling.

When using the Ionic scroll features, you'll get pull-to-refresh, customizable scroll mechanics (like bounce easing, momentum acceleration, etc.) which aligns Ionic with native SDKs that give you access to scroll behavior. You'll also get events while in a momentum scroll, which `-webkit-overflow-scrolling: touch` will not, making it of limited use in real applications.

Also, we are working on virtual list rendering which will only work when using Ionic's scroll view. That is on the upcoming roadmap.

## \<ion-content\>

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
      <td>scroll</td>
      <td><b>boolean</b></td>
      <td>true</td>
      <td>Whether to allow scrolling of content.</td>
    </tr>
    <tr>
      <td>overflow-scroll</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to use default browser scrolling instead of ionic scroll . If true, then refreshers, bouncing, etc may stop working.</td>
    </tr>
    <tr>
      <td>padding</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to add padding to the content.</td>
    </tr>
    <tr>
      <td>has-header</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to offset the content for a header bar.</td>
    </tr>
    <tr>
      <td>has-subheader</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to offset the content for a header bar and sub-header bar.</td>
    </tr>
    <tr>
      <td>has-footer</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to offset the content for a footer bar.</td>
    </tr>
    <tr>
      <td>has-tabs</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to offset the content for a bottom-tabs bar.</td>
    </tr>
    <tr>
      <td>has-bouncing</td>
      <td><b>boolean</b></td>
      <td>false on Android, true otherwise.</td>
      <td>Whether the scroll view should allow bouncing past the edges of content.</td>
    </tr>
    <tr>
      <td>on-scroll</td>
      <td><b>expression</b></td>
      <td></td>
      <td>Expression to evaluate when the user scrolls content.</td>
    </tr>
    <tr>
      <td>on-scroll-complete</td>
      <td><b>expression</b></td>
      <td></td>
      <td>Expression to evaluate when the user completes a scrolling action.</td>
    </tr>
  </tbody>
</table>

\<ion-content\> also supports options to pass to scrollView: `startX`, `startY`, `scrollbarX`, `scrollbarY`, `scrollingX`, `scrollingY`, `scrollEventInterval`.

## \<ion-refresher\>

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
      <td>on-refresh</td>
      <td><b>expression</b></td>
      <td></td>
      <td>Expression to evaluate on refresh completion.</td>
    </tr>
    <tr>
      <td>on-pulling</td>
      <td><b>expression</b></td>
      <td></td>
      <td>Expression to evaluate when refresher is opening.</td>
    </tr>
    <tr>
      <td>pulling-icon</td>
      <td><b>string</b></td>
      <td>ion-arrow-down-c</td>
      <td>The icon to display while the user is pulling down.</td>
    </tr>
    <tr>
      <td>pulling-text</td>
      <td><b>string</b></td>
      <td></td>
      <td>The text to display while the user is pulling down.</td>
    </tr>
    <tr>
      <td>refreshing-icon</td>
      <td><b>string</b></td>
      <td>ion-loading-d</td>
      <td>The icon to display after user lets go of the refresher.</td>
    </tr>
    <tr>
      <td>refreshing-text</td>
      <td><b>string</b></td>
      <td></td>
      <td>The text to display after the user lets go of the refresher.</td>
    </tr>
  </tbody>
</table>

## Ionic-Angular Usage

The `<ion-content>` directive can be used anywhere to define a scrollable content area. Here is an example with many of its available options:

```html
<body ng-controller="ContentCtrl">
  <ion-header-bar title="'Header'">
  </ion-header-bar>

  <!-- content area -->
  <ion-content
    has-header="true"
    has-footer="true"
    scroll="true"
    >

    <!-- for pull to refresh -->
    <ion-refresher
     on-refresh="onRefresh()"
     >
    </ion-refresher>

    <!-- content -->
  </ion-content>

  <ion-footer-bar>
    <div class="title">Footer</div>
  </ion-footer-bar>
</body>
```

And an example controller:

```javascript
angular.module('myModule', [])
.controller('ContentCtrl', function($scope, Users) {
  $scope.onRefresh = function() {
    // Load content
    Users.load().then(function(users) {
      $scope.users = users;

      // Trigger refresh complete on the pull to refresh action
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
});

```

### Dynamic content resizing

If the content of your scroll area changes, we can tell the content area to resize and update itself:

```javascript
$scope.$broadcast('scroll.resize');
```

### Pull to Refresh

Pull to refresh is an incredibly common UI paradigm found in mobile apps these days. If you want to add pull to refresh to your scroll area, you can just add the `<ion-refresher>` element to the beginning of the scroll content:

```html
  <!-- content area -->
  <ion-content>
    <ion-refresher on-refresh="onRefresh()"></ion-refresher>
  </ion-content>
```

This will give you a default icon and animation style. To customize the pull to refresh, supply your own content to attributes of `<ion-refresher>`:

```html
  <!-- content area -->
  <ion-content>
    <ion-refresher
     on-refresh="onRefresh()"
     pulling-icon="ion-loading-c"
     pulling-text="Pull to refresh..."
     >
    </ion-refresher>
  </ion-content>
```

*Hint: Ionicons comes with [animated icons](http://ionicons.com/animation.html).*

When refreshing is complete, you'll need to tell the scroll view to stop the refresh. To do this, trigger an event either up or down the scope chain to the scroll view. If your controller is "above" the scroll view in the scope chain, use broadcast:

```javascript
$scope.$broadcast('scroll.refreshComplete');
```

Use `$scope.$emit` if the scroll view is above your controller.
