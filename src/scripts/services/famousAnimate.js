/**
 * @ngdoc service
 * @name $animate
 * @function
 *
 * @description
 * The Famo.us/Angular implementation of the `$animate` service provides Famo.us animation support for
 * Angular's core enter, leave, and move structural events.
 *
 * With the attributes `fa-animate-enter`, `fa-animate-leave`, `fa-animate-move`, you can assign an arbitrary
 * expression to animation events.
 *
 * <strong>To notify Famo.us/Angular when your animations are complete, you must do one of two things</strong>:
 * either pass a `$done` callback in your animation expressions, or design your animation expressions to
 * evaluate as the numeric duration, in milliseconds, of the animation. If an animation expression
 * both evaluates as a non-number and fails to invoke the `$done` callback, the animation event pipeline
 * will not resolve correctly and items will fail to enter, leave, and move correctly.
 *
 * To inform Famo.us/Angular how to halt any in-progress animation, use the `fa-animate-halt` attribute.
 *
 * The core Angular animation API is fundamentally CSS class-based. Because only Famo.us Surfaces
 * support CSS classes, core directives such as `ngClass`, `ngShow`, `ngIf`, and others should be applied
 * only with directives representing Surfaces (such as {@link faSurface faSurface} and
 * {@link faImageSurface faImageSurface}).
 *
 * The {@link https://docs.angularjs.org/api/ngAnimate ngAnimate} module's documentation lists the set of
 * core directives supporting $animate events. Please note that the `ngAnimate` module is *not* required
 * (or recommended) to implement $animate events with Famo.us, but it is compatible and technically effective
 * on Surfaces.
 *
 * @usage
 * ```html
 * <ANY
 *   fa-animate-enter="expression"
 *   fa-animate-leave="expression"
 *   fa-animate-move="expression"
 *   fa-animate-halt="expression"
 *   ...
 * >
 * </ANY>
 * ```
 * @example
 * ```html
 * <fa-modifier
 *   ng-repeat="item in items"
 *   fa-rotate-y="transitionable.get()"
 *   fa-animate-enter="enter()"
 *   fa-animate-leave="leave($done)"
 *   fa-animate-halt="halt()"
 * >
 *   ...
 * </fa-modifier>
 * ```
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * var SnapTransition = $famous['famous/transitions/SnapTransition'];
 * var DURATION = 500;
 *
 * $scope.transitionable = new Transitionable(Math.PI / 4);
 *
 * // Fold items down to the right when they enter.
 * $scope.enter = function() {
 *   $scope.transitionable.set(
 *     0,
 *     {
 *       method: SnapTransition,
 *       duration: DURATION
 *     }
 *   );
 *
 *  // Declare the animation duration by returning it as a number
 *  return DURATION;
 * };
 *
 * // Fold items up to the left when they leave.
 * $scope.leave = function(done) {
 *   $scope.transitionable.set(
 *     Math.PI / 2,
 *     {
 *       method: SnapTransition,
 *       duration: DURATION
 *     },
 *     // Execute the done callback after the transition is fully applied
 *     done
 *   );
 * };
 *
 * $scope.halt = function() {
 *   // Halt any active animations
 *   $scope.transitionable.halt();
 * };
 * ```
 */
