'use strict';

angular.module('integrationApp')
  .controller('AnimationsCtrl', function ($scope, famous) {
    var Transitionable = famous['famous/core/Transitionable'];

    var t = new Transitionable(0);
    t.set(1, {
        duration: 4000,
        curve: "easeOut"
    });
    $scope.functionThatReturnsATimelineValueBetween0And1 = function(){
      return t.get();
    }
  });
