angular.module('famous.angular')
  .directive('faMouseover', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faMouseover) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("mouseover", function(data) {
                var fn = $parse(attrs.faMouseover);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        };
      }
    };
  }]);