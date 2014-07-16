/**
 * @ngdoc directive
 * @name faFlipper
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us Flipper containing the
 * specified front and back elements. The provided `options` object
 * will pass directly through to the Famo.us Flipper's
 * constructor.  See [https://famo.us/docs/views/Flipper]
 *
 * @usage
 * ```html
 * <fa-flipper fa-options="scopeOptionsObject">
 *   <!-- two render nodes -->
 * </fa-flipper>
 * ```
 *@example
 * A Famous Flipper has a `.flip()` method that toggles a rotation between front and back sides.
 * In the example below, when an `fa-surface` is clicked, it calls the function `flipIt`.
 *
 * This function attempts a DOM lookup for an isolate of an `fa-flipper` element, and calls the `.flip()` function of `fa-flipper`.
 *
 *```html
 * <fa-flipper>
 *    <fa-surface fa-background-color="'yellow'" fa-click="flipIt()"></fa-surface>
 *    <fa-surface fa-background-color="'red'" fa-click="flipIt()"></fa-surface>
 * </fa-flipper>
 *```
 *```javascript
 * $scope.flipIt = function() {
 *    $famous.find('fa-flipper')[0].flip();
 * };
 *```
 */

angular.module('famous.angular')
  .directive('faFlipper', ["$famous", "$famousDecorator",
    function ($famous, $famousDecorator) {
      return {
        template: '<div></div>',
        restrict: 'E',
        transclude: true,
        scope: true,
        compile: function (tElem, tAttrs, transclude) {
          return {
            pre: function (scope, element, attrs) {
              var isolate = $famousDecorator.ensureIsolate(scope);
              var Flipper = $famous["famous/views/Flipper"];

              //TODO:  $watch and update, or $parse and attr.$observe
              var options = scope.$eval(attrs.faOptions) || {};

              isolate.renderNode = new Flipper(options);
              isolate.children = [];

              isolate.flip = function (overrideOptions) {
                isolate.renderNode.flip(overrideOptions || scope.$eval(attrs.faOptions));
              };

              $famousDecorator.sequenceWith(
                scope,
                function(data) {
                  var _childCount = isolate.children.length;
                  if (_childCount == 0) {
                    isolate.renderNode.setFront(data.renderNode);
                  } else if (_childCount == 1) {
                    isolate.renderNode.setBack(data.renderNode);
                  } else {
                    throw new Error('fa-flipper accepts only two child elements; more than two have been provided');
                  }

                  isolate.children.push(data.renderNode);
                },
                // TODO: support removing children
                function(childScopeId) {
                  throw new Error('unimplemented: fa-flipper does not support removing children');
                }
              );
            },
            post: function (scope, element, attrs) {
              var isolate = $famousDecorator.ensureIsolate(scope);
              transclude(scope, function (clone) {
                element.find('div').append(clone);
              });
              $famousDecorator.registerChild(scope, element, isolate);
            }
          };
        }
      };
    }
  ]);