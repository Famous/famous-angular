angular.module('famous.angular')
  .directive('faImageSurface', function (famous, famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

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
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
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

            isolate.renderNode = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.renderNode.setClasses(attrs['class'].split(' '));

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
                    isolate.renderNode.unpipe(oldPipe[i]);
                  }
                }else if(oldPipe !== undefined){
                  isolate.renderNode.unpipe(oldPipe);
                }

                if(newPipe instanceof Array){
                  for(var i = 0; i < newPipe.length; i++){
                    isolate.renderNode.pipe(newPipe[i]);
                  }
                }else if(newPipe !== undefined){
                  isolate.renderNode.pipe(newPipe);
                }
              });

            if (attrs.faClick) {
              isolate.renderNode.on("click", function() {
                scope.$eval(attrs.faClick);
              });
            }

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            var updateContent = function(){
              isolate.renderNode.setContent(attrs.faImageUrl)
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.renderNode)

            scope.$emit('registerChild', {renderNode: isolate.renderNode});
          }
        }
      }
    };
  });
