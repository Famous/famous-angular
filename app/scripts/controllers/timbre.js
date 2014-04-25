'use strict';

angular.module('integrationApp')
  .controller('TimbreCtrl', function ($scope, famous, testFilterService, Fakedata) {
  	$scope.yo ={a:'shoe'}
  	window.a = $scope
  	var EventHandler = famous['famous/core/EventHandler'];
  	var GenericSync = famous['famous/inputs/GenericSync'];
    var Transitionable = famous['famous/transitions/Transitionable'];
    var Easing = famous['famous/transitions/Easing'];
    $scope.enginePipe = new EventHandler();
    $scope.enginePipe2 = new EventHandler();
    $scope.search = {name:''}
    $scope.events = angular.copy(Fakedata.events);
    console.log('events', $scope.events);

    console.log('normal controller bag', famous.bag._contents); //has access to items created in DOM


    $scope.$watch(function(){return $scope.search.name},
      function(){
        testFilterService.setField($scope.search.name);
      });

    $scope.rand = function(){
      return (Math.random() * (.6-.1) + .1);

    };

    $scope.setEvent = function(e){
      console.log('set event', e)
      $scope.activeEvent = e;
      alert(e.name)
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
    }, {direction: GenericSync.DIRECTION_X});

    var SCROLL_SENSITIVITY = 500; //inverse
    $scope.sync.on('update', function(data){
      var newVal = Math.max(0,
        Math.min(1, data.delta / SCROLL_SENSITIVITY + $scope.tran.get()));

      
      $scope.tran.set(newVal);
    });
    $scope.enginePipe.pipe($scope.sync);
    $scope.horizontalTimeline = function(){
      return $scope.tran.get();
    };

    var TOUCHING = null;
    var MODE = null;

    $scope.enginePipe.on("touchstart", function (e){
      TOUCHING = [e.touches[0].pageX,e.touches[0].pageY];
    });
    $scope.enginePipe.on("touchmove", function (e){
      var xd = Math.abs(TOUCHING[0] - e.touches[0].pageX);
      var yd = Math.abs(TOUCHING[1] - e.touches[0].pageY);
      if (!MODE){
        MODE = xd > yd ? 'X' : 'Y';
        if(MODE === 'Y'){
          $scope.fireLinesAnimation();
        }
      }
    });
    $scope.enginePipe.on("touchend", function(){
      TOUCHING = false;
      var x = $scope.tran.get() > 0.4 ? 0.85 : 0;
      if (MODE === "X"){
        $scope.tran.set(x, {duration:"500", curve:Easing.outBounce});
      } else {
        $scope.tran.set(0);
      }
      MODE = null;
    })

    $scope.viewAX = function(){
      if (MODE === "Y") {return 0;}
      return $scope.tran.get()*320;
    }





  });

