/**
 * @ngdoc directive
 * @name faSurface
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create general Famo.us surfaces, which are the
 * leaf nodes of the scene graph.  The content inside
 * surfaces is what gets rendered to the screen.
 * This is where you can create form elements, attach
 * images, or output raw text content with one-way databinding {{}}.
 * You can include entire complex HTML snippets inside a faSurface, including
 * ngIncludes or custom (vanilla Angular) directives.
 *
 * @usage
 * ```html
 * <fa-surface>
 *   Here's some data-bound content {{myScopeVariable}}
 * </fa-surface>
 * ```
 */

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

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var updateContent = function(){
//              var compiledEl = isolate.compiledEl = isolate.compiledEl || $compile(angular.element(element[0].querySelector('div.fa-surface')).contents())(scope);
//              isolate.renderNode.setContent(isolate.compiledEl.context);
	            //TODO check if $compile is needed ?
	            isolate.renderNode.setContent(element[0].querySelector('div.fa-surface'));
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('div.fa-surface')).append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  });
