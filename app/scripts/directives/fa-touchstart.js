


angular.module('famous.angular')
  .directive('faTouchstart', function ($parse) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            if (attrs.faTouchStart) {
              isolate.renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchStart);
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
