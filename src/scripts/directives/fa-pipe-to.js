/**
 * @ngdoc directive
 * @name faPipeTo
 * @module famous.angular
 * @restrict A
 * @param {Object} EventHandler - Event handler target object
 * @description
 * This directive add an event handler object to set of downstream handlers.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-to="eventHandler">
 *   <!-- zero or more render nodes -->
 * </ANY>
 * ```
 */

angular.module('famous.angular')
  .directive('faPipeTo', ['$famous', '$famousDecorator', function ($famous, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        var Engine = $famous['famous/core/Engine'];
        
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            scope.$watch(
              function(){
                return scope.$eval(attrs.faPipeTo);
              },
              function(newPipe, oldPipe){
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
  }]);
