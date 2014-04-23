'use strict';

angular.module('integrationApp')
  .controller('RepeatCtrl', function ($scope) {
    $scope.modifierList = [1,2,3];
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
      console.log(scope, "heard $destroy");
    });

  });
