'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {

    var Transitionable = famous['famous/transitions/transitionable']
    var GenericSync = famous['famous/input/genericsync']
    var EventHandler = famous['famous/core/eventhandler']

    $scope.enginePipe = new EventHandler();
  });

