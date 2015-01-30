/**
 * @ngdoc directive
 * @name faCanvasSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faSize  -  Array that passes width and height to the canvas
 * @description
 * This directive creates a Famo.us CanvasSurface.
 * @usage
 * ```html
 * <fa-canvas-surface fa-size="[400,400]">
 * </fa-canvas-surface>
 * ```
 @example
 * To use `fa-canvas-surface`, declare an `fa-size` attribute with an array containing width and height.
 * ```html
 * <fa-canvas-surface
 *            fa-size="[400,400]"
 *            class="main-canvas"
 *            >
 * </fa-canvas-surface>
 * ```
 * `Fa-canvas-surface` accepts classes and faSize, the only two attributes HTML5 canvas requires is width and height.
 */
angular.module('famous.angular')
  .directive('faCanvasSurface', ['$famous', '$famousDecorator', '$interpolate', '$controller', '$compile', function ($famous, $famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<canvas class="fa-canvas-surface"></canvas>',
      restrict: 'EA',
      compile: function(tElem, tAttrs){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var CanvasSurface = $famous['famous/surfaces/CanvasSurface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            isolate.renderNode = new CanvasSurface({
              size: scope.$eval(attrs.faSize)
            });
            
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
            
            // Throw an exception if anyother famous scene graph element is added on fa-surface.            
            $famousDecorator.sequenceWith(scope, function(data) {
              throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
            });
                        
          },
          post: function(scope, element, attrs, ctrl, transclude){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function() {
	            isolate.renderNode.setContent(element[0].querySelector('canvas.fa-canvas-surface'));
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('canvas.fa-canvas-surface')).append(clone);
            });

            //TODO:  on this and all other render-node-wrapping fa-directives,
            //       expose an actual RenderNode in isolate.renderNode and
            //       use that RenderNode's .set() function to add/remove content
            //       from the scene graph.  This will probably be instead of
            //       using RenderControllers.
            $famousDecorator.registerChild(scope, element, isolate, function() {
              // TODO: hook into RenderController and hide this render node
            });
                     
          }
        };
      }
    };
  }]);
