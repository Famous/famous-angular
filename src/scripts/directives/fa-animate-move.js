
//TODO:  DOCUMENT

angular.module('famous.angular')
  .directive('faAnimateMove', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);

            scope.$watch(function () {
              return scope.$eval(attrs.faAnimateMove);
            }, function () {
              isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);
              if(isolate.updateMethod) isolate.updateMethod();
            });
          }
        };
      }
    };
  }]);