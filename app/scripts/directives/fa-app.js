'use strict';

angular.module('integrationApp')
  .directive('faApp', ["famous", function (famous) {
    return {
      template: '<div style="display: none;"><div></div></div>',
      transclude: true,
      restrict: 'EA',
      scope: {
        "faPipeTo": '='
      },
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var View = famous['famous/core/View'];
            var Engine = famous['famous/core/Engine'];
            var Transform = famous['famous/core/Transform']

            element.append('<div class="famous-angular-container"></div>');
            var famousContainer = $(element.find('.famous-angular-container'))[0];
            scope.context = Engine.createContext(famousContainer);

            if (scope["faPipeTo"]) {
              Engine.pipe(scope["faPipeTo"])
            }


            function AppView(){
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function(data) {
              var transforms = [];
              if (data.mod().translate && data.mod().translate.length) {
                var values = data.mod().translate.map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            scope.view = new AppView();
            scope.context.add(scope.view);

            scope.$on('registerChild', function(evt, data){
              console.log("app registered child", data);
              scope.view.add(data.view);
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
