'use strict';

angular.module('integrationApp')
  .directive('faSurface', function (famous, $interpolate) {
    return {
      compile: function(tElem, tAttrs, transclude){
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
            // console.log('surf pre', scope["faSize"], properties, modifiers);
            scope.surface = new famous['famous/core/surface']({
              size: scope["faSize"],
              properties: properties
            });
            scope.modifier = new famous['famous/core/modifier'](modifiers);
          },
          post: function(scope, element, attrs){
            console.log('surface post');
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

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.surface, mod: scope.modifier});
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
      template: '<div></div>',
      restrict: 'EA'
    };
  });
