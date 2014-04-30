// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faTouchStart', function ($parse) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            if (attrs.faTouchStart) {
              isolate.surface.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchStart);
                fn(scope, {$event:data});
              });
            }
          }
        }
      }
    };
  });
