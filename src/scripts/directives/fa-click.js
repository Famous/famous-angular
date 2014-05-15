

angular.module('famous.angular')
  .directive('faClick', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faClick) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("click", function(data) {
                var fn = $parse(attrs.faClick);
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
