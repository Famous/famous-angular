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
  .directive('faSurface', ['$famous', '$famousDecorator', '$interpolate', '$controller', '$compile', function ($famous, $famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var Surface = $famous['famous/core/Surface'];

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

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.renderNode.setClasses(attrs['class'].split(' '));

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function(){
//              var compiledEl = isolate.compiledEl = isolate.compiledEl || $compile(element.find('div.fa-surface').contents())(scope)
//              isolate.renderNode.setContent(isolate.compiledEl.context);
	            //TODO check if $compile is needed ?
	            isolate.renderNode.setContent(element[0].querySelector('div.fa-surface'));
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('div.fa-surface')).append(clone);
            });

            // Remove DOM when the scope of an fa-surface is destroyed.
            // We no longer have access to it at this point, so it's just taking up space.
            scope.$on('$destroy', function() {
              // Capture the dangling HTML node because Surface.cleanup will unset it
              var containerNode = isolate.renderNode.content.parentNode;
              // Invoke Surface.cleanup to unbind anything that might not get picked up by garbage collection
              isolate.renderNode.cleanup(scope.getContext().getAllocator());
              // Remove the dangling HTML node.
              containerNode.parentNode.removeChild(containerNode);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);
