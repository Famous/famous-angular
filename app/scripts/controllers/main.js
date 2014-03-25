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
  })
  .controller('strip', function ($scope, famous) {
  })
;
