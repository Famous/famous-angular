---
layout: docs_api
active: angularjs
title: "Slide Box"
header_sub_title: "A draggable paging component"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.0</div>
<div class="label label-primary">Ionic 0.9.0</div>

Slide Box
===


The Slide Box is a multi-page container where each page can be swiped or dragged between:

<img src="http://ionicframework.com.s3.amazonaws.com/docs/controllers/slideBox.gif">

## \<ion-slide-box\>

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
      <td>show-pager</td>
      <td><b>boolean</b></td>
      <td>true</td>
      <td>Whether to show or hide the pager icons</td>
    </tr>
    <tr>
      <td>disable-scroll</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether to disable scroll in slidebox</td>
    </tr>
    <tr>
      <td>does-continue</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Whether the slidebox auto-plays, in a slide-show fashion</td>
    </tr>
    <tr>
      <td>slide-interval</td>
      <td><b>integer</b></td>
      <td>4000</td>
      <td>If <code>does-continue</code> is true, sets the interval speed in milliseconds</td>
    </tr>
    <tr>
      <td>on-slide-changed</td>
      <td><b>function(index)</b></td>
      <td></td>
      <td>Called when a slide is changed, returns index parameter</td>
    </tr>
    <tr>
      <td>active-slide</td>
      <td><b>integer</b></td>
      <td>0</td>
      <td>Set the default slide number, at index</td>
    </tr>
  </tbody>
</table>

## Ionic-Angular Usage

To use the slide box in your apps, use the following markup:

```html
<ion-slide-box>
  <ion-slide>
    <div class="box blue"><h1>BLUE</h1></div>
  </ion-slide>
  <ion-slide>
    <div class="box yellow"><h1>YELLOW</h1></div>
  </ion-slide>
  <ion-slide>
    <div class="box pink"><h1>PINK</h1></div>
  </ion-slide>
</ion-slide-box>
```

## Actions ##

<b>Go to slide</b>: 
The slide index numbers start from 0, 1, 2 .... n.
```javascript
var gotoSlide = function(index) {
  $scope.$broadcast('slideBox.setSlide', index);
};
```

<b>Previous slide</b>:
```javascript
var prevSlide = function() {
  $scope.$broadcast('slideBox.prevSlide');
};
```

<b>Next slide</b>:
```javascript
var nextSlide = function() {
  $scope.$broadcast('slideBox.nextSlide');
};
```
