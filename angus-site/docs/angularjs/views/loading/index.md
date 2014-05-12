---
layout: docs_api
active: angularjs
title: "Loading"
header_sub_title: "Loading overlay and indicator"
---

Available in:
<div class="label label-danger">Ionic-Angular 0.9.x</div>


Loading
===

The Loading is an overlay that can be used to indicate activity while blocking user interaction.


## Ionic-Angular Usage

To trigger Loading in your code, use the `$ionicLoading` service in your angular controllers or directives:

```javascript

angular.module('LoadingApp', ['ionic'])

.controller('LoadingCtrl', ['$scope', '$ionicLoading', function($scope, $ionicLoading) {

  // Trigger the loading indicator
  $scope.show = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: 'Loading',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: true,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,

      // The delay in showing the indicator
      showDelay: 500
    });
  };

  // Hide the loading indicator
  $scope.hide = function(){
    $scope.loading.hide();
  };
}]);
```
