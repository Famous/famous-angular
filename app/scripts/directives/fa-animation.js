'use strict';

angular.module('integrationApp')
  .directive('faAnimation', function () {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            console.log("animation element", element);
          },
          post: function(scope, element, attrs){

          }
        }
      }
    };
  });
