---
layout: docs_api
active: angularjs
title: "Tab Bar Controller"
header_sub_title: "Multi-page tab interfaces"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.x</div>

Tab Bar Controller
===

The Tab Bar Controller powers a multi-tabbed interface with a Tab Bar and a set of "pages" that can be tabbed through:

<img src="http://ionicframework.com.s3.amazonaws.com/docs/controllers/ion-tabs.gif" style="border: 1px solid #eee">

## \<ion-tabs\>

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
      <td>tabs-type</td>
      <td><b>string</b></td>
      <td>tabs-positive</td>
      <td>The type of tabs. See the tabs component documentation</td>
    </tr>
    <tr>
      <td>type</td>
      <td><b>string</b></td>
      <td>tabs-icon-only</td>
      <td>The style of tabs.  See the tabs component documentation.</td>
    </tr>
    <tr>
      <td>animation</td>
      <td><b>string</b></td>
      <td></td>
      <td>The animation to use for transitions between tabs.</td>
    </tr>
  </tbody>
</table>

## \<ion-tab\>

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
      <td>title</td>
      <td><b>string</b></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>icon</td>
      <td><b>string</b></td>
      <td></td>
      <td>The icon to use for the tab. If you want to change the icon while the tab is selected, use icon-on and icon-off instead.</td>
    </tr>
    <tr>
      <td>icon-on</td>
      <td><b>string</b></td>
      <td></td>
      <td>The icon to use when the tab is selected.</td>
    </tr>
    <tr>
      <td>icon-off</td>
      <td><b>string</b></td>
      <td></td>
      <td>The icon to use while the tab is not selected.</td>
    </tr>
    <tr>
      <td>badge</td>
      <td><b>expression</b></td>
      <td></td>
      <td>The 'badge' to put on the tab, with its content.</td>
    </tr>
    <tr>
      <td>badge-style</td>
      <td><b>string</b></td>
      <td></td>
      <td>If 'badge' attribute is provided, sets the style of the badge. For example, 'badge-assertive'.</td>
    </tr>
    <tr>
      <td>left-buttons</td>
      <td><b>expression</b></td>
      <td></td>
      <td>The left buttons to put on the ion-nav-bar while this tab is selected.</td>
    </tr>
    <tr>
      <td>right-buttons</td>
      <td><b>expression</b></td>
      <td></td>
      <td>The right buttons to put on the ion-nav-bar while this tab is selected.</td>
    </tr>
  </tbody>
</table>


```html
{% raw %}
<ion-tabs tabs-type="tabs-icon-only">

  <ion-tab title="Home" icon-on="ion-ios7-filing" icon-off="ion-ios7-filing-outline">
    <!-- Tab 1 content -->
  </ion-tab>

  <ion-tab title="About" icon-on="ion-ios7-clock" icon-off="ion-ios7-clock-outline">
    <!-- Tab 2 content -->
  </ion-tab>

  <ion-tab title="Settings" icon-on="ion-ios7-gear" icon-off="ion-ios7-gear-outline">
    <!-- Tab 3 content -->
  </ion-tab>

</ion-tabs>
```
{% endraw %}

To use the tabs, put the content of each tab right into the `<ion-tab>` tag, like this:

```html
<ion-tabs tabs-type="tabs-icon-only">
  <ion-tab title="Home" icon-on="ion-ios7-filing" icon-off="ion-ios7-filing-outline">
    <ion-header-bar type="bar-positive" title="'Home'"></ion-header-bar>
    <ion-content has-header="true">
      <h2>Home Content</h2>
    </ion-content>
  </ion-tab>
</ion-tabs>
```

Notice we set the title of the `<ion-header-bar>` using single quotes (`title="'Home'"`) since the title is an angular expression and can be bound to a scope value for dynamic titles.

The Tab Bar also emits events when tabs change. To know when a tab is shown, listen for the `tab.shown` event, and the `tab.hidden` event for when it is hidden:

```html
<ion-tabs tabs-type="tabs-icon-only">
  <ion-tab title="Home" icon-on="ion-ios7-filing" icon-off="ion-ios7-filing-outline" ng-controller="HomeCtrl">
    <ion-header-bar type="bar-positive" title="'Home'"></ion-header-bar>
    <ion-content has-header="true">
      <h2>Home Content</h2>
    </ion-content>
  </ion-tab>
</ion-tabs>
```

```javascript
angular.module('test', ['ionic'])
.controller('HomeCtrl', function($scope) {
  $scope.$on('tab.shown', function() {
    // Maybe load some content here
  });
  $scope.$on('tab.hidden', function() {
    // Perhaps cycle out some data in memory here
  });
});
```
