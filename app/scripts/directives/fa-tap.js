

angular.module('famous.angular')
  .directive('faTap', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTap) {
              var _dragging = false;

              //TODO:  refactor to isolate.renderNode
              var renderNode = isolate.renderNode
              renderNode.on("touchmove", function(data) {
                _dragging = true;
                return data;
              });

              renderNode.on("touchend", function(data) {
                if (!_dragging){
                  var fn = $parse(attrs.faTap);
                  fn(scope, {$event:data});
                  if(!scope.$$phase)
                    scope.$apply();
                }
                _dragging = false
              });
            }
          }
        }
      }
    };
  });
