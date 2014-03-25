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
      compile: function(tElem, tAttrs, transclude){
        console.log('compiling surface');

        return {
          pre: function(scope, element, attrs){
            scope.modifier = new famous['famous/core/modifier']({
              size: [500, 400]
            });
            scope.surface = new famous['famous/core/surface']({
              properties: {
                backgroundColor: '#FF0000'
              }
            });
          },
          post: function(scope, element, attrs){
            scope.updateContent = function(){
              //TODO:   There may be a more efficient way to do this than to 
              //        $interpolate and then string-compare.  Is there a way to
              //        anchor-link a div directly, for example?
              //        directive DOM linking would probably need to be supported in
              //        the famo.us engine, so for the time being, another approach could be:
              //        1. take the raw template string before interpolating it
              //        2. map all of the expressions inside {{}}'s into an array
              //        3. evaluate all of those expressions and keep track of the values
              //        4. compare all of these values of interest on each pass here,
              //           -- only update the surface if one of those values changes    
              var prospectiveContent = $interpolate(element.find('div').html())(scope);
              if(scope.currentContent !== prospectiveContent){ //this is a potentially large string-compare
                scope.currentContent = prospectiveContent;
                scope.surface.setContent(prospectiveContent);
              }
              
            };

            //listener-free scope.$watch will fire any time a $digest occurs
            scope.$watch(function(){
              scope.updateContent();
            })

            scope.updateContent();

            scope.$emit('registerChild', {surf: scope.surface, mod: scope.modifier});

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
          }
        }
      },
      transclude: true,
      scope: true,
      template: '<div></div>',
      restrict: 'EA'
    };
  });
