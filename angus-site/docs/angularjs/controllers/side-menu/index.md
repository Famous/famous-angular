---
layout: docs_api
active: angularjs
title: "Side Menu Controller"
header_sub_title: "Draggable side menus"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.x</div>

Side Menu Controller
===

The Side Menu Controller enables a left and/or right side menu that can be toggled or exposed by dragging the center content area side to side. One or both of the menus can be enabled:

<img src="http://ionicframework.com.s3.amazonaws.com/docs/controllers/sidemenu.gif" style="border: 1px solid #eee">

## \<ion-side-menus\>

No options.

## \<div ion-side-menu-content\>

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
      <td>drag-content</td>
      <td><b>expression</b></td>
      <td>true</td>
      <td>Use to dynamically disable dragging of this side-menu. For example, 'drag-content="canDrag()"'.</td>
    </tr>
  </tbody>
</table>

## \<ion-side-menu\>

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
      <td>side</td>
      <td><b>string</b></td>
      <td>left</td>
      <td>Available: 'left' or 'right'.</td>
    </tr>
    <tr>
      <td>width</td>
      <td><b>number</b></td>
      <td>275</td>
      <td>Width of the side menu, in pixels.</td>
    </tr>
    <tr>
      <td>is-enabled</td>
      <td><b>expression</b></td>
      <td>true</td>
      <td>Use to dynamically disable this side-menu. For example, 'is-enabled="myMenuIsEnabled()"'</td>
    </tr>
  </tbody>
</table>


## Usage

To use the Side Menu Controller with Ionic-Angular, use the `<ion-side-menus>` top level directive, adding a `<pane ion-side-menu-content>` for the center content, and one or more `<ion-side-menu>` directives:

```html
<ion-side-menus>
  <!-- Center content -->
  <ion-pane ion-side-menu-content>
  </ion-pane>

  <!-- Left menu -->
  <ion-side-menu side="left">
  </ion-side-menu>

  <!-- Right menu -->
  <ion-side-menu side="right">
  </ion-side-menu>
</ion-side-menus>
```

The center content tag can be any element, but it must have the `ion-side-menu-content` attribute or class directive.

Like all Ionic controllers, the Side Menu exposes one object for all child scopes that use prototypal inheritance (i.e. all besides isolated scopes).

To access the parent Side Menu Controller on a child scope, access the `$scope.sideMenuController` object. For example, the following code enables toggling the left side menu from a button in the header bar:

```html
<header>
  <button class="button" ng-click="toggleMenu()">Toggle</button>
</header>
```

```javascript
$scope.toggleMenu = function() {
  $scope.sideMenuController.toggleLeft();
};
```

Low-level API
=========

To use the Side Menu Controller low-level API, follow the markup and Javascript below:

```html

<!-- Center content -->
<div id="content" class="pane">
  <header class="bar bar-header bar-dark">
    <h1 class="title">Center</h1>
  </header>
</div>

<!-- Left menu -->
<div id="menu-left" class="menu menu-left">
  <header class="bar bar-header bar-dark">
    <h1 class="title">Left</h1>
  </header>
</div>

<!-- Right menu -->
<div id="menu-right" class="menu menu-right">
  <header class="bar bar-header bar-dark">
    <h1 class="title">Right</h1>
  </header>
</div>
```

```javascript
var contentEl = document.getElementById('content');
var content = new ionic.views.SideMenuContent({
  el: contentEl
});

var leftMenuEl = document.getElementById('menu-left');
var leftMenu = new ionic.views.SideMenu({
  el: leftMenuEl,
  width: 270
});

var rightMenuEl = document.getElementById('menu-right');
var rightMenu = new ionic.views.SideMenu({
  el: rightMenuEl,
  width: 270
});

var sm = new ionic.controllers.SideMenuController({
  content: content,
  left: leftMenu,
  right: rightMenu
});
```
