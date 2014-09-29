
//TODO:  DOCUMENT

angular.module('famous.angular')
  .directive('faAnimateHalt', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);

            attrs.$observe('faAnimateHalt', function () {
              isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);
            });
          }
        };
      }
    };
  }]);