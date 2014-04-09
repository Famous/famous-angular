'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, $http, $firebase, famous, ScrollParticle, gridRows) {


    // app state 

    $scope.rows = [];

    var api = "http://ec2-54-185-128-191.us-west-2.compute.amazonaws.com/latest";
    var tweets = $http.get(api);

    var margin = 10;
    var height = (320 - margin*4) / 3;
    $scope.height = height;
    tweets.then(function(response) {
      var ySoFar = 0;

      inThrees(response.data, function(first, second, third) {
        var row;
        if (Math.random()  < 0.3) {
          row = gridRows.bigLeft(height, margin, ySoFar, first, second, third);
        }
        else {
          row = gridRows.allSmall(height, margin, ySoFar, first, second, third);
        }
        $scope.rows.push(row);
        ySoFar += row.totalHeight;
      });
    });

    var promotedRef = new Firebase("https://resplendent-fire-5331.firebaseio.com/promoted");
    var promoted = $firebase(promotedRef);

    $scope.isPromoted = function(tweet) {
      return promoted.$getIndex().indexOf(tweet.screen_name) > -1;
    };

    $scope.promote = function(tweet) {
      promoted.$child(tweet.screen_name).$set({promoted: true});
    }

    $scope.hideDetail = function() {
      $scope.detail = null;
      $scope.$apply();
    };

    $scope.showDetail = function(tweet) {
      if ($scope.detail) return;
      $scope.detail = tweet;
      $scope.$apply();
    };

    // view state
    
    var Transitionable = famous["famous/transitions/Transitionable"];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var EventHandler = famous['famous/core/EventHandler'];

    $scope.eventHandler = new EventHandler();
    $scope.xTransitionable = new Transitionable(350);

    $scope.modalOpacity = new Transitionable(0);
    $scope.modalZ = -10;

    var scrollParticle = new ScrollParticle(function() { 
      return scrollParticle.getPosition() < 0; 
    });

    $scope.eventHandler.pipe(scrollParticle.rawInput);

    $scope.offset = function() {
      return -scrollParticle.getPosition();
    };

    $scope.grid = gridRows.positions($scope.offset);


    // app state - view state synchronization

    $scope.$watch("detail", function(newDetail) {
      if (newDetail) {
        $scope.modalOpacity.set(1, {duration: 300});
        $scope.modalZ = 5;
        $scope.xTransitionable.set(350);
        $scope.xTransitionable.set(0, {duration: 300, curve: 'easeOut'});
      }
      else {
        $scope.xTransitionable.set(-400, {duration: 300, curve: 'easeIn'});
        $scope.modalOpacity.set(0, {duration: 300}, function(){
          $scope.modalZ = -10; 
        });
      }
    });

    // helpers

    var inThrees = function(array, fn) {
      _.each(_.range(array.length / 3), function(i) {
        fn(array[3*i], array[3*i+1], array[3*i+2]);
      });
    };

  });
