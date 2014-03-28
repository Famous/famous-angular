'use strict';

angular.module('integrationApp')
  .controller('StripsCtrl', function ($scope) {
    console.log('strips ctrl init');
    $scope.angle = -Math.PI / 10;
    $scope.stripContents = [
      "Friends",
      "Search",
      "Settings",
      "Starred",
    ]
  });
