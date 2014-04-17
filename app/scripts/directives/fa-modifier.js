angular.module('famous.angular')
  .directive('faModifier', ["famous", function (famous) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 100,
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var RenderNode = famous['famous/core/RenderNode']
            var Modifier = famous['famous/core/Modifier']
            var Transform = famous['famous/core/Transform']

            isolate.node = new RenderNode();

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            var getTransform = function() {
              //var transforms = [Transform.translate(0, 0, 0)];
              var transforms = [];
              if (attrs.faTranslate) {
                var values = scope.$eval(attrs.faTranslate).map(get)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (attrs.faRotateX)
                transforms.push(Transform.rotateX(get(scope.$eval(attrs.faRotateX))));
              if (attrs.faRotateY)
                transforms.push(Transform.rotateY(get(scope.$eval(attrs.faRotateY))));
              if (attrs.faRotateZ)
                transforms.push(Transform.rotateZ(get(scope.$eval(attrs.faRotateZ))));
              if (attrs.faSkew)
                transforms.push(Transform.skew(0, 0, scope.$eval(attrs.faSkew)));
              if(!transforms.length)
                return undefined;
              return Transform.multiply.apply(this, transforms);
            };

            var getOpacity = function(){
              if (attrs.faOpacity)
                return scope.$eval(attrs.faOpacity);
              return 1;
            }

            isolate.modifier = new Modifier({transform: getTransform,
                                         size: scope.$eval(attrs.faSize),
                                         opacity: scope.$eval(attrs.faOpacity),
                                         origin: scope.$eval(attrs.faOrigin)});

            var modifierNode = isolate.node.add(isolate.modifier);
            
            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id !== evt.currentScope.$id){
                console.log('view registered', data);
                modifierNode.add(data.view);
                evt.stopPropagation();
              }
            })

            if(attrs.faTranslate){
            }
          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', {view: isolate.node, mod: function() { return {origin: ""}; }});
          }
        }
      }
    };
  }]);
