// 
// © 2014 Thomas Street LLC. All rights reserved
//

angular.module('famous.angular')
  .directive('faTouchEnd', function () {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            if (attrs.faTouchMove) {
              isolate.surface.on("touchend", function(data) {
                scope.$eval(attrs.faTouchEnd)(data);
              });
            }
          }
        }
      }
    };
  });
