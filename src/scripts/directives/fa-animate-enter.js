
angular.module('famous.angular')
  .directive('faAnimateEnter', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);

            scope.$watch(function () {
              return scope.$eval(attrs.faAnimateEnter);
            }, function () {
              isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);
              if(isolate.updateMethod) isolate.updateMethod();
            });
          }
        };
      }
    };
  }]);