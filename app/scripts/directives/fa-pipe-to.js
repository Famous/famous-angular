

angular.module('famous.angular')
  .directive('faPipeTo', function (famous, famousDecorator) {
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
                return scope.$eval(attrs.faPipeTo);
              },
              function(newPipe, oldPipe){
                console.log('updating pipes')
                var target = isolate.renderNode || Engine;
                if(oldPipe instanceof Array){
                  for(var i = 0; i < oldPipe.length; i++){
                    target.unpipe(oldPipe[i]);
                  }
                }else if(oldPipe !== undefined){
                  target.unpipe(oldPipe);
                }

                if(newPipe instanceof Array){
                  for(var i = 0; i < newPipe.length; i++){
                    target.pipe(newPipe[i]);
                  }
                }else if(newPipe !== undefined){
                  target.pipe(newPipe);
                }
              }
            );
          }
        }
      }
    };
  });
