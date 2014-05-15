


angular.module('famous.angular')
  .directive('faTouchstart', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

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
