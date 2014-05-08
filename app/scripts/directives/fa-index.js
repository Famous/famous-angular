

angular.module('famous.angular')
  .directive('faIndex', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function(){
              return scope.$eval(attrs.faIndex)
            }, function(){
              isolate.index = scope.$eval(attrs.faIndex)
            });
          }
        }
      }
    };
  });
