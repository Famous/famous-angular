'use strict';

angular.module('integrationApp')
  .directive('faModifier', function (famous) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        "faTranslate": '='
      },
      compile: function(tElement, tAttrs, transclude){

        var RenderNode = famous['famous/core/rendernode']
        var node = new RenderNode();

        return {
          pre: function(scope, element, attrs){
            console.log("modifier pre");
            var Modifier = famous['famous/core/modifier']

            var getTransform = function() {
              console.log("getting transform");
              var Transform = famous['famous/core/transform']
              var transforms = [];
              if (scope["faTranslate"])
                transforms.push(Transform.translate.apply(this, scope["faTranslate"]));
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            var modifier = new Modifier({transform: getTransform});
            var modifierNode = node.add(modifier);

            scope.$on('registerChild', function(evt, data){
              console.log("modifier heard child", data);
              if(evt.targetScope.$id != scope.$id){
                console.log("modifier registering child", data);
                console.log('view registered', data);
                modifierNode.add(data.view);
                evt.stopPropagation();
              }
            })

            if(scope.faTranslate){
            }
          },
          post: function(scope, element, attrs){

            transclude(scope, function(clone) {
              element.find('div div').append(clone);
            });

            scope.$emit('registerChild', {view: node, mod: function() { return {origin: ""}; }});

          }

        }
      }
    };
  });
