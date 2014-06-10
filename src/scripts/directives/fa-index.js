/**
 * @ngdoc directive
 * @name faIndex
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is used to specify the rendering order of elements
 * inside of a ViewSequence-based component, such as @link api/directive/faScrollView faScrollView}
 * or @link api/directive/faGridLayout faGridLayout}.  As a special case, when elements are added to
 * these controls using ng-repeat, they are automatically assigned the
 * $index property exposed by ng-repeat.  When adding elements manually
 * (e.g. to a faScrollView but not using ng-repeat) or in a case where custom
 * order is desired, then the index value must be assigned/overridden using the faIndex directive.
 * @usage
 * ```html
 * <fa-scroll-view>
 *  <fa-surface fa-index="0">Surface 1</fa-surface>
 *  <fa-surface fa-index="1">Surface 2</fa-surface>
 * </fa-scroll-view>
 * ```
 *
 * @example
 * In this example below, a scrollview is created with two nested fa-view's, both of which have an fa-index of 0 and 1, respectively.
 * Fa-index determines the order of which the surfaces appear in the sequential view.
 * If fa-index is declared explicitly, it will override any default order of elements declared in html.
 * As in the example below, the fa-view with the blue background color appears after the one with the red background because its fa-index is set to 1.
 * If fa-views are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
 * 
 * The scrollView directive accepts another directive called fa-start-index as an attribute, and this determines which view the scrollView displays by default.
 * Fa-start-index will not affect the sequential order of the layout; the view with the red background will be layed out first, followed by the view with the blue background.
 * With this attribute set to 1, the scroll view will display the view with the index of 1, which is the view with the blue background color. 
 *
 * ```html
 *  <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewTwo" fa-start-index="1">
 *    <fa-view fa-index="1">
 *      <fa-modifier fa-size="[320, 320]">
 *          <fa-surface fa-background-color="'blue'" fa-pipe-to="eventHandler"></fa-surface>
 *        </fa-modifier>
 *    </fa-view>
 *    <fa-view fa-index="0">
 *      <fa-modifier fa-size="[320, 320]">
 *          <fa-surface fa-background-color="'red'" fa-pipe-to="eventHandler"></fa-surface>
 *        </fa-modifier>
 *    </fa-view>
 *   </fa-scroll-view>    
 * ```
 *
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandler = new EventHandler();
 * $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
 *
 * $scope.options = {
 *   scrollViewTwo: {
 *     direction: 0
 *   }
 * };
 */

angular.module('famous.angular')
  .directive('faIndex', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function(){
              return scope.$eval(attrs.faIndex)
            }, function(){
              isolate.index = scope.$eval(attrs.faIndex)
            });
          }
        }
      }
    };
  }]);