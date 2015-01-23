
/**
 * @ngdoc directive
 * @name faAnimateHalt
 * @module famous.angular
 * @restrict EA
 * @description Will execute the passed function/expression when an ngAnimate event on the given element is halted before finishing.
 * Useful when you want to manage clean-up (e.g. Transitionable `.halt()`ing).
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-halt="cleanupFunction()">
 * </fa-view>
 * ```
 */


angular.module('famous.angular')
  .directive('faAnimateHalt', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);

            attrs.$observe('faAnimateHalt', function () {
              isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);
            });
          }
        };
      }
    };
  }]);