/**
 * @ngdoc directive
 * @name faContainerSurface
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us ContainerSurface containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us ContainerSurface's
 * constructor.  See [https://famo.us/docs/surfaces/ContainerSurface]
 *
 * @usage
 * ```html
 * <fa-container-surface fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-container-surface>
 * ```
 */

angular.module('famous.angular')
  .directive('faContainerSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs){
        return  {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ContainerSurface = $famous["famous/surfaces/ContainerSurface"];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ContainerSurface(options);
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                isolate.renderNode.add(data.renderGate);
              }
            );
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
