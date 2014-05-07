
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
        return scope.isolate[scope.$id];
      }
    };
  });
