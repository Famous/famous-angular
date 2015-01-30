/**
 * @ngdoc directive
 * @name faView
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to wrap child elements into a View render node.  This is especially useful for grouping.
 * Use an `<fa-view>` surrounded by a `<fa-modifier>` in order to affect the View's position, scale, etc.
 *
 * @usage
 * ```html
 * <fa-view>
 *   <!-- content -->
 * </fa-view>
 * ```
 * @example
 * A Famous View is used for encapsulating many Modifiers and Surfaces together.  Internally, it is a Render Node that has its own input EventHandler (`_eventInput`) and output EventHandler (`_eventOutput`).
 * It does not map to DOM elements, but rather, it is an empty Render Node that can be extended by a developer.
 * A View's input eventHandler is the aggregation point of all events coming into the View, and from there, the View can listen for specific events and handle them.
 *
 * A more concrete example is a Scroll View: it is a Famous View that has been extended with certain sets of behavior to handle events such as a mouse scroll.
 * In the example below, when an `fa-surface` within an `fa-scroll-view` propagates an event (such as mouse scroll), these events are piped to the Scroll View (through `fa-pipe-to`). These events go through the Scroll View's `_eventInput` (using `fa-pipe-from`).  From there, the Scroll View has pre-defined event handlers to handle these events.
 *
 * Famous Views are a way to encapsulate large event systems with renderables (Surfaces & Modifiers).
 *
 *```html
 * <fa-scroll-view fa-pipe-from="myEventHandler">
 *   <fa-view>
 *     <fa-modifier fa-size="[320, 320]">
 *         <fa-surface fa-pipe-to="myEventHandler"></fa-surface>
 *       </fa-modifier>
 *   </fa-view>
 * </fa-scroll-view>
 *```
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.myEventHandler = new EventHandler();
 * ```
 *
 * ### Event propagation within & between Views
 * In the Famous event model, an `fa-view` nested within another `fa-view` does not automatically propagate its events to its parent.
 * Not even an `fa-surface` nested inside an `fa-view` propagates its events to the `fa-view`.  All events to an `fa-view` must be piped explicitly.
 *
 * For a more thorough discussion on Famous-Angular events, go to fa-pipe-from/fa-pipe-to in the docs.
 */

angular.module('famous.angular')
  .directive('faView', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs){
        var View = $famous['famous/core/View'];

        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            isolate.children = [];

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
              isolate.children.push(data);
            });

          },
          post: function(scope, element, attrs, ctrl, transclude){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
