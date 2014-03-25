'use strict';

angular.module('integrationApp')
  .directive('faView', ["famous", function (famous) {
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

            scope.view = new FaView();

            var properties = {
                backgroundColor: scope["faBackgroundColor"],
            };
            var modifiers = {
               origin: scope["faOrigin"],
               transform: scope["faTranslate"] ? 
                  famous['famous/core/transform'].translate.apply(this, scope["faTranslate"]) :
                  undefined,
            };
            scope.modifier = new famous['famous/core/modifier'](modifiers);

            var Transform = famous['famous/core/transform']

            window.right = function() {
              scope.modifier.setTransform(Transform.translate(100, 0, 0), {
                            duration: 300,
                            curve: 'easeOut'
              });
            };

            scope.$on('registerChild', function(evt, data){
              console.log('view saw', data);
              if(evt.targetScope.$id != scope.$id){
                console.log('view registered', data);
                if(data.mod && data.view){
                  scope.view._add(data.mod).add(data.view);
                }else if(data.view){
                  scope.view._add(data.view);
                }
                console.log("stopping propagation");
                evt.stopPropagation();
              }
            })
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.view, mod: scope.modifier});
          }
        }
      },
      scope: {
               "faTranslate": '=',
      }
    };
  }]);
