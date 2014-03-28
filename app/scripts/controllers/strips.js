'use strict';

angular.module('integrationApp')
  .controller('StripsCtrl', function ($scope) {
    console.log('strips ctrl init');
    $scope.angle = -Math.PI / 10;
    $scope.stripContents = [
      {text: "Strip #1"},
      {text: "Strip #2"},
      {text: "Strip #3"},
      {text: "Strip #4"}
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
