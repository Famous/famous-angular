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

    var totalHeight = 0;
    var tweetsShown = 24;

    var addTweets = function(tweets) {
      var i = 0;
      inThrees(tweets, function(first, second, third) {
        var row;
        if (i % 2 != 0) {
          row = gridRows.bigLeft(height, margin, totalHeight, first, second, third);
        }
        else {
          row = gridRows.allSmall(height, margin, totalHeight, first, second, third);
        }
        $scope.rows.push(row);
        i++;
        totalHeight += row.totalHeight;
      });
    };

    tweets.then(function(response) {
      $scope.allTweets = response.data;
      addTweets($scope.allTweets.slice(0, tweetsShown));
    });

    var promotedRef = new Firebase("https://resplendent-fire-5331.firebaseio.com/promoted");
    var promoted = $firebase(promotedRef);

    $scope.isPromoted = function(tweet) {
      return promoted.$getIndex().indexOf(tweet.screen_name) > -1;
    };

    $scope.promote = function(tweet) {
      promoted.$child(tweet.screen_name).$set({promoted: true});
    }

    $scope.shorten = function(text) {
      return (text && text.length > 100) ? text.slice(0, 100) + " . . ." : text;
    };

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


    // surface to capture click events while scrollParticle is gliding

    $scope.maskZ = -1000;

    $scope.scrollColor = function() {
      return _maskZ < 0 ? 'red' : 'blue';
    };

    scrollParticle.scrollState.on("gliding", function() {
      $scope.maskZ = 30;
    });

    scrollParticle.scrollState.on("dragging", function() {
      $scope.maskZ = 30;
    });

    scrollParticle.scrollState.on("still", function() {
      $scope.maskZ = -1000;
    });


    // app state - view state synchronization
    
    var maybeReload = function() {
      var offset = $scope.offset();
      if (-(offset - 400) > totalHeight) {
        var newTweetsShown = tweetsShown + 12;
        addTweets($scope.allTweets.slice(tweetsShown, newTweetsShown));
        tweetsShown = newTweetsShown;
        $scope.$apply();
      }
    };
    
    scrollParticle.scrollState.on("dragging", maybeReload);
    scrollParticle.scrollState.on("gliding", maybeReload);
    scrollParticle.scrollState.on("still", maybeReload);

    $scope.$watch("detail", function(newDetail, oldDetail) {
      if (newDetail) {
        $scope.eventHandler.unpipe(scrollParticle.rawInput);
        $scope.modalOpacity.set(1, {duration: 300});
        $scope.modalZ = 35;
        $scope.xTransitionable.set(350);
        $scope.xTransitionable.set(0, {duration: 500, curve: 'easeOut'});
      }
      else if (oldDetail) {
        $scope.eventHandler.pipe(scrollParticle.rawInput);
        $scope.xTransitionable.set(-400, {duration: 400, curve: 'easeIn'});
        $scope.modalOpacity.set(0, {duration: 400}, function(){
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
