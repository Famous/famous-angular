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
              //TODO:   this is getting fired on every digest.
              //        Every time it fires, it triggers a repaint in famo.us
              //        Should only setContent if the new content is different from
              //        the old content.  Implement that.
              scope.surface.setContent($interpolate(element.html())(scope));
            };

            //listener-free scope.$watch will fire any time a $digest occurs
            scope.$watch(function(old, n){
              console.log('old',old);
              console.log('new',n);
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
