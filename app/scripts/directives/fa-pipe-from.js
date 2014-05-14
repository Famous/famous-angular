//UNTESTED as of 2014-05-13
angular.module('famous.angular')
  .directive('faPipeFrom', function (famous, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        var Engine = famous['famous/core/Engine'];
        
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);
            scope.$watch(
              function(){
                return scope.$eval(attrs.faPipeFrom);
              },
              function(newTarget, oldTarget){
                var source = isolate.renderNode || Engine;
                if(oldTarget instanceof Array){
                  for(var i = 0; i < oldTarget.length; i++){
                    oldTarget[i].unpipe(source);
                  }
                }else if(oldTarget !== undefined){
                  oldTarget.unpipe(source);
                }

                if(newTarget instanceof Array){
                  for(var i = 0; i < newTarget.length; i++){
                    newTarget[i].pipe(source);
                  }
                }else if(newTarget !== undefined){
                  newTarget.pipe(source);
                }
              }
            );
          }
        }
      }
    };
  });
