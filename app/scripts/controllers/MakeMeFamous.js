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

    $scope.visible = new Transitionable(0);

    $scope.offset = function() {
      return ($scope.visible.get() - 1) * height;
    };

    $scope.images = [];

    $scope.addImage = function() {
      var n = $scope.images.length;
      var pic = $scope.profilesPics[n % $scope.profilesPics.length];
      $scope.images.push({
        url: pic,
        y: function() {
          if ((Math.floor($scope.visible.get()) === n)) return 30;
          return -(height * n) + 30 + $scope.offset();
        },
        xRotation: function() {
          if (! (Math.floor($scope.visible.get()) === n)) return 0;
          var visibleHeight = ($scope.visible.get() % 1) * height;
          var theta = (Math.PI / 2) - Math.asin( visibleHeight / height);
          return theta;
        }
      });
      $scope.visible.set($scope.visible.get() + 1, {duration: 300, curve: 'easeOut'})
    };

    $scope.addImage();


    $scope.positions = _.map($scope.profilePics, function(pic) {
    });
  });
