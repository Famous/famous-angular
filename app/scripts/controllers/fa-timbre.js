'use strict';

angular.module('integrationApp')
  .controller('FaTimbreCtrl', function ($scope, famous) {
    console.log('scope', $scope); //shares same scope as TimbreCtrl
    console.log('bag', famous.bag._contents); //has access to items created in DOM


    setInterval(function(){
      window.f = famous
      famous.bag.get('animateTest')[0].replay();
    }, 2000);
    
  });
