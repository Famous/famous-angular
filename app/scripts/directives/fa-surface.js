'use strict';

angular.module('integrationApp')
  .directive('faSurface', function (famous, $interpolate) {
    return {
      controller: function($scope){
        $scope.surfaceType = "surface";
        var types = ['cat', 'mermaid', 'whale', 'rock', 'surface'];
        setInterval(function(){
            $scope.surfaceType = types[Math.floor(types.length * Math.random())];
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
              //        $interpolate and then string-compare
              var prospectiveContent = $interpolate(element.html())(scope);
              if(scope.currentContent !== prospectiveContent){
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
