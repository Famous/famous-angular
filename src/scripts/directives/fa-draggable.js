/**
 * @ngdoc directive
 * @name faDraggable
 * @module famous.angular
 * @restrict EA
 * @description fa-draggable Applies a Famo.us Draggable Modifier to its children, making them
 * respond to touch and mouse dragging
*/

angular.module('famous.angular')
  .directive('faDraggable', ["$famous", "$famousDecorator", "$parse", "$rootScope", function ($famous, $famousDecorator, $parse, $rootScope) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 2,
      scope: true,
      compile: function (tElement, tAttrs) {
        return {
          post: function (scope, element, attrs, ctrl, transclude) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var RenderNode = $famous['famous/core/RenderNode'];
            var Draggable = $famous['famous/modifiers/Draggable'];


            var options = scope.$eval(attrs.faOptions) || {};
            //watch options and update when changed
            scope.$watch(function(){
              return scope.$eval(attrs.faOptions);
            }, function(newVal, oldVal){
              newVal = newVal || {};
              isolate.modifier.setOptions(newVal);
            }, true);

            //TODO:  support activating and deactivating, possibly by hooking into ngDisabled

            isolate.modifier = new Draggable(options);

            isolate.renderNode = new RenderNode().add(isolate.modifier);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
            });

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate, function() {
              // When the actual element is destroyed by Angular,
              // "hide" the Draggable by deactivating it.
              isolate.modifier.deactivate();
            });

            // Trigger a $digest loop to make sure that callbacks for the
            // $observe listeners are executed in the compilation phase.
            if(!scope.$$phase && !$rootScope.$$phase) scope.$apply();
          }
        };
      }
    };
  }]);
