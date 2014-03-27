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

            var spec = [];

            FaView.prototype.render = function() {
              return spec;
            };


            scope.view = new FaView();

            var properties = {
                backgroundColor: scope["faBackgroundColor"],
            };

            var getTransform = function() {
              var Transform = famous['famous/core/transform']
              if (scope["faTranslate"])
                return Transform.translate.apply(this, scope["faTranslate"]);
              if (scope["faRotateZ"])
                return Transform.rotateZ(scope["faRotateZ"]);
            };


            var modifiers = {
               origin: scope["faOrigin"],
               translate: scope["faTranslate"]
            };
            scope.modifier = modifiers;

            var Transform = famous['famous/core/transform']

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                console.log('view registered', data);



                spec.push({
                  origin: data.mod.origin,
                  transform: data.mod.transform,
                  target: data.view.render()
                });
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
               "faRotateZ": '='
      }
    };
  }]);
