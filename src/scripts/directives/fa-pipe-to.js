/**
 * @ngdoc directive
 * @name faPipeTo
 * @module famous.angular
 * @restrict A
 * @param {Object} EventHandler - Event handler target object
 * @description
 * This directive add an event handler object to set of downstream handlers.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-to="eventHandler">
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
              function(newPipe, oldPipe){
                var target = isolate.renderNode || Engine;
                $famousPipe.unpipesFromTargets(oldPipe, target);
                $famousPipe.pipesToTargets(newPipe, target);
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
