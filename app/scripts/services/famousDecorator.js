
angular.module('famous.angular')
  .factory('famousDecorator', function () {
    
    var _roles = {
      child: {

      },
      parent: {

      }
    }

    return {
      addRole: function(role, scope){

      },
      ensureIsolate: function(scope){
        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        return isolate;
      }
    };
  });
