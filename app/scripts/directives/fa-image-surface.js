angular.module('famous.angular')
  .directive('faImageSurface', function (famous, $interpolate, $controller, $compile) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var ImageSurface = famous['famous/surfaces/ImageSurface'];
            var Transform = famous['famous/core/Transform']
            var EventHandler = famous['famous/core/EventHandler'];
            
            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties()
              },
              function(){
                if(isolate.surface)
                  isolate.surface.setProperties(isolate.getProperties());
              },
              true
            )

            isolate.getProperties = function(){
              return {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
              };
            };

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            //TODO: $observe attributes and pass updated values
            // into variables that are returned by functions that
            // can then be passed into modifiers

            var modifiers = {
              origin: scope.$eval(attrs.faOrigin),
              translate: scope.$eval(attrs.faTranslate),
              rotateZ: scope.$eval(attrs.faRotateZ),
              skew: scope.$eval(attrs.faSkew)
            };

            isolate.surface = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.surface.setClasses(attrs['class'].split(' '));

            isolate.modifier = function() {
              return modifiers;
            };

            //update pipes; support multiple, dynamically
            //bound pipes.  May need to do a deep watch,
            //which is currently bugging out Angular.  One
            //solution would be a custom deep-watch function
            //(probably watch collection, return a hashKey-like array)
            scope.$watch(
              function(){
                return scope.$eval(attrs.faPipeTo);
              },
              function(newPipe, oldPipe){
                if(oldPipe instanceof Array){
                  for(var i = 0; i < oldPipe.length; i++){
                    isolate.surface.unpipe(oldPipe[i]);
                  }
                }else if(oldPipe !== undefined){
                  isolate.surface.unpipe(oldPipe);
                }

                if(newPipe instanceof Array){
                  for(var i = 0; i < newPipe.length; i++){
                    isolate.surface.pipe(newPipe[i]);
                  }
                }else if(newPipe !== undefined){
                  isolate.surface.pipe(newPipe);
                }
              });

            if (attrs.faClick) {
              isolate.surface.on("click", function() {
                scope.$eval(attrs.faClick);
              });
            }

          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];
            var updateContent = function(){
              isolate.surface.setContent(scope.$eval(attrs.faImageUrl))
            };

            updateContent();

            scope.$watch(function(){
              return scope.$eval(attrs.faImageUrl)
            }, updateContent);


            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.surface)

            scope.$emit('registerChild', {view: isolate.surface, mod: isolate.modifier});
          }
        }
      }
    };
  });
