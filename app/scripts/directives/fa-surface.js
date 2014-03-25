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
            var properties = {
                backgroundColor: scope["faBackgroundColor"],
            };
            var modifiers = {
               origin: scope["faOrigin"],
               transform: scope["faTranslate"] ? 
                  famous['famous/core/transform'].translate.apply(this, scope["faTranslate"]) :
                  undefined,
            };
            console.log('surf pre', scope["faSize"], properties, modifiers);
            scope.surface = new famous['famous/core/surface']({
              size: scope["faSize"],
              properties: properties
            });
            scope.modifiers = new famous['famous/core/modifier'](modifiers);
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

            console.log("adding", scope.surface, scope.modifiers);

            scope.$parent.view._add(scope.modifiers).add(scope.surface);
          }
        }
      },
      scope: {
               "faSize": '=',
               "faOrigin": '=',
               "faBackgroundColor": '=',
               "faTranslate": '=',
             },
      transclude: true,
      template: '<div ng-transclude></div>',
      restrict: 'EA'
    };
  });
