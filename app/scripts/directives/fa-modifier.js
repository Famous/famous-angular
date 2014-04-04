'use strict';

angular.module('integrationApp')
  .directive('faModifier', function (famous) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        "faTranslate": '=',
        "faRotateZ": '=',
        "faRotateX": '=',
        "faRotateY": '=',
        "faSkew": '=',
        "faOrigin": '=',
        "faSize": '=',
      },
      compile: function(tElement, tAttrs, transclude){

        var RenderNode = famous['famous/core/RenderNode']
        var node = new RenderNode();

        return {
          pre: function(scope, element, attrs){
            var Modifier = famous['famous/core/Modifier']
            var Transform = famous['famous/core/Transform']

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            var getTransform = function() {
              var transforms = [Transform.translate(0, 0, 0)];
              transforms.push(Transform.perspective(-10));
              if (scope["faTranslate"]) {
                var values = scope["faTranslate"].map(get)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateX"])
                transforms.push(Transform.rotateX(get(scope["faRotateX"])));
              if (scope["faRotateY"])
                transforms.push(Transform.rotateY(scope["faRotateY"]));
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            var modifier = new Modifier({transform: getTransform,
                                         size: scope["faSize"],
                                         origin: scope["faOrigin"]});
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
