// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faTouchend', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            if (attrs.faTouchEnd) {
              isolate.surface.on("touchend", function(data) {
                var fn = $parse(attrs.faTouchMove);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });


            }
          }
        }
      }
    };
  });
