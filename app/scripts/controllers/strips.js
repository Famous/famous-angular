'use strict';

angular.module('integrationApp')
  .controller('StripsCtrl', function ($scope) {
    console.log('strips ctrl init');
    $scope.angle = -Math.PI / 10;
    $scope.stripContents = [
      "Strip #1",
      "Strip #2",
      "Strip #3",
      "Strip #4",
    ]
  });
