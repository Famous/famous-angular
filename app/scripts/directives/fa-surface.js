// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faSurface', function (famous, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var Surface = famous['famous/core/Surface'];
            var Transform = famous['famous/core/Transform']
            var EventHandler = famous['famous/core/EventHandler'];
            
            var properties = {
              backgroundColor: scope.$eval(attrs.faBackgroundColor),
              color: scope.$eval(attrs.faColor)
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

            isolate.surface = new Surface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: properties
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.surface.setClasses(attrs['class'].split(' '));

            isolate.modifier = function() {
              return modifiers;
            };

            if (attrs.faPipeTo) {
              isolate.surface.pipe(scope.$eval(attrs.faPipeTo));
            }

            if (attrs.faClick) {
              isolate.surface.on("click", function() {
                scope.$eval(attrs.faClick);
              });
            }

          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];
            var updateContent = function(){
              //TODO:  fill with other properties
              isolate.surface.setProperties({'backgroundColor':  scope.$eval(attrs.faBackgroundColor)});
              //TODO:   once binding a surface to an arbitrary DOM node is supported in core Famo.us,
              // compile the element and pass the reference to that compiled element to
              // the surface.  This should solve the redrawing problem and it should
              // enable two-way databinding (which is not yet supported.)
              if(element.find('div.fa-surface') && element.find('div.fa-surface').html()){
                var compiledEl = isolate.compiledEl = isolate.compiledEl || $compile(element.find('div.fa-surface').contents())(scope)
                var prospectiveContent = compiledEl.toArray().map(function(el) { return el.outerHTML; }).join("");
                if(isolate.currentContent !== prospectiveContent){ //this is a potentially large string-compare
                  isolate.currentContent = prospectiveContent;
                  isolate.surface.setContent(isolate.currentContent);
                }
              }
            };

            //listener-free scope.$watch will fire any time a $digest occurs
            scope.$watch(function(){
              updateContent();
            })
            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              element.find('div.fa-surface').append(clone);
            });
            scope.$emit('registerChild', {view: isolate.surface, mod: isolate.modifier});
          }
        }
      }
    };
  });
