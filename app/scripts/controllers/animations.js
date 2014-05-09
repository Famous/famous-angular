'use strict';

angular.module('integrationApp')
  .controller('AnimationsCtrl', function ($scope, famous) {
    window.s = $scope;
    var Transitionable = famous['famous/transitions/Transitionable'];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var RotateSync = famous['famous/inputs/RotateSync'];
    var PinchSync = famous['famous/inputs/PinchSync'];
    var Surface = famous['famous/core/Surface'];
    var EventHandler = famous['famous/core/EventHandler'];

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
      triangle: _r,
      scrollText: [undefined, 20]
    };


    $scope.twoWayTest = "test";

    $scope.positions = {
      scrollText: [
        0,
        20,
        10
      ],
      topTriangle: [
        sizes.margins.left + sizes.triangle,
        sizes.margins.top,
        500
      ],
      topTriangleInner: [
        sizes.margins.left + sizes.triangle,
        sizes.margins.top + sizes.triangle,
        500
      ],
      rightTriangle: [
        sizes.margins.left + 3 * sizes.triangle,
        sizes.margins.top + sizes.triangle,
        500
      ],
      rightTriangleInner: [
        sizes.margins.left + 2 * sizes.triangle,
        sizes.margins.top + sizes.triangle,
        500
      ],
      bottomTriangle: [
        sizes.margins.left + sizes.triangle,
        sizes.margins.top + 3 * sizes.triangle,
        500
      ],
      bottomTriangleInner: [
        sizes.margins.left + sizes.triangle,
        sizes.margins.top + 2 * sizes.triangle,
        500
      ],
      leftTriangle: [
        sizes.margins.left,
        sizes.margins.top + sizes.triangle,
        500
      ],
      leftTriangleInner: [
        sizes.margins.left + sizes.triangle,
        sizes.margins.top + sizes.triangle,
        500
      ],
      centerSquare: [
        sizes.margins.left + sizes.triangle - .5,
        sizes.margins.top + sizes.triangle - .5,
        1
      ],
      centerContent: [
        sizes.margins.left,
        sizes.margins.top + 2 * sizes.triangle,
        1000
      ]
    };

    var tran = new Transitionable(0);

    $scope.sync = new GenericSync(function(){
      return tran.get();
    }, {direction: GenericSync.DIRECTION_Y});

    var SCROLL_SENSITIVITY = 1200; //inverse
    $scope.sync.on('update', function(data){
      var newVal = Math.max(0,
        Math.min(1, data.delta / SCROLL_SENSITIVITY + tran.get()));
      tran.set(newVal);
    });

    //set tran to auto-animate transition
    //tran.set(1, {duration: 2000, curve: 'linear'});

    //TODO:  determine a more elegant (declarative?) way to
    //       handle event handling and piping
    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe($scope.sync);

    var _contents = [
      "Hey, I'm data-bound!",
      "Hey, I change my content!",
      "Hey, look at me!"
    ];

    var _contentIndex = 0;
    var _content = _contents[_contentIndex];
    $scope.getContent = function(){
      return _content;
    };

    var toggleContent = function(){
      _content = _contents[(_contentIndex++)%_contents.length];
      if(!$scope.$$phase)
        $scope.$apply();
    };

    setInterval(toggleContent, 1000);
    
    $scope.functionThatReturnsATimelineValueBetween0And1 = function(){
      return tran.get();
    }
  });
