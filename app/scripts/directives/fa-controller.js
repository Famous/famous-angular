'use strict';

angular.module('integrationApp')
  .directive('faController', function ($controller) {
    return {
      restrict: 'AE',
      template: '<div></div>',
      transclude: true,
      compile: function(tElement, tAttrs, transclude) {
        return {
          pre: function(scope, element, attrs){
            if(attrs.faController)
              $controller(attrs.faController, {'$scope': scope})
            console.log(scope.xTransitionable);
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
          }
        }

      }
    };
  });
