'use strict';

angular.module('integrationApp')
  .controller('TimbreCtrl', function ($scope, famous, testFilterService, Fakedata, $timeout) {
  	window.a = $scope
    var EventHandler = famous['famous/core/EventHandler'];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var Transitionable = famous['famous/transitions/Transitionable'];
    var Easing = famous['famous/transitions/Easing'];
    var MouseSync       = require('famous/inputs/MouseSync');
    var fc       = famous['famous/inputs/FastClick'];
    var TouchSync       = require('famous/inputs/TouchSync');
    var Timer           = require('famous/utilities/Timer');
    $scope.enginePipe = new EventHandler();
    $scope.enginePipe2 = new EventHandler();
    $scope.search = {name:''}
    $scope.events = angular.copy(Fakedata.events);




    console.log('events', $scope.events);

    console.log('normal controller bag', famous.bag._contents); //has access to items created in DOM

    $scope.strips = [
      {
        id: 1,
        label: "Strip 1"
      },
      {
        id: 2,
        label: "Strip 2"
      },
      {
        id: 3,
        label: "Strip 3"
      },
      {
        id: 5,
        label: "Strip 5"
      },
      {
        id: 4,
        label: "Strip 4"
      },

    ];

    $scope.stripOptions = {
      angle: -0.2,
      width: 320,
      stripHeight: 54,
      topOffset: 37,
      stripOffset: 58,
      transition: {
          duration: 400,
          curve: 'easeOut'
      },
      duration: 400,
      curve: 'outQuad',
      staggerDelay: 35,
      featureOffset: 280
    }

    $scope.$watch(function(){return $scope.search.name},
      function(){
        testFilterService.setField($scope.search.name);
      });

    $scope.rand = function(){
      return (Math.random() * (.6-.1) + .1);

    };

    $scope.setEvent = function(e){
      linesIn();
      $scope.activeEvent = e;
      Timer.setTimeout(function() {
        $scope.tran.set(-1, {duration:"400", curve:Easing.outQuint});
        linesOut();
      }, 300);
    };

    $scope.getLineX = function(e){
      return e.rand < .45 ? 0 : 0;
    }

    $scope.getLineWidth = function(e){
      return e.rand > .45 ? 320-(e.rand*320) : e.rand*320;
    }

    $scope.handleZ = function(e){
      return e.rand < .45 ? Math.PI : 0;
    }

    $scope.tran = new Transitionable(0);
    $scope.sync = new GenericSync(function(){
      return $scope.tran.get();
    },{direction: GenericSync.DIRECTION_X});

    var SCROLL_SENSITIVITY = 300; //inverse
    var stripFlag = true;
    $scope.sync.on('update', function(data){
      var newVal = Math.max(0,
        Math.min(1, data.delta / SCROLL_SENSITIVITY + $scope.tran.get()));
      $scope.tran.set(newVal);
      if (newVal === 0){
        stripFlag = true;
      } else if (stripFlag){
        $scope.testStrips();
        stripFlag = false;
      }
    });
    $scope.sync.on('end', function(data){
      var vel = data.velocity;
      var pos = $scope.tran.get();
      var newVal = 0;
      if (pos > 0.5){
        newVal = vel < -0.75 ? 0 : 0.85;
      } else {
        newVal = vel > 0.75 ? 0.85: 0;
      }
      $scope.tran.set(newVal, {duration:"300", curve:Easing.outQuint});
    })

    $scope.enginePipe.pipe($scope.sync);
    $scope.horizontalTimeline = function(){
      return $scope.tran.get();
    };

    var TOUCHING = null;
    var MODE = null;
    var MIN_X_THRESH = 1;

    $scope.enginePipe.on("touchstart", function (e){
      TOUCHING = [e.touches[0].pageX,e.touches[0].pageY];
      svStopped = false;
    });
    $scope.enginePipe.on("touchmove", function (e){
      var xd = Math.abs(TOUCHING[0] - e.touches[0].pageX);
      var yd = Math.abs(TOUCHING[1] - e.touches[0].pageY);
      if (!MODE){
        MODE = (xd > yd && xd > MIN_X_THRESH) || $scope.tran.get() > 0.75 ? 'X' : 'Y';
        if(MODE === 'Y'){
          linesIn();
        } else {
          $scope.disableScrollView();
        }
        if (MODE === 'X' && $scope.tran.get() < 0.2){
          $scope.testStrips();
          $scope.disableScrollView();
        }
      }
    });
    var stuckRight;
    $scope.enginePipe.on("touchend", function(){
      TOUCHING = false;
      var x = $scope.tran.get() > 0.4 ? 0.85 : 0;
      if (MODE === "X"){
        // $scope.tran.set(x, {duration:"300", curve:Easing.outSine});
        if (x === 0.85) stuckRight = true;
      } else if(!stuckRight || MODE === 'Y') {
        $scope.tran.set(0);
        stuckRight = false;
      }
      
      MODE = null;
      $scope.enableScrollView();

      if (Math.abs(famous.bag.first("scrollView").getVelocity()) < 0.001 && !lines){
        console.log(famous.bag.first("scrollView").getVelocity())
        linesOut();
      }
    })

    $scope.viewAX = function(){
      var x = $scope.tran.get()*320;
      if (MODE === "Y") {
        return 0;
      }
      return x;
    }

    var _lineTrans = new Transitionable(0);
    $scope.linesTimeline = function(){
      return _lineTrans.get();
    }

    var svStopped = null;
    var lines = null
    function linesOut(){
      _lineTrans.set(0, {duration: 600, curve: Easing.outBounce});
      lines = true;
    }
    function linesIn(){
      _lineTrans.set(1, {duration: 200, curve: 'easeOut'});
      lines = false;
    }

    $scope.linesIn = linesIn;
    $scope.calcStripY = function(){
      return  $scope.stripOptions.width * Math.tan(-$scope.stripOptions.angle);
    }

    $scope.$on("scrollview Stopped", function(){
      if (!TOUCHING){
        linesOut();
      }
      svStopped = true;
    });

    $scope.testStrips = function(){
      $scope.strips.forEach( function (s,i){
        var mod = famous.bag.first("animateStrip" + i);
        mod.reset();
        Timer.setTimeout(function(i) {
          mod.play();
        }.bind(this, i), i * $scope.stripOptions.staggerDelay+1);
      })
    }

    $scope.back = function(){
      $scope.tran.set(0, {duration:"250", curve:Easing.outSine});
    }





  });

