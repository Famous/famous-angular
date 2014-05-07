

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
          post: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var RenderNode = famous['famous/core/RenderNode']
            var Modifier = famous['famous/core/Modifier']
            var Transform = famous['famous/core/Transform']

            isolate.index = scope.$eval(attrs.faIndex);

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            isolate.getTransform = function() {
              //var transforms = [Transform.translate(0, 0, 0)];
              var transforms = [];
              if (attrs.faTranslate) {
                var values = scope.$eval(attrs.faTranslate).map(get)
                transforms.push(Transform.translate.apply(this, values));
              }

              if (attrs.faRotateX){
                transforms.push(
                  Transform.rotateX(
                    get(
                      scope.$eval(attrs.faRotateX)
                    )
                  )
                );
              }

              if (attrs.faScale){
                var values = scope.$eval(attrs.faScale).map(get)
                transforms.push(Transform.scale.apply(this, values));
              }

              if (attrs.faRotateY) {
                transforms.push(
                  Transform.rotateY(
                    get(
                      scope.$eval(attrs.faRotateY)
                    )
                  )
                );
              }

              if (attrs.faRotateZ) {
                transforms.push(
                  Transform.rotateZ(
                    get(
                      scope.$eval(attrs.faRotateZ)
                    )
                  )
                );
              }

              if (attrs.faSkew) {
                transforms.push(
                  Transform.skew(0, 0, scope.$eval(attrs.faSkew))
                );
              }



              if(!transforms.length)
                return undefined;
              else if (transforms.length === 1)
                return transforms[0]
              else
                return Transform.multiply.apply(this, transforms);
            };

            isolate.getOpacity = function(){
              if (attrs.faOpacity)
                return get(scope.$eval(attrs.faOpacity));
              return 1;
            }

            
            isolate.modifier = new Modifier({
              transform: isolate.getTransform,
              size: scope.$eval(attrs.faSize),
              opacity: isolate.getOpacity,
              origin: scope.$eval(attrs.faOrigin)
            });

            isolate.renderNode = new RenderNode().add(isolate.modifier)

            scope.$on('$destroy', function() {
              isolate.modifier.setOpacity(0);
              scope.$emit('unregisterChild', {id: scope.$id});
            });
            
            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id !== evt.currentScope.$id){
                isolate.renderNode.add(data.renderNode);
                evt.stopPropagation();
              }
            })
            
            var isolate = scope.isolate[scope.$id];

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });


            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate)

            scope.$emit('registerChild', {
              id: scope.$id,
              index: isolate.index,
              renderNode: isolate.renderNode
            });
          }
        }
      }
    };
  }]);
