'use strict';

angular.module('integrationApp')
  .controller('TimbreCtrl', function ($scope, famous, testFilterService, Fakedata) {
  	$scope.yo ={a:'shoe'}
  	window.a = $scope
  	var EventHandler = famous['famous/core/EventHandler'];
  	var GenericSync = famous['famous/inputs/GenericSync'];
    var Transitionable = famous['famous/transitions/Transitionable'];
    $scope.enginePipe = new EventHandler();
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

    var tran = new Transitionable(0);

    $scope.sync = new GenericSync(function(){
      return tran.get();
    }, {direction: GenericSync.DIRECTION_X});

    var SCROLL_SENSITIVITY = 1200; //inverse
    $scope.sync.on('update', function(data){
      var newVal = Math.max(0,
        Math.min(1, data.delta / SCROLL_SENSITIVITY + tran.get()));
      tran.set(newVal);
    });
    $scope.enginePipe.pipe($scope.sync);





  });

