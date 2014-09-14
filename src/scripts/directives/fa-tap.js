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
 * `Fa-tap` checks if a touchmove event fires between a touchstart and tap event.  If the touchmove event fired, (the user "dragged" their finger), a `fa-tap` event will not fire.  If the user did not "drag" their finger on touch, when releasing their finger, a tap event will fire, and fa-tap will fire.
 *
 <example module="faTapExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TapCtrl">
      <fa-modifier fa-size="[100, 100]">
        <fa-surface fa-tap="tapHandler($event)"
                    fa-background-color="'red'">
          Tap count: {{tapCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTapExampleApp', ['famous.angular'])
        .controller('TapCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.tapCount = 0;

            $scope.tapHandler = function($event) {
              console.log($event);
              $scope.tapCount++;
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
 * ### Fa-tap on an fa-view
 * `Fa-tap` may be used on an `fa-view`.  The function expression bound to `fa-tap` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `tap` event, it will call the function expression bound to `fa-tap`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a tap event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-tap` defines a callback function in which to handle tap events, and when it receives a tap event, it calls `tap()`. 
 *
 <example module="faTapExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TapCtrl">

      <!-- The fa-view receives the tap event from the fa-surface, and calls $scope.tap, which is bound to fa-tap on the fa-view. -->

      <fa-view fa-tap="tap($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[100, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Tap count: {{tapCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTapExampleApp', ['famous.angular'])
        .controller('TapCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.tapCount = 0;
            
            $scope.tap = function($event) {
              console.log($event);
              $scope.tapCount++;
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

              renderNode.on("tap", function(data) {
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
