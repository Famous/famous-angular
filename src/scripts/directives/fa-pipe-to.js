/**
 * @ngdoc directive
 * @name faPipeTo
 * @module famous.angular
 * @restrict A
 * @priority 16
 * @param {Object} EventHandler - Event handler source object
 * @description
 * This directive pipes an element's event handler to a source event handler.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-to="EventHandler">
 *   <!-- zero or more render nodes -->
 * </ANY>
 * ```
 * @example
 *
 * ##ScrollView example
 *
 * In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
 * To pass information between two unrelated views, or even between a nested View to its parent, use `fa-pipe-to` and `fa-pipe-from` to pipe and receive events.
 * 
 * In the example below, even though `fa-view`, `fa-modifier`, and `fa-surface` are all nested within an `fa-scroll-view`, all of these elements' events (such as touch or scroll) do not propagate upwards towards their parent.
 *
 * Note:  This example will not work.
 *
 * ```html
 * <!-- fa-scroll-view is not receiving any events from its children -->
 * <fa-scroll-view>
 *    <fa-view ng-repeat="view in views">
 *       <fa-modifier fa-size="[320, 320]">
 *        <!-- Events on fa-surface are not propagated upwards to its parents automatically -->
 *           <fa-surface fa-background-color="'blue'"></fa-surface>
 *         </fa-modifier>
 *    </fa-view>
 * </fa-scroll-view>
 *  ```
 * 
 * In the example below, events from the `fa-surface` are piped to `myEventHandler`, a source event handler, via `fa-pipe-to`. `Fa-scroll-view` receives events from `myEventHandler`, its target event handler, via `fa-pipe-from`. 
 * `myEventHandler` refers to an instantiated Famous EventHandler declared on the scope.  Using pipes allows events to propagate between `fa-surface`s and the `fa-scroll-view`.
 *
 * ```html
 * <!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them -->
 * <fa-scroll-view fa-pipe-from="myEventHandler">
 *     <fa-view ng-repeat="view in views">
 *       <fa-modifier fa-size="[320, 320]">
 *       <!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler -->
 *          <fa-surface fa-background-color="'blue'"
 *                       fa-pipe-to="myEventHandler">
 *          </fa-surface>
 *         </fa-modifier>
 *     </fa-view>
 * </fa-scroll-view>
 * ```
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.myEventHandler = new EventHandler();
 * ```
 *
 * ##Event Handlers on the Controller
 * 
 * The example below is more in line with a "vanilla" Famous approach to event piping.  There are two Views, each with one Surface.  In the html, the second View has a`fa-pipe-from` bound to `eventHandlerB`.  
 * 
 * Two event handlers are instantiated on the controller.  `EventHandlerA` pipes to `eventHandlerB`, using: `eventHandlerA.pipe(eventHandlerB)`.
 *
 * If the fa-surface on the first View is clicked, it calls `surfaceClick()` via fa-click, which causes `eventHandlerA` to emit a custom event called `myEvent`.
 * Because `evenHandlerA` pipes to `eventHandlerB`, `eventHandlerB` receives `myEvent`.  
 * 
 * An event handler for `myEvent` is declared for `eventHandlerB` using an `.on()` method.  When eventHandlerB receives a `myEvent` event, the event is handled with a callback function that translates the `fa-surface` on the second view.
 * 
 * ```html
 * <fa-view>
 *   <fa-modifier fa-size="[100, 100]">
 *       <fa-surface fa-background-color="'blue'" fa-click="surfaceClick()"></fa-surface>
 *     </fa-modifier>
 * </fa-view>
 * <fa-view fa-pipe-from="eventHandlerB">
 *   <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
 *       <fa-surface fa-background-color="'red'"></fa-surface>
 *   </fa-modifier>
 * </fa-view>
 * ```
 * 
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandlerA = new EventHandler();
 * $scope.eventHandlerB = new EventHandler();
 * $scope.eventHandlerA.pipe($scope.eventHandlerB); 
 * // all events received by eventHandlerA wil be piped to eventHandlerB
 *
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.redTrans = new Transitionable([0, 0, 0]);
 *
 * // eventHandlerA emits 'myEvent' on click
 * $scope.surfaceClick = function() {
 *   $scope.eventHandlerA.emit('myEvent');
 * };
 *
 * // eventHandlerA pipes all events it receives to eventHandlerB
 * // This is an event handler defined on eventHandlerB for handling 'myEvent'
 * $scope.eventHandlerB.on('myEvent', function() {
 *   $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
 * });
 * ```
 * 
 * ##Switching Pipes
 * 
 * Another feature of `fa-pipe-to` and `fa-pipe-from` is the ability to switch pipes.
 * 
 * Using fa-pipe-to & fa-pipe-from involves binding it to a reference of an event handler on the scope.
 * If the event handler bound to `fa-pipe-to/fa-pipe-from` changes, the directives unpipes from that event handler, and can pipe to another event handler.
 *
 * The Famous approach to events allows more flexibility than DOM events which are hierarchical.  The example below shows a case in which eventing to non-hierarchical eventing & switching pipes dynamically can allow more expressiveness with events than a hierarchical DOM event propagation model.
 * 
 * ### Example & Explanation
 * 
 * Touch events from a directional pad conditionally affect three different Scroll Views on a page.
 * Based on which checkboxes are checked, the scroll events on the directional pad will affect either Scroll View A, Scroll View B, or Scroll View C.
 * The pipes are databound using `fa-pipe-to` and `fa-pipe-from`, and they are swapped out using the controller.
 * 
 * There are two main `fa-view`s: the directional pad which contains a Scroll View (for input) & 3 checkboxes, and the other `fa-view` that contains 3 Scroll Views.
 * The Scroll View of the directional pad uses `fa-pipe-from` to pipe events from `mainPipe` to its Scroll View's event handler.
 * The surface within the directional pad uses `fa-pipe-to` to pipe `fa-surface` events to `mainPipe`.
 * 
 * In the second view containing 3 Scroll Views, each Scroll View pipes from `emptyPipe` by default, another instantiated EventHandler that has no events piped to it.  
 *  
 * ```html
 * <!-- directional pad view -->
 * <fa-view>
 *   <!-- scroll view used as a directional pad input, receives events from mainPipe-->
 *   <fa-scroll-view fa-pipe-from="mainPipe">
 *     <fa-modifier fa-translate="[0, 0, 15]" fa-size="[320, 50]">
 *       <fa-view>
 *         <fa-modifier>
 *           <!-- mousewheel events will be piped to mainPipe -->
 *           <fa-surface fa-background-color="'orange'" fa-pipe-to="mainPipe">
 *             <div>Directional pad</div>
 *               <span ng-repeat="input in inputList">
 *                 <label>{{input.letter}}</label>
 *                 <!-- checkboxes -->
 *                 <input type="checkbox"
 *                        ng-model="input.model" 
 *                        name="scrollPipeTo" 
 *                        ng-change="checkBoxChange(input.letter, input.model)"
 *                        ng-true-value="true"
 *                        ng-false-value="false">
 *               </span>
 *           </fa-surface>
 *         </fa-modifier>
 *       </fa-view>
 *     </fa-modifier>
 *   </fa-scroll-view>
 * </fa-view>
 * 
 * <!-- view with 3 Scroll Views -->
 * <fa-view>
 *   <!-- ng-repeat creating 3 different scroll Views -->
 *   <fa-modifier ng-repeat="view in scrollViews"
 *                fa-translate="[100 * $index, 50, 0]">
 *     <fa-view>
 *       <!-- each Scroll View conditionally receives events from mainPipe or emptyPipe, default is emptyPipe -->
 *       <fa-scroll-view fa-pipe-from="{{view.pipe}}" fa-options="options.scrollViewTwo">
 *         <fa-view ng-repeat="items in list">
 *           <fa-modifier fa-size="[100, 100]">
 *               <fa-surface fa-background-color="view.bgColor">
 *                 Index: {{$index}}
 *               </fa-surface>
 *             </fa-modifier>
 *         </fa-view>
 *        </fa-scroll-view>   
 *     </fa-view>
 *   </fa-modifier>
 * </fa-view>
 * ```
 *
 * The directional pad has a list of input checkboxes created by an ng-repeated list from `$scope.inputList`.
 * If a checkbox is checked, it calls `checkBoxChange()`, passing the letter (such as `'A'`) and and the model (such as `'checkBox.A'`) of the respective checkbox.
 * If the checkbox is checked, the model (`checkBox.A`) is assigned the value of "true", and if it is unchecked, it is asigned the value of "false".
 * 
 * In the controller, `$scope.checkBoxChange()` changes the value of the pipe of the respective Scroll View (A, B, or C) that corresponds to the checkBox.
 * If the checkbox is checked, it assigns the respective Scroll View (A, B, or C) to pipe from `$scope.mainPipe`, and if unchecked, it will continue to pipe from `$scope.emptyPipe`.
 * In short, the checkboxes act as switches to change piping events.
 *
 * ```javascript
 * // Event Handlers
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.mainPipe = new EventHandler();
 * $scope.emptyPipe = new EventHandler();
 * 
 * // items in ng-repeated list in each of the 3 Scroll Views
 * $scope.list = [];
 * for (var i = 0; i < 10; i++) {
 *   $scope.list.push({});
 * };
 * 
 * // 3 inputs in the directional pad corresponding to the 3 scroll views
 * $scope.inputList = [{model: "checkBox.A", letter: "A"},{model: "checkBox.B", letter: "B"}, {model: "checkBox.C", letter: "C"}];
 * 
 * // 3 scrollviews
 * $scope.scrollViews = [{pipe: "pipes.A", bgColor: "blue"}, {pipe: "pipes.B", bgColor: "red"}, {pipe: "pipes.C", bgColor: "green"}];
 * 
 * // pipes that each of the 3 scroll views is binded to through fa-pipe-from
 * $scope.pipes = {
 *   A: $scope.emptyPipe,
 *   B: $scope.emptyPipe,
 *   C: $scope.emptyPipe
 * };
 * 
 * // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
 * $scope.checkBoxChange = function(model, value) {
 *   if (value !== "false") {
 *     $scope.pipes[model] = $scope.mainPipe;
 *   } else {
 *     $scope.pipes[model] = $scope.emptyPipe;
 *   };
 * };
 * ```
 */

angular.module('famous.angular')
  .directive('faPipeTo', ['$famous', '$famousDecorator', '$famousPipe', function ($famous, $famousDecorator, $famousPipe) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        var Engine = $famous['famous/core/Engine'];

        return {
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            scope.$watch(
              function(){
                return scope.$eval(attrs.faPipeTo);
              },
              function(newSource, oldSource) {
                var target = isolate.renderNode || Engine;
                $famousPipe.unpipesFromTargets(oldSource, target);
                $famousPipe.pipesToTargets(newSource, target);
              }
            );

            // Destroy listeners along with scope
            scope.$on('$destroy', function() {
              $famousPipe.unpipesFromTargets(
                scope.$eval(attrs.faPipeTo),
                isolate.renderNode || Engine
              );
            });
          }
        }
      }
    };
  }]);
