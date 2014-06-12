/**
 * @ngdoc directive
 * @name faImageSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faImageUrl  -  String url pointing to the image that should be loaded into the Famo.us ImageSurface
 * @description
 * This directive creates a Famo.us ImageSurface and loads
 * the specified ImageUrl.
 * @usage
 * ```html
 * <fa-image-surface fa-image-url="img/my-image.png">
 * </fa-image-surface>
 * ```
 @example
 * To use `fa-image-surface`, declare an `fa-image-url` attribute with a string url.
 * ```html
 * <fa-image-surface 
 *            fa-image-url="img/my-image.png"
 *            class="img"
 *            fa-color="'blue'"
 *            fa-background-color="'#fff'"
 *            fa-size="[200, 300]">
 * </fa-image-surface>
 * ```
 * `Fa-image-surface` accepts two properties: `color` and `background color`, which may be assigned values by the `fa-color` and `fa-background-color` attributes respectively.
 *
 * `Fa-size` may also be declared as an attribute on the `fa-image-surface`.  If void, the `fa-image-surface` will inherit the size of its parent node.  
 *
 * In the example below, the `fa-image-size` element will inherit `[300, 300]` from the Modifier node above it on the Render Tree.
 * ```html
 * <fa-modifier fa-size="[300, 300]">
 *  <fa-image-size></fa-image-size>
 * </fa-modifier>
 * ```
 */

angular.module('famous.angular')
  .directive('faImageSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ImageSurface = $famous['famous/surfaces/ImageSurface'];
            var Transform = $famous['famous/core/Transform']
            var EventHandler = $famous['famous/core/EventHandler'];

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

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function(){
              isolate.renderNode.setContent(attrs.faImageUrl)
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);
