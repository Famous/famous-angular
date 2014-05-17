/**
 * @ngdoc directive
 * @name faPipeFrom
 * @module famous.angular
 * @restrict A
 * @priority 16
 * @param {Object} EventHandler - target handler object
 * @description
 * This directive remove an handler object from set of downstream handlers. Undoes work of "pipe"
 * from a faPipeTo directive.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-from="EventHandler">
 *   <!-- zero or more render nodes -->
 * </ANY>
 * ```
 */

//UNTESTED as of 2014-05-13
angular.module('famous.angular')
  .directive('faPipeFrom', ['$famous', '$famousDecorator', function ($famous, $famousDecorator) {
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
  }]);
