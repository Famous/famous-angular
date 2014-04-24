// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faPresenter', function ($controller) {
    return {
      restrict: 'A',
      scope: false,
      priority: 1001,
      compile: function(tElement, tAttrs, transclude) {
        return {
          pre: function(scope, element, attrs){
            //TODO:  fa-presenter might be able to sit elsewhere
            //  in the compilation cycle, probably right as the post-compile
            //  fires. (probably call it at the beginning of each component's
            //  post-compile fn)
            //  This would give the advantage/feature of being able to address
            //  elements by their identifiers using HTML selectors
            //  (this may be a good way to pass references from
            //  the views/DOM to the controllers)
          },
          post: function(scope, element, attrs){
            if(attrs.faPresenter)
              $controller(attrs.faPresenter, {'$scope': scope})
          }
        }
      }
    };
  });
