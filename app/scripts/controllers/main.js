'use strict';

angular.module('integrationApp')
  .controller('MainCtrl', function ($scope, famous) {
    var Engine = famous['famous/core/Engine'];
    $scope.context = Engine.createContext();
  });
