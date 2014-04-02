'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {
    var EventHandler = famous['famous/core/EventHandler']

    $scope.enginePipe = new EventHandler();
  });

