'use strict';

angular.module('integrationApp')
  .controller('AnimationsCtrl', function ($scope, famous) {
    var Transitionable = famous['famous/transitions/Transitionable'];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var RotateSync = famous['famous/inputs/RotateSync'];
    var PinchSync = famous['famous/inputs/PinchSync'];
    var EventHandler = famous['famous/core/EventHandler']

    var _width = window.innerWidth;
    var _height = window.innerHeight;
    var _r = 75;
    var sizes = $scope.sizes = {
      margins: {
        top: (_height - 4 * _r) / 2,//134,
        right: (_width - 4 * _r) / 2,
        bottom: (_height - 4 * _r) / 2,
        left: (_width - 4 * _r) / 2
      },
      width: _width, //320
      height: _height, //568
      triangle: _r
    };

    $scope.positions = {
      topTriangle: [sizes.margins.left + sizes.triangle, sizes.margins.top, 500],
      topTriangleInner: [sizes.margins.left + sizes.triangle, sizes.margins.top + sizes.triangle, 500],
      rightTriangle: [sizes.margins.left + 3 * sizes.triangle, sizes.margins.top + sizes.triangle, 500],
      rightTriangleInner: [sizes.margins.left + 2 * sizes.triangle, sizes.margins.top + sizes.triangle, 500],
      bottomTriangle: [sizes.margins.left + sizes.triangle, sizes.margins.top + 3 * sizes.triangle, 500],
      bottomTriangleInner: [sizes.margins.left + sizes.triangle, sizes.margins.top + 2 * sizes.triangle, 500],
      leftTriangle: [sizes.margins.left, sizes.margins.top + sizes.triangle, 500],
      leftTriangleInner: [sizes.margins.left + sizes.triangle, sizes.margins.top + sizes.triangle, 500],
      centerSquare: [sizes.margins.left + sizes.triangle, sizes.margins.top + sizes.triangle, -500],
      centerContent: [sizes.margins.left + .6 * sizes.triangle, sizes.margins.top + 2 * sizes.triangle, 1000]
    };

    var t = new Transitionable(0);

    $scope.sync = new PinchSync(function(){
      return t.get();
    }, {direction: GenericSync.DIRECTION_Y});

    $scope.sync.on('update', function(data){
      var newVal = Math.max(0, Math.min(1, data.p / 300 + t.get()));
      // alert('sync');
      t.set(newVal);
    });

    //t.set(1, {duration: 2000, curve: 'linear'});

    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe($scope.sync);
    
    $scope.functionThatReturnsATimelineValueBetween0And1 = function(){
      return t.get();
    }
  });
