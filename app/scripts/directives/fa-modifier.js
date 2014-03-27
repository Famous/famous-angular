'use strict';

angular.module('integrationApp')
  .directive('faModifier', function (famous) {
    return {
      restrict: 'EA',
      scope: {
        "faTranslate": '='
      },
      compile: function(tElement, tAttrs, transclude){
        console.log('compiling modifier');
        return {
          pre: function(scope, element, attrs){
          },
          post: function(scope, elemetn, attrs){
            var Modifier = famous['famous/core/modifier']
            var Transform = famous['famous/core/transform']

            var transforms = [];
            if(scope.faTranslate){
              console.log('translate', scope["faTranslate"]);
              transforms.push(Transform.translate.apply(this, scope["faTranslate"]));
              scope.$emit('registerModifier', {
                translate: scope["faTranslate"],
                origin: [0,0]
              });
            }
          }
        }
      }
    };
  });
