'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {

    var Transitionable = famous['famous/transitions/transitionable']

    $scope.angle = -Math.PI / 6
    $scope.open = false

    $scope.click = function() {
      if ($scope.open) {
        $scope.open = false;
        $scope.slideLeft();
      }
      else {
        $scope.open = true;
        $scope.slideRight();
      }
    };

    $scope.slideLeft = function() {
      $scope.xTransitionable.set(0, {
        duration: 300,
        curve: 'easeOut'
      });
    };

    $scope.slideRight = function() {
      $scope.xTransitionable.set(276, {
        duration: 300,
        curve: 'easeOut'
      });
    };
    $scope.xTransitionable = new Transitionable(0);
    $scope.strips = ["These", "are", "data-bound", "strips"];

  })
  .controller('strip', function ($scope, famous) {
  })
;
