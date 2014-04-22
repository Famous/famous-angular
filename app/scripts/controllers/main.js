// 
// © 2014 Thomas Street LLC. All rights reserved
//


'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {
    var EventHandler = famous['famous/core/EventHandler']
    $scope.prim = 1234
    $scope.enginePipe = new EventHandler();
  });

