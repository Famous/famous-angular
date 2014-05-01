'use strict';

angular.module('integrationApp')
  .presenter('TimbrePres', function ($scope, famous) {
    console.log('scope', $scope); //shares same scope as TimbreCtrl
    console.log('bag', famous.bag._contents); //has access to items created in DOM
    var Transform       = require('famous/core/Transform');
    var Timer           = require('famous/utilities/Timer');
    $scope.bag = famous.bag



    var scrollview = famous.bag.first("scrollView");

    $scope.fireLinesAnimation = function(){
      famous.bag.first('animateTest').replay();
      console.log(window.zz = famous.bag.first('animateTest'))
    }
    scrollview.setOptions({margin:20000, friction: 0.0010, drag: 0.0001, speedLimit : 5})

    $scope.disableScrollView = function(){
    	scrollview.unsubscribe($scope.enginePipe);
    }
    $scope.enableScrollView = function(){
    	scrollview.subscribe($scope.enginePipe);
    }
    function scrollViewWatchers(){
    	var origRender = scrollview.constructor.prototype.render.bind(scrollview)
    	var origRender = scrollview.render.bind(scrollview);
    	var eventFired = false;
    	var pos = 0;
    	scrollview.render = function(){
    		if (Math.abs(scrollview.getVelocity()) < 0.02){
    			if (!eventFired ){
    				$scope.$broadcast("scrollview Stopped");
    				console.log("wow", scrollview.getVelocity())
    			}
    			eventFired = true;
    		} else {
    			eventFired = false;
    		}
    		return origRender();
    	}
    };


    scrollViewWatchers();



    var testOptions = {
        angle: -0.2,
        stripWidth: 320,
        stripHeight: 54,
        topOffset: 37,
        stripOffset: 58,
        transition: {
            duration: 400,
            curve: 'easeOut'
        },
        duration: 400,
        staggerDelay: 35,
        featureOffset: 280
    };
    $scope.resetStrips = function(){
        var strips = famous.bag.all("stripMod");
        var topOffset = testOptions.topOffset;
        var stripOffset = testOptions.stripOffset;
        var stripWidth = testOptions.stripWidth;
        var angle = testOptions.angle;

        var initX = -stripWidth;
        var initY = topOffset + stripWidth * Math.tan(-angle);
        for (var i = 0; i < strips.length; i++) {
            strips[i].setTransform(Transform.translate(initX, initY, 0));
            initY += stripOffset;
        }

        // famous.bag.first("viewB").setOpacity(0);
    }

    $scope.animateStrips = function(){
        $scope.resetStrips();
        var strips = famous.bag.all("stripMod");
        var transition = {
            duration: 400,
            curve: 'easeOut'
        };
        var delay = 35;
        var stripOffset = 58;
        var topOffset = 37;
        for(var i = 0; i < strips.length; i++) {
            Timer.setTimeout(function(i) {
                var yOffset = topOffset + i * stripOffset;
                strips[i].setTransform(
                    Transform.translate(0, yOffset, 0),
                    transition);
            }.bind(this, i), i * delay);
        }
    }






  });
