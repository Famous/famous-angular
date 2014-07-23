/**
 * @ngdoc directive
 * @name faTap
 * @module famous.angular
 * @restrict A
 * @param {expression} faTap Expression to evaluate upon tap. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is tapped.
 *
 * @usage
 * ```html
 * <ANY fa-tap="expression">
 *
 * </ANY>
 * ```
 * @example
 * Note: For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * `Fa-tap` checks if a touchmove event fires between a touchstart and touchend event.  If the touchmove event fired, (the user "dragged" their finger), a `fa-tap` event will not fire.  If the user did not "drag" their finger on touch, when releasing their finger, a touchend event will fire, and fa-tap will fire.
 * 
 * ```html
 * <fa-modifier fa-size="[100, 100]">
 * <fa-surface fa-tap="tapHandler($event)" fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * 
 * ```javascript
 * $scope.tapHandler = function($event) {
 *   console.log($event);
 *   console.log("tap");
 * };
 * ```
 */

angular.module('famous.angular')
  .directive('faTap', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTap) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              var _dragging = false;

              renderNode.on("touchmove", function(data) {
                _dragging = true;
                return data;
              });

              renderNode.on("touchend", function(data) {
                if (!_dragging){
                  var fn = $parse(attrs.faTap);
                  fn(scope, {$event:data});
                  if(!scope.$$phase)
                    scope.$apply();
                }
                _dragging = false;
              });
            }
          }
        };
      }
    };
  }]);
