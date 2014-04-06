'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, $http, famous) {
    $scope.profilePics = [];
    var api = "/latest";
    var tweets = $http.get(api);

    var inThrees = function(array, fn) {
      _.each(_.range(array.length / 3), function(i) {
        fn(array[3*i], array[3*i+1], array[3*i+2]);
      });
    };

    tweets.then(function(response) {
      var ySoFar = 0;
      inThrees(response.data, function(first, second, third) {

        first.height = 2*height;
        first.yOffset = ySoFar + 2*height;
        first.xOffset = 0;

        second.yOffset = ySoFar + height;
        second.xOffset = 2*height;

        third.yOffset = ySoFar + 2*height;
        third.xOffset = 2*height;
        ySoFar += height*2;

        $scope.profilePics.push(first);
        $scope.profilePics.push(second);
        $scope.profilePics.push(third);
      });
    });


    var height = 320 / 3;
    $scope.height = height;

    $scope.size = function(tweet) {
      return tweet.height || height;
    };

    var Transitionable = famous["famous/transitions/Transitionable"];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var EventHandler = famous['famous/core/EventHandler'];

    $scope.visible = new Transitionable(height);

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

    var visible = function() {
      return $scope.visible.get();
    };

    var rotating = function(tweet) {
      var topOfPic = tweet.yOffset + height;
      var bottomOfPic = tweet.yOffset;
      return visible() > bottomOfPic && visible() < topOfPic;
    };

    var columnOffset = function(n) {
      return 0;
    };

    //
    // rotating - if the top of the visible area is between the top of
    //            the picture and the bottom of the pictures


    $scope.grid = {
      x: function(tweet) {
        return tweet.xOffset;
      },
      y: function(tweet) {
        if (rotating(tweet)) return 0;
        return -(tweet.yOffset) + $scope.offset();
      },
      z: function(n, tweet) {
        if (!rotating(tweet)) return 0;
        var height = $scope.size(tweet);
        var visibleHeight = (visible(n) % $scope.size(tweet));
        var z = Math.sqrt((height * height) - (visibleHeight * visibleHeight));
        return -z;
      },
      xRotation: function(n, tweet) {
        if (rotating(tweet)) {
          var visibleHeight = (visible(n) % $scope.size(tweet));
          var theta = (Math.PI / 2) - Math.asin( visibleHeight / height);
          return theta;
        }
        if (flat(n)) return 0;
        return Math.PI / 2;
      }
    };

    $scope.positions = _.map($scope.profilePics, function(pic) {
    });
  });