angular.module('famous.angular')
  .config(['$provide', function($provide) {
    // Hook into the animation system to emit ng-class syncers to surfaces
    $provide.decorator('$animate', ['$delegate', '$rootScope', '$famous', '$parse', '$famousDecorator', '$q',
                            function($delegate,   $rootScope,   $famous,   $parse,   $famousDecorator, $q) {

      var Timer   = $famous['famous/utilities/Timer'];

      var FA_ANIMATION_ACTIVE = '$$faAnimationActive';


      //pretty hacky
      var _lastKnownParent = {};
      var _getIsolate = function(scope){
        var isolate = $famous.getIsolate(scope);
        if(!isolate && scope) {isolate = $famousDecorator.$$getIsolateById(_lastKnownParent[scope.$id]);}
        return isolate;
      };

      /**
       * Pass through $animate methods that are strictly class based.
       * These will work on Surfaces, and will be ignored elsewhere.
       * ngAnimate has a complex API for determining when an animation should be
       * considered "enabled" which we do not need.
       */
      var animationHandlers = {
        enabled: $delegate.enabled
      };

      angular.forEach(['addClass', 'removeClass'], function(classManipulator) {
        // Stash the original class manipulator so we can apply it later
        var originalManipulator = angular.element.prototype[classManipulator];

        /**
         * Fork the angular.element.prototype class manipulator to delegate class changes
         * down to any transcluded Surfaces created by Famo.us/Angular.
         * @param  {String} className - the class to be added or removed
         * @return {void}
         */
        angular.element.prototype[classManipulator] = function(className) {
          originalManipulator.apply(this, arguments);

          // If and only if the current element represents a Famo.us Surface,
          // AND the class is not an empty string, pass through
          // the addClass and removeClass methods to the underlying renderNode.
          if ($famous.util.isASurface(this) && typeof className === 'string' && className.trim() !== '') {
            _getIsolate(this.scope()).renderNode[classManipulator](className);
          }
          return this;
        };

        /**
         * Core Angular animation events will add and remove classes (such as ng-hide)
         * to affect the display of elements using $animate.addClass. Because Famo.us
         * Surfaces make use of classes, we should pass all class-based modifications
         * directively to their Surfaces whenever possible.
         */
        animationHandlers[classManipulator] = function(element, className, done) {

          $delegate[classManipulator](element, className, done);
          if($famous.util.isFaElement(element)){
            var isolate = _getIsolate(element.scope());
            if ($famous.util.isASurface(element)) {

              var surface = isolate.renderNode;
              angular.forEach(className.split(' '), function(splitClassName) {
                if(splitClassName === 'ng-hide'){
                  if(classManipulator === 'addClass'){
                    isolate.hide();
                  } else if( classManipulator === 'removeClass' ){
                    isolate.show();
                  }
                }else {

                  surface[classManipulator](splitClassName);
                }
              });
            } else {
              angular.forEach(className.split(' '), function(splitClassName) {
                if(splitClassName === 'ng-hide'){
                  if(classManipulator === 'addClass'){
                    isolate.hide();
                  } else if( classManipulator === 'removeClass' ){
                    isolate.show();
                  }
                }
              });
            }
          }
         };
      });

      // There isn't a good way to delegate down to Surface.setClasses
      // because Angular has already negotiated the list of items to add
      // and items to remove. Manually loop through both lists.
      animationHandlers.setClass = function(element, add, remove, done) {

        $delegate.setClass(element, add, remove, done);

        if ($famous.util.isASurface(element)) {
          var surface = _getIsolate(element.scope()).renderNode;
          angular.forEach(add.split(' '), function(className) {
            surface.addClass(className);
          });

          angular.forEach(remove.split(' '), function(className) {
            surface.removeClass(className);
          });
        }
      };

      /**
       * $animate.enter, $animate.leave, and $animate.move events
       * can trigger Famo.us animations with the `fa-animate-enter`,
       * `fa-animate-move`, and `fa-animate-leave` attributes.
       * If defined, each of these properties should evaluate to expressions
       * that equal the duration of their animations in milliseconds.
       *
       * Explicitly declaring the duration of all animations ensures
       * Famo.us will know how long to wait before considering the animation
       * complete and allow Angular to continue manipulating elements and classes.
       */
      angular.forEach(['enter', 'leave', 'move'], function(operation) {
        var capitalizedOperation = operation[0].toUpperCase() + operation.slice(1);
        animationHandlers[operation] = function(element, parent, nonCloneElement) {
          var self = this;
          var selfArgs = arguments;
          var delegateFirst = (operation === 'enter');
          var promise;

          var elemScope = element.scope();

          //such hack:  keep a hash of last-known parents so that we can access a scope's parent
          //            after that scope has been destroyed.  useful for e.g. ui-view and ng-include
          if(elemScope && elemScope.$parent) {_lastKnownParent[elemScope.$id] = elemScope.$parent.$id;}

          var isolate = _getIsolate(elemScope);

          if (delegateFirst === true) {
            promise = $delegate[operation].apply(this, arguments);
          } else {
            var defer = $q.defer();
            Timer.setTimeout(function() {
              defer.resolve();
            }, 0);
            promise = defer.promise;
          }

           // Detect if an animation is currently running
          if (element.data(FA_ANIMATION_ACTIVE) === true) {
            if(isolate && isolate.$$animateHaltHandler) { isolate.$$animateHaltHandler(element.scope()); }
          }

          // Indicate an animation is currently running
          element.data(FA_ANIMATION_ACTIVE, true);

          var doneCallback = function() {

            var scopeId = elemScope && elemScope.$id;

            //hide the element on animate.leave
            if(operation === 'leave' && $famous.util.isFaElement(element)){
              var isolate = _getIsolate(elemScope);
              if(isolate && isolate.id) isolate.hide();
            }

            // Abort if the done callback has already been invoked
            if (element.data(FA_ANIMATION_ACTIVE) === false) {
              return;
            }

            // Indicate an animation is no longer running
            element.data(FA_ANIMATION_ACTIVE, false);
            if (delegateFirst === false) {
              $delegate[operation].apply(self, selfArgs);
            }
          };

          $rootScope.$$postDigest(function() {

            //if this was an enter event, isolate and scope would not have
            //existed on the first invocation above
            var elemScope = element.scope();

            var isolate = _getIsolate(elemScope);

            var animationHandler;
            //handle $$animateEnterHandler, $$animateLeaveHandler, and $$animateHaltHandler

            if(isolate) { animationHandler = isolate["$$animate" + capitalizedOperation + "Handler"]; }

            // If no animation has been specified [including if this isn't
            // an fa-element] delegate the animation event and return

            if (animationHandler === undefined) {
              doneCallback();
              return;
            }

            //expects a $parse'd function or a function that
            //responds to the same API fn(scope, {locals})
            var animationDuration = animationHandler(
              elemScope,
              {
                $done: doneCallback
              }
            );

            if (typeof animationDuration === 'number') {
              Timer.setTimeout(doneCallback, animationDuration);
            }
          });

          return promise;
        };
      });

      return animationHandlers;
    }]);
  }]);
