'use strict';

angular.module('integrationApp')
  .directive('faApp', ["famous", function (famous) {
    return {
      template: '<div style="display: none;"><div></div></div>',
      transclude: true,
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        console.log('compiling app');
        return {
          pre: function(scope, element, attrs){
            var View = famous['famous/core/view'];

            element.append('<div class="famous-angular-container"></div>');
            var famousContainer = $(element.find('.famous-angular-container'))[0];
            var Engine = famous['famous/core/engine'];
            scope.context = Engine.createContext(famousContainer);

            function AppView(){
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            scope.children = [];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function(data) {
              var Transform = famous['famous/core/transform']
              var transforms = [];
              if (data.mod.translate && data.mod.translate.length) {
                var values = data.mod.translate.map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            AppView.prototype.render = function() {
              if(!scope.readyToRender)
                return [];
              return scope.children.map(function(child) {
                return {
                  origin: child.mod.origin,
                  transform: getTransform(child),
                  target: child.view.render()
                }
              });
            };

            scope.view = new AppView();
            scope.context.add(scope.view);

            scope.$on('registerChild', function(evt, data){
              scope.children.push(data);
              evt.stopPropagation();
            })
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              element.find('div div').append(clone);
            });
            scope.readyToRender = true;
          }
        }
      }
    };
  }]);
