

angular.module('famous.angular')
  .directive('faTouchend', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchEnd) {
              isolate.renderNode.on("touchend", function(data) {
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
