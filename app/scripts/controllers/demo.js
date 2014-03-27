'use strict';

angular.module('integrationApp')
  .controller('DemoCtrl', function ($scope, famous) {
    var GenericSync = famous['famous/input/genericsync'];
    var Transitionable = famous['famous/transitions/transitionable']
    var EventHandler = famous['famous/core/eventhandler']

    var colors = [
      '#FF0000',
      '#00FF00',
      '#0000FF'
    ];
    var strings = [
      'famo.us',
      'angular',
      'javascript',
      'cat'
    ];

    $scope.surfs = _.map(_.range(20), function(i){
      return {
        content: _.sample(strings),
        bgColor: _.sample(colors),
        height: 15 + Math.random() * 25
      }
    });


    $scope.yTransitionable = new Transitionable(0);
    //TODO:  make syncs declarative
    var sync = new GenericSync(function() {
      return $scope.yTransitionable.get(0);
    }, {direction: GenericSync.DIRECTION_Y});

    sync.on('update', function(data) {
      $scope.yTransitionable.set(data.p);
    });

    //TODO:  make event handlers declarative
    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe(sync);

    $scope.getY = function(index){
      return index * (20 + $scope.yTransitionable.get());
    }
  });
