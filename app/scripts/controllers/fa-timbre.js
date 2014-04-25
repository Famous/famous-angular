'use strict';

angular.module('integrationApp')
  .controller('FaTimbreCtrl', function ($scope, famous) {
    console.log('scope', $scope); //shares same scope as TimbreCtrl
    console.log('bag', famous.bag._contents); //has access to items created in DOM


    // famous.bag.first("animateTest")

  });
