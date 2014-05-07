angular.module('famous.angular')
  .directive('faSurface', function (famous, famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var Surface = famous['famous/core/Surface'];
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

            //TODO: $observe attributes and pass updated values
            // into variables that are returned by functions that
            // can then be passed into modifiers

            var modifiers = {
              origin: scope.$eval(attrs.faOrigin),
              translate: scope.$eval(attrs.faTranslate),
              rotateZ: scope.$eval(attrs.faRotateZ),
              skew: scope.$eval(attrs.faSkew)
            };

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.renderNode.setClasses(attrs['class'].split(' '));

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
              var compiledEl = isolate.compiledEl = isolate.compiledEl || $compile(element.find('div.fa-surface').contents())(scope)
              isolate.renderNode.setContent(isolate.compiledEl.context);
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              element.find('div.fa-surface').append(clone);
            });

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
