'use strict';

angular.module('integrationApp')
  .presenter('TimbrePres', function ($scope, famous) {
    console.log('scope', $scope); //shares same scope as TimbreCtrl
    console.log('bag', famous.bag._contents); //has access to items created in DOM
    $scope.bag = famous.bag

    var scrollview = famous.bag.first("scrollView");

    $scope.fireLinesAnimation = function(){
      famous.bag.first('animateTest').replay();
      console.log(window.zz = famous.bag.first('animateTest'))
    }
    scrollview.setOptions({margin:20000})

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
    }
    scrollViewWatchers();





  });
