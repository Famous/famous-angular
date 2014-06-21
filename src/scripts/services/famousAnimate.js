/**
 * @ngdoc service
 * @name $animate
 * @function
 *
 * @description
 * The Famo.us/Angular implementation of the `$animate` service provides Famo.us animation support for
 * Angular's core enter, leave, and move structural events.
 *
 * With the attributes `fa-animate-enter`, `fa-animate-leave`, `fa-animate-move`, you can assign scope
 * methods to animation events.
 *
 * To notify Famo.us/Angular when your animations are complete, design your enter, leave, and move
 * handlers so they return an integer—the duration of their animation in milliseconds.
 *
 * To inform Famo.us/Angular how to halt an in-progress animations, use the `fa-animate-halt` attribute.
 *
 * The core Angular animation API is fundamentally CSS class-based. Because only Famo.us Surfaces
 * support CSS classes, core directives such as `ngClass`, `ngShow`, `ngIf`, and others should be applied
 * only with directives representing Surfaces (such as {@link api/directive/faSurface faSurface} and
 * {@link api/directive/faImageSurface faImageSurface}).
 *
 * The {@link https://docs.angularjs.org/api/ngAnimate ngAnimate} module's documentation lists the set of
 * core directives supporting $animate events. Please note that the `ngAnimate` module is *not* required
 * (or recommended) to implement $animate events with Famo.us, but it is compatible.
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
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * var SnapTransition = $famous['famous/transitions/SnapTransition'];
 * var DURATION = 500;
 *
 * $scope.transitionable = new Transitionable[Math.PI / 4];
 *
 * // Fold items down to the right when they enter.
 * $scope.enter = function() {
 *   scope.transitionable.set([0], {
 *     method: SnapTransition,
 *     duration: DURATION
 *   });
 *
 *  return DURATION;
 * };
 *
 * // Fold items up to the left when they leave.
 * $scope.leave = function() {
 *   scope.transitionable.set([Math.PI / 2], {
 *     method: SnapTransition,
 *     duration: DURATION
 *   });
 *
 *  return DURATION;
 * };
 *
 * scope.halt = function() {
 *   scope.transitionable.halt();
 * };
 * ```
 * ```html
 * <fa-modifier
 *   ng-repeat="item in items"
 *   fa-rotate-y="transitionable.get()"
 *   fa-animate-enter="enter()"
 *   fa-animate-leave="leave()"
 *   fa-animate-halt="halt()"
 * >
 *   ...
 * </fa-modifier>
 * ```
 */
angular.module('famous.angular')
  .config(['$provide', function($provide) {
    // Hook into the animation system to emit ng-class syncers to surfaces
    $provide.decorator('$animate', ['$delegate', '$rootScope', '$famous', '$parse',
                            function($delegate,   $rootScope,   $famous,   $parse) {

      var Surface = $famous['famous/core/Surface'];
      var Timer   = $famous['famous/utilities/Timer'];

      var FA_ANIMATION_ACTIVE = '$$faAnimationActive';

      /**
       * Check if the element selected has an isolate renderNode that accepts classes.
       * @param {Array} element - derived element
       * @return {boolean}
       */
      function isClassable(element) {
        var isolate = $famous.getIsolate(element.scope());
        return isolate && isolate.renderNode instanceof Surface;
      }

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

          // If and only if the current element represents a Famo.us Surface, pass through
          // the addClass and removeClass methods to the underlying renderNode.
          if (isClassable(this)) {
            $famous.getIsolate(this.scope()).renderNode[classManipulator](className);
          }
        };

        /**
         * Core Angular animation events will add and remove classes (such as ng-hide)
         * to affect the display of elements using $animate.addClass. Because Famo.us
         * Surfaces make use of classes, we should pass all class-based modifications
         * directively to their Surfaces whenever possible.
         */
        animationHandlers[classManipulator] = function(element, className, done) {
          $delegate[classManipulator](element, className, done);

          if (isClassable(element)) {
            var surface = $famous.getIsolate(element.scope()).renderNode;
            angular.forEach(className.split(' '), function(splitClassName) {
              surface[classManipulator](splitClassName);
            });
          }
         };
      });

      // There isn't a good way to delegate down to Surface.setClasses
      // because Angular has already negotiated the list of items to add
      // and items to remove. Manually loop through both lists.
      animationHandlers.setClass = function(element, add, remove, done) {
        $delegate.setClass(element, add, remove, done);

        if (isClassable(element)) {
          var surface = $famous.getIsolate(element.scope()).renderNode;
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
        animationHandlers[operation] = function(element) {
          var self = this;
          var selfArgs = arguments;
          var delegateFirst = (operation === 'enter');

          if (delegateFirst === true) {
            $delegate[operation].apply(this, arguments);
          }

          // Detect if an animation is currently running
          if (element.data(FA_ANIMATION_ACTIVE) === true) {
            $parse(element.attr('fa-animate-halt'))(element.scope());
          }

          // Indicate an animation is currently running
          element.data(FA_ANIMATION_ACTIVE, true);

          var callback = function() {
            // Indicate an animation is no longer running
            element.data(FA_ANIMATION_ACTIVE, false);
            if (delegateFirst === false) {
              $delegate[operation].apply(self, selfArgs);
            }
          };

          $rootScope.$$postDigest(function() {
            var animationDuration = $parse(element.attr('fa-animate-' + operation))(element.scope());
            if (typeof animationDuration === 'number') {
              Timer.setTimeout(callback, animationDuration);
            } else {
              callback();
            }
          });
        };
      });

      return animationHandlers;
    }]);
  }]);
