'use strict';

angular.module('integrationApp')
  .controller('MakeMeFamousCtrl', function ($scope, $http, famous) {
    $scope.rows = [];
    var api = "/latest";
    var tweets = $http.get(api);

    var inThrees = function(array, fn) {
      _.each(_.range(array.length / 3), function(i) {
        fn(array[3*i], array[3*i+1], array[3*i+2]);
      });
    };
    
    var margin = 10;
    var height = (320 - margin*4) / 3;
    $scope.height = height;
    tweets.then(function(response) {
      var ySoFar = 0;

      inThrees(response.data, function(first, second, third) {
        if (Math.random()  < 0.3) {
          $scope.rows.push({
            height: 2*height,
            y: ySoFar,
            elements: [{
              tweet: first,
              size: 2*height + margin,
              x: margin,
              showTweet: true,
              y: margin
            }, {
              tweet: second,
              size: height,
              x: 2*height + 3*margin,
              y: margin,
            }, {
              tweet: third,
              size: height,
              x: 2*height + 3*margin,
              y: height + 2*margin,
            }]
          });
          ySoFar += (2*height + 2*margin);
        }
        else {
          $scope.rows.push({
            height: height,
            y: ySoFar,
            elements: [{
              tweet: first,
              size: height,
              x: margin,
              y: margin
            }, {
              tweet: second,
              size: height,
              x: height + 2*margin,
              y: margin,
            }, {
              tweet: third,
              size: height,
              x: 2*height + 3*margin,
              y: margin
            }]
          });
          ySoFar += (height + margin);
        }
      });
    });


    $scope.size = function(tweet) {
      return tweet.height || height;
    };

    var Transitionable = famous["famous/transitions/Transitionable"];
    var GenericSync = famous['famous/inputs/GenericSync'];
    var EventHandler = famous['famous/core/EventHandler'];
    var ScrollView = famous['famous/views/ScrollView'];
    var Timer = famous["famous/utilities/Timer"];

    var scrollView =  new ScrollView();

    $scope.offset = function() {
      return -scrollView.getPosition();
    };

    var _handleEdge = function _handleEdge(edgeDetected) {
      if(!this._onEdge && edgeDetected) {
        this.sync.setOptions({scale: this.options.edgeGrip});
        if(!this.touchCount && !this._springAttached) {
          this._springAttached = true;
          this.physicsEngine.attach([this.spring], this.particle);
        }
      }
      else if(this._onEdge && !edgeDetected) {
        this.sync.setOptions({scale: 1});
        if(this._springAttached && Math.abs(this.getVelocity()) < 0.001) {
          this.setVelocity(0);
          this.setPosition(this._springPosition);
          // reset agents, detaching the spring
          _detachAgents.call(this);
          _attachAgents.call(this);
        }
      }
      this._onEdge = edgeDetected;
    }

    Timer.every(function() {
      var offset = scrollView.getPosition();
      if (offset < 0) {
        _handleEdge.call(scrollView, true);
      }
      else {
        scrollView._onEdge = 0;
        _handleEdge.call(scrollView, false);
      };

    }, 20);

    $scope.eventHandler = new EventHandler();
    $scope.eventHandler.pipe(scrollView.rawInput);

    $scope.images = [];

    $scope.toTop = function() {
      console.log("click");
      $scope.visible.set(0, {duration: 500, curve: "easeOut"});
    };

    var row = function(n) {
      var nColumns = 3;
      return Math.floor(n / nColumns);
    };

    var hidden = function(row) {
      return row.y + row.height + $scope.offset() < 0;
    };

    var flat = function(row) {
      return row.y + row.height < $scope.offset();
    };

    var visible = function() {
      return $scope.visible.get();
    };

    var rotating = function(row) {
      return -$scope.offset() > row.y && -$scope.offset();
      return -$scope.offset() > (row.y - row.height) && -$scope.offset() < row.y;
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
      y: function(row) {
        if (rotating(row)) return 0;
        return row.y + $scope.offset();
      },
      z: function(row) {
        if (!rotating(row)) return 0;
        var height = row.height;
        var visibleHeight = (row.y + row.height + $scope.offset());
        var z = Math.sqrt((height * height) - (visibleHeight * visibleHeight));
        return -z;
      },
      xRotation: function(row) {
        if (rotating(row)) {
          var visibleHeight = (row.y + row.height + $scope.offset());
          var oppositeOverHypotenuse = visibleHeight / row.height;
          var theta = (Math.PI / 2) - Math.asin( visibleHeight / row.height);
          return theta;
        }
        if (hidden(row)) return Math.PI / 2;
        return 0;
      }
    };

    window.offset = $scope.offset;

    $scope.positions = _.map($scope.profilePics, function(pic) {
    });
  });
