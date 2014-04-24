'use strict';

angular.module('integrationApp')
  .controller('TimbreCtrl', function ($scope, famous, testFilterService) {
  	$scope.yo ={a:'shoe'}
  	window.a = $scope
  	var EventHandler = famous['famous/core/EventHandler'];
  	var GenericSync = famous['famous/inputs/GenericSync'];
    var Transitionable = famous['famous/transitions/Transitionable']
    $scope.enginePipe = new EventHandler();
    $scope.search = {name:''}

    $scope.$watch(function(){return $scope.search.name},
      function(){
        testFilterService.setField($scope.search.name);
      });

    $scope.rand = function(){
      return (Math.random() * (.6-.1) + .1);
    }



  	var elements = 70;
  	var colors = [
      '#869B40',
      '#C2B02E',
      '#629286',
      '#B58963',
      '#9E9B8C'
    ];

    var strings = [
      'music',
      'video',
      'javascript',
      'san francisco',
      'web'
    ];
    $scope.events = _.map(_.range(elements), function(i){
      return {
        rand: $scope.rand(),
        name: _.sample(strings),
        bgColor: _.sample(colors),
      }
    });

    console.log('events', $scope.events);

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
  });

