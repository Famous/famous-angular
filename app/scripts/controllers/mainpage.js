'use strict';

angular.module('integrationApp')
  .controller('MainPageCtrl', function ($scope, famous) {
    var Transitionable = famous['famous/transitions/Transitionable']
    var GenericSync = famous['famous/inputs/GenericSync']
    var EventHandler = famous['famous/core/EventHandler']

    $scope.angle = -Math.PI / 6
    $scope.open = false

    $scope.xTransitionable = new Transitionable(0);

    var sync = new GenericSync(function() {
      return $scope.xTransitionable.get(0);
    }, {direction: GenericSync.DIRECTION_X});

    sync.on('update', function(data) {
      $scope.xTransitionable.set(Math.max(0, data.p));
    });

    var posThreshold = 138;
    var velThreshold = 0.75;

    sync.on('end', function(data) {

      var velocity = data.v;
      var position = $scope.xTransitionable.get();

      if(position > posThreshold) {
        if(velocity < -velThreshold) {
          $scope.slideLeft();
        } else {
          $scope.slideRight();
        }
      } else {
        if(velocity > velThreshold) {
          $scope.slideRight();
        } else {
          $scope.slideLeft();
        }
      }
    });

    $scope.eventHandler = new EventHandler();

    $scope.eventHandler.pipe(sync);

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
  });
