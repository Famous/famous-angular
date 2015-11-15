/**
 * @ngdoc directive
 * @name faLightbox
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to hook a Famo.us Lightbox into AngularJS ngAnimate events.  For example, you can apply an fa-lightbox directive
 * to a `<ui-view>` or an `<ng-include>` in order to quickly and easily add Lightbox transitions to template changes in those directives.
 * Supports the `fa-options` directive for setting options.  Does NOT support sitting on the same element as another fa- element
 *
 * @usage
 * ```html
 * <ui-view fa-lightbox></ui-view>
 * <ng-include src='getSrc()' fa-lightbox></ng-include>
 * ```
 */

//TODO:  TEST

angular.module('famous.angular')
  .directive('faLightbox', ["$famous", "$famousDecorator",
    function ($famous, $famousDecorator) {
    return {
      scope: true,
      restrict: 'A',
      priority: 512, //higher than ui-view and ng-include, because if it's lower it will
                     //get recompiled every time those templates change

      compile: function(tElement, tAttrs, transclude){
        var Lightbox = $famous['famous/views/Lightbox'];
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var initialOptions = scope.$eval(attrs.faOptions);
            isolate.renderNode = new Lightbox(initialOptions);

            //'register' for the next child to be picked up by the animateEnterHandler
            var _nextChild;

            //add animateEnter handler for new content
            isolate.$$animateEnterHandler = function(scope, locals){

              isolate.renderNode.show(_nextChild, initialOptions.transition, function(){
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

            $famousDecorator.addRole('renderable', isolate);

            isolate.show();

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                //child received
                _nextChild = data.renderGate;
              }
              // TODO: Include remove method that hide's current child if ===
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
