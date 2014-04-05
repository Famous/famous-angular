'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, famous) {
    $scope.profilesPics = [
    'https://pbs.twimg.com/profile_images/1816668959/champagne.jpg',
    'https://pbs.twimg.com/profile_images/430409211596386304/MpOjFGZB.jpeg',
    // 'https://pbs.twimg.com/profile_images/2630739604/08d6cc231d487fd5d04566f8e149ee38.jpeg',
    'https://pbs.twimg.com/profile_images/2580051838/gudyd1q8t66w60u036d5.jpeg',
    ];

    var height = 115;

    var Transitionable = famous["famous/transitions/Transitionable"];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var EventHandler = famous['famous/core/EventHandler'];

    $scope.visible = new Transitionable(115);

    var sync = new GenericSync(function() {
      return $scope.visible.get(1);
    }, {direction: GenericSync.DIRECTION_Y});

    sync.on('update', function(data) {
      $scope.visible.set(data.p);
    });

    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe(sync);

    $scope.offset = function() {
      return ($scope.visible.get() - height);
    };

    $scope.images = [];

    var flat = function(n) {
      return (n * height) < $scope.visible.get();
    };

    var rotating = function(n) {
      var visiblePics = $scope.visible.get() / height;
      return Math.floor(visiblePics) === n;
    };

    $scope.addImage = function() {
      var n = $scope.images.length;
      var pic = $scope.profilesPics[n % $scope.profilesPics.length];
      $scope.images.push({
        url: pic,
        y: function() {
          if (rotating(n)) return 30;
          return -(height * n) + 30 + $scope.offset();
        },
        z: function() {
          if (!rotating(n)) return 0;
          var visibleHeight = ($scope.visible.get() % height);
          var z = Math.sqrt((height * height) - (visibleHeight * visibleHeight));
          return -z;
        },
        xRotation: function() {
          if (rotating(n)) {
            var visibleHeight = ($scope.visible.get() % height);
            var theta = (Math.PI / 2) - Math.asin( visibleHeight / height);
            return theta;
          }
          if (flat(n)) return 0;
          return Math.PI / 2;
        }
      });
    };

    _.each(_.range(60), function(i){
      $scope.addImage();
    });


    $scope.positions = _.map($scope.profilePics, function(pic) {
    });
  });
