'use strict';

angular.module('integrationApp')
  .directive('faView', ["famous", "$controller", function (famous, $controller) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        console.log('compiling app');
        return {
          pre: function(scope, element, attrs){
            var View = famous['famous/core/view'];
            //TODO:  add custom classes from attrs (or just pass through all attrs?) to
            //       the container element.

            function FaView(){
              View.apply(this, arguments);
            }

            FaView.prototype = Object.create(View.prototype);
            FaView.prototype.constructor = FaView;

            scope.children = [];

            FaView.prototype.render = function() {
              if(!scope.readyToRender)
                return [];
              return scope.children.map(function(data){
                return {
                  origin: data.mod.origin,
                  transform: data.mod.transform,
                  target: data.view.render()
                }
              });
            };

            scope.view = new FaView();

            var Transform = famous['famous/core/transform']

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                scope.children.push(data);
                evt.stopPropagation();
              }
            })
          },
          post: function(scope, element, attrs){
            if(scope.faController)
              $controller(scope.faController, {'$scope': scope})

            var modifiers = {
               origin: scope["faOrigin"],
               translate: scope["faTranslate"]
            };
            scope.modifier = modifiers;
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.view, mod: scope.modifier});
            scope.readyToRender = true;
          }
        }
      },
      scope: {
        "faTranslate": '=',
        "faRotateZ": '=',
        "faController": '@'
      }
    };
  }]);
