
/**
 * @ngdoc directive
 * @name faAnimateMove
 * @module famous.angular
 * @restrict EA
 * @description Attaches the passed function/expression to Angular ngAnimate "move" events on the given element.
 * Useful when you want to manage animations in Famo.us that are tied into Angular's data-driven events, e.g. on directives like ng-repeat, ui-view, and ng-if.
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-move="myAnimationFunction($done)">
 * </fa-view>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimateMove', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);

            attrs.$observe('faAnimateMove', function () {
              isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);
            });
          }
        };
      }
    };
  }]);