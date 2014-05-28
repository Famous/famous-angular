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
