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
              scope.surface.setContent($interpolate(element.html())(scope));
              console.log('post digest');
              // scope.$evalAsync(function(){
              //   scope.$$postDigest(scope.updateContent);
              // });
            };

            //ugly as fuck. performance will probably suck for surfaces with
            //complex content, as this is both interpolating and then running
            //string equality.  Is there a way to hook into $$postDigest?
            //scope.$$postDigest(scope.updateContent);
            scope.$watch(function(){return $interpolate(element.html())(scope);}, scope.updateContent);
            
            console.log('surf post');
            console.log(scope.$parent);
            scope.$parent.view._add(scope.surface);
          }
        }
      },
      transclude: true,
      template: '<div ng-transclude></div>',
      restrict: 'EA'
    };
  });
