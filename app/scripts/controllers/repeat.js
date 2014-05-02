'use strict';

angular.module('integrationApp')
  .controller('RepeatCtrl', function ($scope) {
    $scope.modifierList = [1,2,3,4,5,6,7,8];
    $scope.surfaceList = [1,2,3];
    $scope.add = function(list) {
      console.log("add");
      list.push(list[list.length-1]+1);
    };
    $scope.remove = function(list, i) {
      list.splice(i, 1);
      console.log("remove", i, list);
      $scope.$apply();
    };

    $scope.$on('$destroy', function() {
      console.log($scope, "heard $destroy");
    });

  })
  .animation('.fade-out', function(famous) {
    var TransitionableTransform = famous["famous/transitions/TransitionableTransform"];


    var getModifier = function(el) {
      var modScope = angular.element(el).scope();
      return modScope.isolate[modScope.$id].modifier;
    };

    return {
      leave: function(element, done) {
        var mod = getModifier(element);
        var t = new TransitionableTransform([0, 0, 0]);
        mod.setOpacity(0, {duration: 300});
      }
    }
  });
