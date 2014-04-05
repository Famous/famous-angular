'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, famous) {
    $scope.profilesPics = [
    'https://pbs.twimg.com/profile_images/1816668959/champagne.jpg',
    'https://pbs.twimg.com/profile_images/430409211596386304/MpOjFGZB.jpeg',
    'https://pbs.twimg.com/profile_images/2630739604/08d6cc231d487fd5d04566f8e149ee38.jpeg',
    'https://pbs.twimg.com/profile_images/2580051838/gudyd1q8t66w60u036d5.jpeg',
    ];

    var height = 320 / 3;
    $scope.height = height;

    var Transitionable = famous["famous/transitions/Transitionable"];
    var GenericSync = famous['famous/inputs/GenericSync']
    var EventHandler = famous['famous/core/EventHandler']

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

    var row = function(n) {
      var nColumns = 3;
      return Math.floor(n / nColumns);
    };

    var flat = function(n) {
      return (row(n) * height) < visible(n);
    };

    var rotating = function(n) {
      var col = n % 3;
      var visibleRows = visible(n) / height;
      return Math.floor(visibleRows) === row(n);
    };

    var columnOffset = function(n) {
      return [0, 50, 20][n % 3];
    };

    var visible = function(n) {
      var col = n % 3;
      return $scope.visible.get() - columnOffset(n);
    };

    $scope.addImage = function() {
      var n = $scope.images.length;
      var pic = $scope.profilesPics[n % $scope.profilesPics.length];
      $scope.images.push({
        url: pic,
        x: function() {
          var column = n % 3;
          return column * height;
        },
        y: function() {
          if (rotating(n)) return 0;
          return -(height * row(n)) + $scope.offset() - columnOffset(n);
        },
        z: function() {
          if (!rotating(n)) return 0;
          var visibleHeight = (visible(n) % height);
          var z = Math.sqrt((height * height) - (visibleHeight * visibleHeight));
          return -z;
        },
        xRotation: function() {
          if (rotating(n)) {
            var visibleHeight = (visible(n) % height);
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
