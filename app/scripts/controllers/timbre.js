'use strict';

angular.module('integrationApp')
  .controller('TimbreCtrl', function ($scope, famous) {
  	$scope.yo ={a:'shoe'}
  	window.a = $scope
  	var EventHandler = famous['famous/core/EventHandler'];
  	var GenericSync = famous['famous/inputs/GenericSync'];
    var Transitionable = famous['famous/transitions/Transitionable']
    $scope.enginePipe = new EventHandler();
    $scope.search = {name:''}



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
        name: _.sample(strings),
        bgColor: _.sample(colors),
      }
    });
  });

