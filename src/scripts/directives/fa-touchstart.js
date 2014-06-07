/**
 * @ngdoc directive
 * @name faTouchstart
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchstart Expression to evaluate upon touchstart. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchstart touched upon a touch surface}.
 *
 * @usage
 * ```html
 * <ANY fa-touchstart="expression">
 *
 * </ANY>
 * ```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchstart event firing, fa-touchstart will evaluate the expression bound to it.

Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
If the touch point moves or releases touch, it will not fire a touchstart.
If the touch point is placed upon the touch surface again, it will fire another touchstart event.

```html
 <fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchstart="touchStart($event)"></fa-surface>
</fa-modifier>
```
```javascript
  var touchStartCounter = 0;
  $scope.touchStart = function($event) {
    touchStartCounter++;
    console.log($event);
    console.log("touchStart: " + touchStartCounter);
  };
```
*/

angular.module('famous.angular')
  .directive('faTouchstart', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchstart) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchstart);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
      }
    };
  }]);
