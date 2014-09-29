
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

            attrs.$observe('faAnimateMove', function () {
              isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);
            });
          }
        };
      }
    };
  }]);