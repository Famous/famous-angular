'use strict';

angular.module('integrationApp')
  .directive('faController', function ($controller) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs, transclude) {
        return {
          pre: function(scope, element, attrs){
            console.log('fa controller!')
            if(attrs.faController)
              $controller(attrs.faController, {'$scope': scope})
          },
          post: function(scope, element, attrs){
          }
        }

      }
    };
  });
