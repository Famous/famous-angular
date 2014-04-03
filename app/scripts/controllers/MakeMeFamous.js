'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, famous) {
    $scope.profilesPics = [
    'https://pbs.twimg.com/profile_images/1816668959/champagne.jpg',
    'https://pbs.twimg.com/profile_images/430409211596386304/MpOjFGZB.jpeg',
    'https://pbs.twimg.com/profile_images/2630739604/08d6cc231d487fd5d04566f8e149ee38.jpeg',
    'https://pbs.twimg.com/profile_images/2580051838/gudyd1q8t66w60u036d5.jpeg',
    ];

    var height = 115;

    var Transitionable = famous["famous/transitions/Transitionable"];

    $scope.offset = new Transitionable(0);

    $scope.images = [{xRotation: new Transitionable(0), y: 30, url: $scope.profilesPics[0]}];

    $scope.addImage = function() {
      var n = $scope.images.length;
      var pic = $scope.profilesPics[n % $scope.profilesPics.length];
      var rotation = new Transitionable(-Math.PI/2);
      window.rotation = rotation;
      $scope.images.push({
        y: -(height * n) + 30,
        url: pic,
        xRotation: rotation,
      });
      rotation.set(0, {duration: 300, curve: 'easeOut'});
      $scope.offset.set((n * height) + 30, {duration: 300, curve: 'easeOut'})
    };


    $scope.positions = _.map($scope.profilePics, function(pic) {
    });
  });
