
/**
 * @ngdoc directive
 * @name faAnimateEnter
 * @module famous.angular
 * @restrict EA
 * @description Attaches the passed function/expression to Angular ngAnimate "enter" events on the given element.
 * Useful when you want to manage animations in Famo.us that are tied into Angular's data-driven events, e.g. on directives like ng-repeat, ui-view, and ng-if.
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-enter="myAnimationFunction($done)">
 * </fa-view>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimateEnter', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);

            attrs.$observe('faAnimateEnter', function () {
              isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);
            });
          }
        };
      }
    };
  }]);