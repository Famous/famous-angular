/**
 * @ngdoc directive
 * @name faClick
 * @module famous.angular
 * @restrict A
 * @param {expression} faClick {@link https://docs.angularjs.org/guide/expression Expression} to evaluate upon
 * click. ({@link https://docs.angularjs.org/guide/expression#-event- Event object is available as `$event`})
 * @description
 * This directive allows you to specify custom behavior when an element is clicked.
 *
 * @usage
 * ```html
 * <ANY fa-click="expression">
 *
 * </ANY>
 * ```
 */

angular.module('famous.angular')
  .directive('faClick', ["$parse", "$famousDecorator",function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faClick) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("click", function(data) {
                var fn = $parse(attrs.faClick);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
      }
    };
  }]);
