'use strict';

angular.module('integrationApp')
  .controller('LockScreenCtrl', function ($scope, famous) {
    var EventHandler = famous['famous/core/EventHandler'];
    $scope.enginePipe = new EventHandler();


    $scope.options = {
      mainScrollView: {
        
      }
    }

  });
