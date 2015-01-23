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
 * 
 * Note:  For development purposes, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * @example
 * Upon a `touchstart` event firing, `fa-touchstart` will evaluate the expression bound to it.
 * 
 * Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
 * If the touch point moves or releases touch, it will not fire another touchstart; touchstart fires once upon the first touch.
 * If the touch point is placed upon the touch surface again, it will fire another touchstart event.
 *
 * ### Fa-touchstart on an fa-surface
 * `Fa-touchstart` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `fa-touchstart` is bound to that `fa-surface`'s touchstart eventHandler, and when touchstart fires, the function expression will be called. 
 *
 <example module="faTouchStartExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchStartCtrl">
      <fa-modifier fa-size="[200, 100]">
        <fa-surface fa-touchstart="touchStart($event)"
                    fa-background-color="'red'">
          Touch start count: {{touchStartCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTouchStartExampleApp', ['famous.angular'])
        .controller('TouchStartCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.touchStartCount = 0;

            $scope.touchStart = function($event) {
              console.log($event);
              $scope.touchStartCount++;
            };

        }]);
    </script>
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
 *
 *
 * ### Fa-touchstart on an fa-view
 * `Fa-touchstart` may be used on an `fa-view`.  The function expression bound to `fa-touchstart` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `touchstart` event, it will call the function expression bound to `fa-touchstart`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a touchstart event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-touchstart` defines a callback function in which to handle touchstart events, and when it receives a touchstart event, it calls `touchStart()`. 
 *
 <example module="faTouchStartExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchStartCtrl">

      <!-- The fa-view receives the touchstart event from the fa-surface, and calls $scope.touchStart, bound to fa-touchstart on the fa-view. -->

      <fa-view fa-touchstart="touchStart($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[200, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Touch start count: {{touchStartCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTouchStartExampleApp', ['famous.angular'])
        .controller('TouchStartCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.touchStartCount = 0;
            
            $scope.touchStart = function($event) {
              console.log($event);
              $scope.touchStartCount++;
            };

        }]);
    </script>
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
 *
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
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchstart);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        };
      }
    };
  }]);
