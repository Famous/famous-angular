
//TODO:  DOCUMENT

angular.module('famous.angular')
  .directive('faAnimateLeave', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateLeaveHandler = $parse(attrs.faAnimateLeave);

            scope.$watch(function () {
              return scope.$eval(attrs.faAnimateLeave);
            }, function () {
              isolate.$$animateLeaveHandler = $parse(attrs.faAnimateLeave);
              if(isolate.updateMethod) isolate.updateMethod();
            });
          }
        };
      }
    };
  }]);