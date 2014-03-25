'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {
    $scope.open = false
    $scope.click = function() {
      $scope.open = !$scope.open;
    };
    $scope.x = function() {
      return $scope.open ? 276 : 0;
    };

    $scope.strips = ["These", "are", "data-bound", "strips"];
  })
  .controller('strip', function ($scope, famous) {
  })
;
