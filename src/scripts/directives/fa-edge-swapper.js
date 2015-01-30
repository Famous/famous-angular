/**
 * @ngdoc directive
 * @name faEdgeSwapper
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to hook a Famo.us EdgeSwapper into AngularJS ngAnimate events.  For example, you can apply an fa-edge-swapper directive
 * to a `<ui-view>` or an `<ng-include>` in order to quickly and easily add EdgeSwapper transitions to template changes in those directives.
 * Supports the `fa-options` directive for setting options.  Does NOT support sitting on the same element as another fa- element
 *
 * @usage
 * ```html
 * <ui-view fa-edge-swapper></ui-view>
 * <ng-include src='getSrc()' fa-edge-swapper></ng-include>
 * ```
 */



//TODO:  TEST

angular.module('famous.angular')
  .directive('faEdgeSwapper', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      scope: true,
      restrict: 'A',
      priority: 512, //higher than ui-view and ng-include, because if it's lower it will
                     //get recompiled every time those templates change

      compile: function(tElement, tAttrs){
        var EdgeSwapper = $famous['famous/views/EdgeSwapper'];
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            //'register' for the next child to be picked up by the animateEnterHandler
            var _nextChild;

            //add animateEnter handler for new content
            isolate.$$animateEnterHandler = function(scope, locals){

              isolate.renderNode.show(_nextChild, function(){
                if(isolate.$$leaveDoneCallback){
                  isolate.$$leaveDoneCallback();
                }
                locals.$done();
              });
            };

            isolate.$$animateLeaveHandler = function(scope, locals){
              //just drops the $done callback into a spot where the
              //enter handler can access it.

              //relies on the assumption that this assignment will
              //always occur before the next enter handler's animation
              //is complete

              //maybe good enough
              isolate.$$leaveDoneCallback = locals.$done;
            };

            var initialOptions = scope.$eval(attrs.faOptions);
            isolate.renderNode = new EdgeSwapper(initialOptions);

            $famousDecorator.addRole('renderable',isolate);

            isolate.show();
            
            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                //child received
                _nextChild = data.renderGate;
              }
              //don't need to handle child removal?
            );

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
