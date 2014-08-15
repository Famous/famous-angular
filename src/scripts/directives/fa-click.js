/**
 * @ngdoc directive
 * @name faClick
 * @module famous.angular
 * @restrict A
 * @param {expression} faClick {@link https://docs.angularjs.org/guide/expression Expression} to evaluate upon
 * click. ({@link https://docs.angularjs.org/guide/expression#-event- Event object is available as `$event`})
 * @deprecated true
 * @description
 * This directive allows you to specify custom behavior when an element is clicked.
 *
 * @usage
 * ```html
 * <ANY fa-click="expression">
 *
 * </ANY>
 * ```
 * @example
 * ### Fa-click on an fa-surface
 * `Fa-click` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `fa-click` is bound to that `fa-surface`'s click eventHandler, and when the `fa-surface` is clicked, the function expression will be called. 
 *
 * ```html
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface fa-click="myClickHandler($event)" fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * $scope.myClickHandler = function($event) {
 *   console.log("click");
 *   console.log($event);
 * };
 * ```
 * ### Fa-click on an fa-view
 * `Fa-click` may be used on an `fa-view`.  The function expression bound to `fa-click` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `click` event, it will call the function expression bound to `fa-click`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a click event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-click` defines a callback function in which to handle click events, and when it receives a click event, it calls `myClickHandler()`. 
 * ```html
 * <fa-view fa-click="myClickHandler($event)" fa-pipe-from="myEvents">
 *   <fa-modifier fa-size="[100, 100]">
 *     <fa-surface fa-pipe-to="myEvents"
 *                 fa-background-color="'orange'">
 *     </fa-surface>
 *   </fa-modifier>
 * </fa-view>
 * ```
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.myEvents = new EventHandler();
 * 
 * $scope.myClickHandler = function($event) {
 *   console.log($event);
 *   console.log("fa-view receives the click event from the fa-surface, and calls myClickHandler defined on fa-click");
 * };
 * ```
 */
angular.module('famous.angular')
  .directive('faClick', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faClick) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);
              renderNode.on("click", function (data) {
                var fn = $parse(attrs.faClick);
                fn(scope, {$event: data});
                if (!scope.$$phase){
                  scope.$apply();
                }
              });
            }
          }
        };
      }
    };
  }]);
