/**
 * @ngdoc directive
 * @name faTouchend
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchend Expression to evaluate upon touchend. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior after an element that {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchend has been touched}.
 *
 * @usage
 * ```html
 * <ANY fa-touchend="expression">
 *
 * </ANY>
 * ```

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchend event firing, fa-touchend will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface; touchend fires upon release of the touch point.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchend="touchEnd($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchEndCounter = 0;
$scope.touchEnd = function($event) {
  touchEndCounter++;
  console.log($event);
  console.log("touchEnd: " + touchEndCounter);
};
qqq

 */

angular.module('famous.angular')
  .directive('faTouchend', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchend) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchend", function(data) {
                var fn = $parse(attrs.faTouchend);
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
