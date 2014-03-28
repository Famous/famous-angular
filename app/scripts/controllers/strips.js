'use strict';

angular.module('integrationApp')
  .controller('StripsCtrl', function ($scope, famous) {
    var Transitionable = famous["famous/transitions/transitionable"];
    console.log('strips ctrl init');
    $scope.xPosition = new Transitionable(0);

    window.slideIn = function() {
      $scope.xPosition.set(-300);
      $scope.xPosition.set(0, {duration: 500, curve: 'easeOut'});

    };

    $scope.angle = -Math.PI / 10;
    $scope.stripContents = [
      "Friends",
      "Search",
      "Settings",
      "Starred",
    ]
  });
