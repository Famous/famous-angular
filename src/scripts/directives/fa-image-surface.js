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
 <example module="faImageSurfExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-image-surface
                 fa-image-url="http://famo.us/integrations/angular/img/famous-angular-logos.png"
                 class="img"
                 fa-color="'blue'"
                 fa-background-color="'#fff'"
                 fa-size="[500, 200]">
      </fa-image-surface>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faImageSurfExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>

 * `Fa-image-surface` accepts two css-style properties: `color` and `background color`, which may be assigned values by the `fa-color` and `fa-background-color` attributes respectively.
 *
 * `Fa-size` may also be declared as an attribute.  If void, the `fa-image-surface` will inherit the size of its parent node.
 */

angular.module('famous.angular')
  .directive('faImageSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function (tElem, tAttrs) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ImageSurface = $famous['famous/surfaces/ImageSurface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function () {
                return isolate.getProperties();
              },
              function () {
                if (isolate.renderNode) {
                  isolate.renderNode.setProperties(isolate.getProperties());
                }
              },
              true
            );

            //TODO:  duplicate of fa-surface's _propToFaProp function.
            //       Refactor into a util object/service?
            var _propToFaProp = function (prop) {
              return "fa" + prop.charAt(0).toUpperCase() + prop.slice(1);
            };

            isolate.getProperties = function () {
              var baseProperties = scope.$eval(attrs.faProperties) || {};
              var properties = [
                "backgroundColor",
                "color"
              ];
              for (var i = 0; i < properties.length; i++) {
                var prop = properties[i];
                var faProp = _propToFaProp(prop);
                if (attrs[faProp]) {
                  baseProperties[prop] = scope.$eval(attrs[faProp]);
                }
              }
              return baseProperties;
            };

            isolate.renderNode = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });
            
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function () {
              isolate.renderNode.setContent(attrs.faImageUrl);
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
