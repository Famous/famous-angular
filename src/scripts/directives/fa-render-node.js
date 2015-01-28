/**
 * @ngdoc directive
 * @name faRenderNode
 * @module famous.angular
 * @restrict EA
 * @description
 * A directive to insert a {@link https://famo.us/docs/core/RenderNode Famo.us RenderNode} that is
 * a wrapper for inserting a renderable component (like a Modifer or Surface) into the render tree.
 * It allows you to pass a reference to an arbitrary render node from your controller.
 * @usage
 * ```html
 * <fa-render-node fa-node="arbitrary render node reference">
 *     <!-- content -->
 * </fa-render-node>
 * ```
 * @example
 * `Fa-render-node` can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.
 *
 * All Famous widgets, such as a Scroll View, a Sequential Layout, or a Header-footer-layout, are extended Famous Views.
 * `Fa-render-node` allows a developer to create & extend their own Famous View, and use it within their own Famous-Angular app.
 *
 * In the example below, a Famous View is instantiated on the scope; a Modifier is added to it, and then a Surface is added below.
 * This approach of creating a View and adding renderables to it with the `.add()` method is more in line with a "vanilla Famous" approach than a declarative approach with Famous-Angular.
 *
 * In the html view, an `fa-render-node` is declared, with an `fa-node` attribute bound to the newly-created View on the scope, resulting in our custom View appearing on the page.
 *
 <example module="faRenderNodeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="RenderCtrl">
      <fa-render-node fa-node="masterView" id="render"></fa-render-node>
    </fa-app>

    <script>
      angular.module('faRenderNodeExampleApp', ['famous.angular'])
          .controller('RenderCtrl', ['$scope', '$famous',function($scope, $famous) {

            var View = $famous['famous/core/View'];
            var Modifier = $famous['famous/core/Modifier'];
            var Surface = $famous['famous/core/Surface'];
            var Transform = $famous['famous/core/Transform'];
            
            $scope.masterView = new View();
            
            var _surf = new Surface({properties: {backgroundColor: 'red'}});
            _surf.setContent("I'm a surface");
            
            var _mod = new Modifier();
            
            var _width = 320;
            var _height = 568;
            _mod.transformFrom(function(){
              return Transform.translate(Math.random() * _width, 0, 1);
            });
            
            $scope.masterView.add(_mod).add(_surf);

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faRenderNode', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var Engine = $famous['famous/core/Engine'];
            var RenderNode = $famous['famous/core/RenderNode'];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.children = [];

            attrs.$observe('faPipeTo', function(val){
              var pipeTo = scope.$eval(val);
              if(pipeTo)
                Engine.pipe(pipeTo);
            });

            isolate.renderNode = scope.$eval(attrs.faNode);

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
