// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faView', ["famous", "$controller", function (famous, $controller) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];
            
            var View = famous['famous/core/View'];
            var Engine = famous['famous/core/Engine'];
            var Transform = famous['famous/core/Transform']

            function FaView(){
              View.apply(this, arguments);
            }

            FaView.prototype = Object.create(View.prototype);
            FaView.prototype.constructor = FaView;

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

            //TODO:  determine if readyToRender flag is necessary anymore
            FaView.prototype.render = function() {
              if(!isolate.readyToRender)
                return [];
              return isolate.children.map(function(data){
                return {
                  // origin: data.mod().origin,
                  // transform: getTransform(data),
                  // target: data.view.render()
                }
              });
            };

            isolate.view = new FaView({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.view.add(data.view);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

            isolate._modifier = {};
            isolate.modifier = function(){
              return isolate._modifier;
            };

            scope.$on('registerModifier', function(evt, data){
              isolate._modifier = data;
            });
          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            
            scope.$emit('registerChild', {
              view: isolate.view,
              mod: isolate.modifier
            });

            isolate.readyToRender = true;
          }
        }
      }
    };
  }]);
