'use strict';

angular.module('integrationApp')
  .directive('faSurface', function (famous, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {

          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var Surface = famous['famous/core/Surface'];
            var Transform = famous['famous/core/Transform']
            
            var properties = {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
            };

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var modifiers = {
               origin: scope.$eval(attrs.faOrigin),
               translate: scope.$eval(attrs.faTranslate),
               rotateZ: scope.$eval(attrs.faRotateZ),
               skew: scope.$eval(attrs.faSkew)
            };
            isolate.surface = new Surface({
              size: scope.$eval(attrs.faSize),
              properties: properties
            });
            isolate.modifier = function() {
              return modifiers;
            };

            if (attrs.faPipeTo) {
              console.log('pipe surface scope', scope.$eval(attrs.faPipeTo))
              isolate.surface.pipe(scope.$eval(attrs.faPipeTo));
            }
          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];
            var updateContent = function(){
              //TODO:  fill with other properties
              // console.log('attrs.faBackgroundColor', scope.$eval(attrs.faBackgroundColor))
              isolate.surface.setProperties({'backgroundColor':  scope.$eval(attrs.faBackgroundColor)});
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
              if(element.find('div') && element.find('div').html()){
                var prospectiveContent = $interpolate(element.find('div').html())(scope);
                if(isolate.currentContent !== prospectiveContent){ //this is a potentially large string-compare
                  isolate.currentContent = prospectiveContent;
                  //var compiledContent = $compile(element.find('div').contents())(scope).html();
                  //scope.surface.setContent($interpolate(compiledContent)(scope));
                  isolate.surface.setContent(isolate.currentContent);
                }
              }
              
            };

            //listener-free scope.$watch will fire any time a $digest occurs
            scope.$watch(function(){
              updateContent();
            })
            updateContent();

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: isolate.surface, mod: isolate.modifier});
          }
        }
      }
    };
  });
