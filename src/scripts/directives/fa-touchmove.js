/**
 * @ngdoc directive
 * @name faTouchmove
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchmove Expression to evaluate upon touchmove. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchmove moved along a touch surface}.
 *
 * @usage
 * ```html
 * <ANY fa-touchmove="expression">
 *
 * </ANY>
 * ```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchmove event firing, fa-touchmove will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface, until release of the touch point.
The rate of which touchmove events fire is implementation-defined by browser and hardware.
Upon each firing, fa-touchmove evaluates the expression bound to it.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchmove="touchMove($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchMoveCounter = 0;
$scope.touchMove = function($event) {
  touchMoveCounter++;
  console.log($event);
  console.log("touchMove: " + touchMoveCounter);
};
```

 */

angular.module('famous.angular')
  .directive('faTouchmove', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchmove) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchmove", function(data) {
                var fn = $parse(attrs.faTouchmove);
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
