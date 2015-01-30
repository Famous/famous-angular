/**
 * @ngdoc directive
 * @name faFlipper
 * @module famous.angular
 * @requires famous
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
 <example module="faFlipperExampleApp">
  <file name="index.html">
  <fa-app ng-controller="FlipperCtrl">
      <fa-flipper>
        <fa-modifier fa-size="[200, 200]">
          <fa-surface fa-background-color="'yellow'" fa-click="flipIt()">Click me to see me flip!</fa-surface>
        </fa-modifier>  
        <fa-modifier fa-size="[200, 200]">
          <fa-surface fa-background-color="'red'" fa-click="flipIt()">Flip me again!</fa-surface>
        </fa-modifier>  
      </fa-flipper>
    </fa-app>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    div {
      cursor: pointer;
      padding: 8px 8px;
    }
  </file>
  <file name="script.js">
  angular.module('faFlipperExampleApp', ['famous.angular'])
      .controller('FlipperCtrl', ['$scope', '$famous', function($scope, $famous) {
        $scope.flipIt = function() {
           $famous.find('fa-flipper')[0].flip();
        };
    }]);
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faFlipper', ["$famous", "$famousDecorator",
    function ($famous, $famousDecorator) {
      return {
        template: '<div></div>',
        restrict: 'E',
        transclude: true,
        scope: true,
        compile: function (tElem, tAttrs) {
          return {
            pre: function (scope, element, attrs) {
              var isolate = $famousDecorator.ensureIsolate(scope);
              var Flipper = $famous["famous/views/Flipper"];


              //TODO:  $watch and update, or $parse and attr.$observe
              var options = scope.$eval(attrs.faOptions) || {};
              isolate.renderNode = new Flipper(options);
              $famousDecorator.addRole('renderable',isolate);
              isolate.show();
           
              isolate.children = [];

              isolate.flip = function (overrideOptions) {
                isolate.renderNode.flip(overrideOptions || scope.$eval(attrs.faOptions));
              };

              $famousDecorator.sequenceWith(
                scope,
                function(data) {
                  //TODO:  support fa-index + sorting children instead of just a stack
                  var _childCount = isolate.children.length;
                  if (_childCount === 0) {
                    isolate.renderNode.setFront(data.renderGate);
                  } else if (_childCount === 1) {
                    isolate.renderNode.setBack(data.renderGate);
                  } else {
                    throw new Error('fa-flipper accepts only two child elements; more than two have been provided');
                  }

                  isolate.children.push(data.renderGate);
                },
                function(childScopeId) {
                  //TODO:  support fa-index + sorting children and removing
                  //       the child at the proper index instead of just popping off a stack

                  //Since children should handle hiding themselves, all we need to do is
                  //update our children array
                  isolate.children.splice(isolate.children.length - 1, 1);
                }
              );
            },
            post: function (scope, element, attrs, ctrl, transclude) {
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