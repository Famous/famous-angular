'use strict';

angular.module('integrationApp')
  .directive('faSurface', function (famous, $interpolate, $controller) {
    return {
      compile: function(tElem, tAttrs, transclude){
        console.log('compiling surface');

        return {
          pre: function(scope, element, attrs){
            var properties = {
                backgroundColor: scope["faBackgroundColor"],
                color: scope["faColor"]
            };

            var getTransform = function() {
              var Transform = famous['famous/core/transform']
              var transforms = [];
              if (scope["faTranslate"])
                transforms.push(Transform.translate.apply(this, scope["faTranslate"]));
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            var modifiers = {
               origin: scope["faOrigin"],
               transform: getTransform()
            };
            // console.log('surf pre', scope["faSize"], properties, modifiers);
            scope.surface = new famous['famous/core/surface']({
              size: scope["faSize"],
              properties: properties
            });
            scope.modifier = (modifiers);

            if (scope["faPipeTo"]) {
              scope.surface.pipe(scope["faPipeTo"]);
            }
          },
          post: function(scope, element, attrs){
            if(scope.faController)
              console.log('ctrl', $controller(scope.faController, {'$scope': scope}));
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
               "faColor": '=',
               "faTranslate": '=',
               "faRotateZ": '=',
               "faSkew": '=',
               "faPipeTo": '=',
               "faController": '@'
             },
      transclude: true,
      template: '<div></div>',
      restrict: 'EA'
    };
  });
