angular.module('famous.angular')
  .directive('faController', function ($controller) {
    return {
      restrict: 'A',
      scope: true,
      compile: function(tElement, tAttrs, transclude) {
        return {
          pre: function(scope, element, attrs){
            //TODO:  fa-controller might be able to sit elsewhere
            //  in the compilation cycle, probably right as the post-compile
            //  fires. (probably call it at the beginning of each component's
            //  post-compile fn)
            //  This would give the advantage/feature of being able to address
            //  elements by their identifiers using HTML selectors
            //  (this may be a good way to pass references from
            //  the views/DOM to the controllers)
            if(attrs.faController)
              $controller(attrs.faController, {'$scope': scope})
          },
          post: function(scope, element, attrs){
          }
        }
      }
    };
  });
