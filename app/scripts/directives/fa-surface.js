'use strict';

angular.module('integrationApp')
  .directive('faSurface', function (famous, $interpolate) {
    return {
      controller: function($scope){
        $scope.surfaceType = "surface";
        $scope.types = ['cat', 'mermaid', 'whale', 'rock', 'surface', 'shark', 'kangaroo'];
        setInterval(function(){
            $scope.surfaceType = $scope.types[Math.floor($scope.types.length * Math.random())];
            if(!$scope.$$phase)
              $scope.$apply();
          }, 1000)
      },
      compile: function(scope){
        console.log('compiling surface');

        return {
          pre: function(scope, element, attrs){
            console.log('surf pre');
            scope.surface = new famous['famous/core/surface']({
              properties: {
                backgroundColor: '#FF0000'
              }
            });
          },
          post: function(scope, element, attrs){
            scope.updateContent = function(){
              console.log('updateContent');
              //TODO:   There may be a more efficient way to do this than to 
              //        $interpolate and then string-compare.  Is there a way to
              //        anchor-link a div directly, for example?
              var prospectiveContent = $interpolate(element.html())(scope);
              if(scope.currentContent !== prospectiveContent){ //this is a potentially large string-compare
                console.log('updating famous surface');
                scope.currentContent = prospectiveContent;
                scope.surface.setContent(prospectiveContent);
              }
            };

            //listener-free scope.$watch will fire any time a $digest occurs
            scope.$watch(function(old, n){
              scope.updateContent();
            })

            scope.updateContent();

            scope.$parent.view._add(scope.surface);
          }
        }
      },
      transclude: true,
      template: '<div ng-transclude></div>',
      restrict: 'EA'
    };
  });
