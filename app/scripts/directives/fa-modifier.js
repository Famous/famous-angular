'use strict';

angular.module('integrationApp')
  .directive('faModifier', function (famous) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        "faTranslate": '=',
        "faOrigin": '='
      },
      compile: function(tElement, tAttrs, transclude){

        var RenderNode = famous['famous/core/RenderNode']
        var node = new RenderNode();

        return {
          pre: function(scope, element, attrs){
            var Modifier = famous['famous/core/Modifier']
            var Transform = famous['famous/core/Transform']

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function() {
              var transforms = [Transform.translate(0, 0, 0)];
              if (scope["faTranslate"]) {
                var values = scope["faTranslate"].map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            var modifier = new Modifier({transform: getTransform, origin: scope["faOrigin"]});
            var modifierNode = node.add(modifier);
            
            console.log("creating modifier with", {transform: getTransform, origin: scope["faOrigin"]});

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
