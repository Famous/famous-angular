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
 * A Famous View is a Render Node that has its own input EventHandler and output EventHandler.
 * It may consist of many Modifier & Surfaces a complex set of event handlers.
 * A View's input eventHandler is the aggregation point of all events coming into the View, and then the View can handle all of those events in ways specified.
 * 
 * For example, a Scroll View is a Famous View that has been extended with certain sets of behavior.
 * When a surface within a Scroll View receives an event (such as mouse scroll), and these events are piped to the Scroll View, these events go through the Scroll View's input EventHandler and are handled by the Scroll View.
 *
 *```html
 * <fa-scroll-view fa-pipe-from="eventHandler">
 *   <fa-view>
 *     <fa-modifier fa-size="[320, 320]">
 *         <fa-surface fa-pipe-to="eventHandler"></fa-surface>
 *       </fa-modifier>
 *   </fa-view>
 *  </fa-scroll-view> 
 *```
 *
 *This brings up another important note: in the Famous event model, an fa-view nested within another fa-view does not automatically propagate its events to its parent.
 *For a longer discussion on Famous-Angular events, go to fa-pipe-from/fa-pipe-to in the docs.  
 */

angular.module('famous.angular')
  .directive('faView', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var View = $famous['famous/core/View'];
        
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            isolate.children = [];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);
