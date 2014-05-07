

angular.module('famous.angular')
  .directive('faView', ["famous", "famousDecorator", "$controller", function (famous, famousDecorator, $controller) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            var View = famous['famous/core/View'];
            var Engine = famous['famous/core/Engine'];
            var Transform = famous['famous/core/Transform'];

            isolate.index = scope.$eval(attrs.faIndex);

            isolate.children = [];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            attrs.$observe('faPipeTo', function(val){
              var pipeTo = scope.$eval(val);
              if(pipeTo)
                Engine.pipe(pipeTo);
            })

            var getTransform = function(data) {
              var transforms = [];
              var mod = data.mod();
              if (mod.translate && mod.translate.length) {
                var values = mod.translate.map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (mod.rotateZ)
                transforms.push(Transform.rotateZ(mod.rotateZ));
              if (mod.skew)
                transforms.push(Transform.skew(0, 0, mod.skew));
              return Transform.multiply.apply(this, transforms);
            };

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            
            scope.$emit('registerChild', {
              id: scope.$id,
              index: isolate.index,
              renderNode: isolate.renderNode
            });

            isolate.readyToRender = true;
          }
        }
      }
    };
  }]);
