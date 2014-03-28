'use strict';

angular.module('integrationApp')
  .controller('StripsCtrl', function ($scope, famous) {
    var Transitionable = famous["famous/transitions/transitionable"];
    console.log('strips ctrl init');
    $scope.xPosition = new Transitionable(0);

    window.slideIn = function() {
      $scope.xPosition.set(-300);
      $scope.xPosition.set(0, {duration: 500, curve: 'easeOut'});

    };

    $scope.angle = -Math.PI / 10;
    $scope.stripContents = [
      {text: "Friends", image: "Friends"},
      {text: "Search", image: "Search"},
      {text: "Settings", image: "Settings"},
      {text: "Starred", image: "Starred"}
    ];


    var newStripContents = [
      "wow",
      "such",
      "many",
      "so",
      "great",
      "update",
      "data",
      "bind",
      "awesome",
      "famo.us"
    ]

     // setInterval(function(){
     //   for(var i = 0; i < $scope.stripContents.length; i++){
     //     $scope.stripContents[i].text = _.sample(newStripContents);
     //   }
     //   if(!$scope.$$phase)
     //     $scope.$apply();
     // }, 333);
  });
