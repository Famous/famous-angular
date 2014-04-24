'use strict';

angular.module('integrationApp')
  .presenter('TimbrePres', function ($scope, famous) {
    console.log('scope', $scope); //shares same scope as TimbreCtrl
    console.log('bag', famous.bag._contents); //has access to items created in DOM

    setInterval(function(){
      famous.bag.first('animateTest').replay();
    }, 2000);

  });
