/**
 * famous-angular - Bring structure to your Famo.us apps with the power of AngularJS. Famo.us/Angular integrates seamlessly with existing Angular and Famo.us apps.
 * @version v0.5.0
 * @link https://github.com/Famous/famous-angular
 * @license MPL v2.0
 */
'use strict';

var ngFameApp = angular.module('famous.angular', []);

/**
 * @ngdoc provider
 * @name $famousProvider
 * @module famous.angular
 * @description
 * This provider will keep a reference on the complete Famo.us library and provide a few useful functions.
 */
ngFameApp.provider('$famous', function() {
  // hash for storing modules
  var _modules = {
    "famous/core/Context": famous.core.Context,
    "famous/core/ElementAllocator": famous.core.ElementAllocator,
    "famous/core/Engine": famous.core.Engine,
    "famous/core/Entity": famous.core.Entity,
    "famous/core/EventEmitter": famous.core.EventEmitter,
    "famous/core/EventHandler": famous.core.EventHandler,
    "famous/core/Group": famous.core.Group,
    "famous/core/Modifier": famous.core.Modifier,
    "famous/core/OptionsManager": famous.core.OptionsManager,
    "famous/core/RenderNode": famous.core.RenderNode,
    "famous/core/Scene": famous.core.Scene,
    "famous/core/SpecParser": famous.core.SpecParser,
    "famous/core/Surface": famous.core.Surface,
    "famous/core/Transform": famous.core.Transform,
    "famous/core/View": famous.core.View,
    "famous/core/ViewSequence": famous.core.ViewSequence,
    "famous/events/EventArbiter": famous.events.EventArbiter,
    "famous/events/EventFilter": famous.events.EventFilter,
    "famous/events/EventMapper": famous.events.EventMapper,
    "famous/inputs/FastClick": famous.inputs.FastClick,
    "famous/inputs/GenericSync": famous.inputs.GenericSync,
    "famous/inputs/MouseSync": famous.inputs.MouseSync,
    "famous/inputs/PinchSync": famous.inputs.PinchSync,
    "famous/inputs/RotateSync": famous.inputs.RotateSync,
    "famous/inputs/ScaleSync": famous.inputs.ScaleSync,
    "famous/inputs/ScrollSync": famous.inputs.ScrollSync,
    "famous/inputs/TouchSync": famous.inputs.TouchSync,
    "famous/inputs/TouchTracker": famous.inputs.TouchTracker,
    "famous/inputs/TwoFingerSync": famous.inputs.TwoFingerSync,
    "famous/math/Matrix": famous.math.Matrix,
    "famous/math/Quaternion": famous.math.Quaternion,
    "famous/math/Random": famous.math.Random,
    "famous/math/Utilities": famous.math.Utilities,
    "famous/math/Vector": famous.math.Vector,
    "famous/modifiers/Draggable": famous.modifiers.Draggable,
    "famous/modifiers/Fader": famous.modifiers.Fader,
    "famous/modifiers/ModifierChain": famous.modifiers.ModifierChain,
    "famous/modifiers/StateModifier": famous.modifiers.StateModifier,
    "famous/surfaces/CanvasSurface": famous.surfaces.CanvasSurface,
    "famous/surfaces/ContainerSurface": famous.surfaces.ContainerSurface,
    "famous/surfaces/FormContainerSurface": famous.surfaces.FormContainerSurface,
    "famous/surfaces/ImageSurface": famous.surfaces.ImageSurface,
    "famous/surfaces/InputSurface": famous.surfaces.InputSurface,
    "famous/surfaces/SubmitInputSurface": famous.surfaces.SubmitInputSurface,
    "famous/surfaces/TextareaSurface": famous.surfaces.TextareaSurface,
    "famous/surfaces/VideoSurface": famous.surfaces.VideoSurface,
    "famous/transitions/CachedMap": famous.transitions.CachedMap,
    "famous/transitions/Easing": famous.transitions.Easing,
    "famous/transitions/MultipleTransition": famous.transitions.MultipleTransition,
    "famous/transitions/SnapTransition": famous.transitions.SnapTransition,
    "famous/transitions/SpringTransition": famous.transitions.SpringTransition,
    "famous/transitions/Transitionable": famous.transitions.Transitionable,
    "famous/transitions/TransitionableTransform": famous.transitions.TransitionableTransform,
    "famous/transitions/TweenTransition": famous.transitions.TweenTransition,
    "famous/transitions/WallTransition": famous.transitions.WallTransition,
    "famous/utilities/KeyCodes": famous.utilities.KeyCodes,
    "famous/utilities/Timer": famous.utilities.Timer,
    "famous/utilities/Utility": famous.utilities.Utility,
    "famous/views/Deck": famous.views.Deck,
    "famous/views/EdgeSwapper": famous.views.EdgeSwapper,
    "famous/views/FlexibleLayout": famous.views.FlexibleLayout,
    "famous/views/Flipper": famous.views.Flipper,
    "famous/views/GridLayout": famous.views.GridLayout,
    "famous/views/HeaderFooterLayout": famous.views.HeaderFooterLayout,
    "famous/views/Lightbox": famous.views.Lightbox,
    "famous/views/RenderController": famous.views.RenderController,
    "famous/views/ScrollContainer": famous.views.ScrollContainer,
    "famous/views/Scroller": famous.views.Scroller,
    "famous/views/Scrollview": famous.views.Scrollview,
    "famous/views/SequentialLayout": famous.views.SequentialLayout,
    "famous/widgets/NavigationBar": famous.widgets.NavigationBar,
    "famous/widgets/Slider": famous.widgets.Slider,
    "famous/widgets/TabBar": famous.widgets.TabBar,
    "famous/widgets/ToggleButton": famous.widgets.ToggleButton,
    "famous/physics/PhysicsEngine": famous.physics.PhysicsEngine,
    "famous/physics/bodies/Body": famous.physics.bodies.Body,
    "famous/physics/bodies/Circle": famous.physics.bodies.Circle,
    "famous/physics/bodies/Particle": famous.physics.bodies.Particle,
    "famous/physics/bodies/Rectangle": famous.physics.bodies.Rectangle,
    "famous/physics/constraints/Collision": famous.physics.constraints.Collision,
    "famous/physics/constraints/Constraint": famous.physics.constraints.Constraint,
    "famous/physics/constraints/Curve": famous.physics.constraints.Curve,
    "famous/physics/constraints/Distance": famous.physics.constraints.Distance,
    "famous/physics/constraints/Snap": famous.physics.constraints.Snap,
    "famous/physics/constraints/Surface": famous.physics.constraints.Surface,
    "famous/physics/constraints/Wall": famous.physics.constraints.Wall,
    "famous/physics/constraints/Walls": famous.physics.constraints.Walls,
    "famous/physics/forces/Drag": famous.physics.forces.Drag,
    "famous/physics/forces/Force": famous.physics.forces.Force,
    "famous/physics/forces/Repulsion": famous.physics.forces.Repulsion,
    "famous/physics/forces/RotationalDrag": famous.physics.forces.RotationalDrag,
    "famous/physics/forces/RotationalSpring": famous.physics.forces.RotationalSpring,
    "famous/physics/forces/Spring": famous.physics.forces.Spring,
    "famous/physics/forces/VectorField": famous.physics.forces.VectorField,
    "famous/physics/integrators/SymplecticEuler": famous.physics.integrators.SymplecticEuler
  };

  /**
   * @ngdoc method
   * @name $famousProvider#registerModule
   * @module famous.angular
   * @description
   * Register the modules that will be available in the $famous service
   *
   * @param {String} key the key that will be used to register the module
   * @param {Misc} module the data that will be returned by the service
   */
  this.registerModule = function(key, module) {
    //TODO warning if the key is already registered ?
    _modules[key] = module;
  };

  /**
   * @ngdoc method
   * @name $famousProvider#getIsolate
   * @module famous.angular
   * @description
   * Given an scope, retrieves the corresponding isolate.
   * @param {Object} scope
   * @returns {Object} The requested isolate
   */

  _modules.getIsolate = function(scope) {
    return (scope && ('isolate' in scope)) ? scope.isolate[scope.$id] : {};
  };

  /**
   * @ngdoc method
   * @name $famousProvider#find
   * @module famous.angular
   * @description given a selector, retrieves
   * the isolate on a template-declared scene graph element.  This is useful
   * for manipulating Famo.us objects directly after they've been declared in the DOM.
   * As in normal Angular, this DOM look-up should be performed in the postLink function
   * of a directive.
   * @returns {Array} an array of the isolate objects of the selected elements.
   *
   * @param {String} selector - the selector for the elements to look up
   * @usage
   * View:
   * ```html
   * <fa-scroll-view id="myScrollView"></fa-scroll-view>
   * ```
   * Controller:
   * ```javascript
   * var scrollViewReference = $famous.find('#myScrollView')[0].renderNode;
   * //Now scrollViewReference is pointing to the Famo.us Scrollview object
   * //that we created in the view.
   * ```
   */

  _modules.find = function(selector) {
    var elems = angular.element(window.document.querySelectorAll(selector));
    var scopes = function(elems) {
      var _s = [];
      angular.forEach(elems, function(elem, i) {
        _s[i] = angular.element(elem).scope();
      });
      return _s;
    }(elems);
    var isolates = function(scopes) {
      var _s = [];
      angular.forEach(scopes, function(scope, i) {
        _s[i] = _modules.getIsolate(scope);
      });
      return _s;
    }(scopes);
    return isolates;
  };


  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  var IS_A_SURFACE = /^FA\-.*SURFACE/;
  var IS_FA = /^FA\-.*/;
  /**
    Util functions.
  */ 

  window.$famousUtil = _modules.util = {
    /**
   * Check if the element selected has an isolate renderNode that accepts classes.
   * @param {Array} element - derived element
   * @return {boolean}
   */
    isASurface : function (element) {

      return IS_A_SURFACE.test(element[0].tagName);
    },

    /**
      Check if the element selected is an fa- element
      @param {Array} element - derived element
      @return {boolean}
    */
    isFaElement : function (element) {
      //short-circuit most common case
      if(IS_FA.test(element[0].tagName)) return true;

      //otherwise loop through attributes
      var ret = false;
      angular.forEach(element[0].attributes, function(attr){
        ret = ret || IS_FA.test(attr);
      });
      return ret;
    },
    /**
     * Converts snake_case to camelCase.
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */

    camelCase :function(name) {
      return name.
        replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
          return offset ? letter.toUpperCase() : letter;
        }).
        replace(MOZ_HACK_REGEXP, 'Moz$1');
    },

    /**
     * @description Converts all accepted directives format into proper directive name.
     * All of these will become 'myDirective':
     *   my:Directive
     *   my-directive
     *   x-my-directive
     *   data-my:directive
     *
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */
    directiveNormalize: function(name) {
        return _modules.util.camelCase(name.replace(PREFIX_REGEXP, ''));
    }
  };
  
  this.$get = function() {

    /**
     * @ngdoc service
     * @name $famous
     * @module famous.angular
     * @description
     * This service gives you access to the complete Famo.us library.
     *
     * @usage
     * Use this service to access the registered Famo.us modules as an object.
     *
     * ```js
     * angular.module('mySuperApp', ['famous.angular']).controller(
     *   function($scope, $famous) {
     *
     *       // Access any registered module
     *       var EventHandler = $famous['famous/core/EventHandler'];
     *       $scope.eventHandler = new EventHandler();
     *
     *   };
     * });
     * ```
     *
     */

    return _modules;
  };
});


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
    $provide.decorator('$animate', ['$delegate', '$rootScope', '$famous', '$parse', '$famousDecorator',
                            function($delegate,   $rootScope,   $famous,   $parse,   $famousDecorator) {

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


          var elemScope = element.scope();

          //such hack:  keep a hash of last-known parents so that we can access a scope's parent
          //            after that scope has been destroyed.  useful for e.g. ui-view and ng-include
          if(elemScope && elemScope.$parent) {_lastKnownParent[elemScope.$id] = elemScope.$parent.$id;}

          var isolate = _getIsolate(elemScope);

          if (delegateFirst === true) {
             $delegate[operation].apply(this, arguments);
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
        };
      });

      return animationHandlers;
    }]);
  }]);

/**
 * @ngdoc service
 * @name $famousDecorator
 * @module famous.angular
 * @description
 * Manages the creation and handling of isolate scopes.
 *
 * Isolate scopes are like a namespacing inside plain Angular child scopes,
 * with the purpose of storing properties available only to one particular
 * scope.
 * The scopes are still able to communicate with the parent via events
 * ($emit, $broadcast), yet still have their own $scope properties that will
 * not conflict with the parent or other siblings.
 *
 * @usage
 * ```js
 * var isolate = $famousDecorator.ensureIsolate($scope);
 *
 * $famousDecorator.registerChild($element, $scope, isolate);
 *
 * $famousDecorator.sequenceWith(
 *   $scope,
 *   function(data) { ... },
 *   function(childScopeId) { ... }
 * );
 * ```
 */

angular.module('famous.angular')
  .factory('$famousDecorator', ['$famous', function ($famous) {
    //TODO:  add repeated logic to these roles
    var _roles = {
      child: {
      },
      parent: {
      },
      renderable: function( isolate ) {
        var RenderNode = $famous['famous/core/RenderNode'];

        isolate.renderGate = new RenderNode();
        isolate.emptyNode = new RenderNode();
          
        isolate.show = function() {
          if(isolate.renderGate) isolate.renderGate.set(isolate.renderNode);
        };
        isolate.hide = function() {
          isolate.renderGate.set(isolate.emptyNode);
        };
      }
      
    };

    var _isolateStore = {};

    return {
      //TODO:  patch into _roles and assign the
      // appropriate role to the given scope
      addRole: function(role, isolate){
          _roles[role](isolate);
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#ensureIsolate
       * @module famous.angular
       * @description
       * Checks the passed in scope for an existing isolate property.  If
       * scope.isolate does not already exist, create it.
       *
       * If the scope is being used in conjunction with an ng-repeat, assign
       * the default ng-repeat index onto the scope.
       *
       * @returns {Object} the isolated scope object from scope.isolate
       *
       * @param {String} scope - the scope to ensure that the isolate property
       * exists on
       * @param {Object} element (optional) - the DOM element associated with the target scope
       */
      ensureIsolate: function(scope, element) {


        //handle special-case directives that don't follow a (DOM hierarchy <=> Scope hierarchy) relationship
        if(element){
          var SPECIAL_CASE_LIST = ['fa-edge-swapper', 'fa-render-controller', 'fa-deck', 'fa-light-box'];
          var special = false;
          angular.forEach(SPECIAL_CASE_LIST, function(specialCase){
            if(specialCase.toUpperCase() === element[0].tagName) { special = true; return; }
            if(element[0].attributes[specialCase] !== undefined) { special = true; return; }
          });
          if(special){
            scope = scope.$parent;
          }
        }

        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        _isolateStore[isolate.id] = isolate;

        return isolate;
      },

      //relies on an 'alternate source of truth' vs the static .isolate
      //member shared by the fa-element child scopes.  Unideal, but should be OK
      //based on the assumption that a single Angular app will create a unique ID for
      //every new scope.
      //surface area for a memory leak (TODO: clean up upon element destruction--BUT, make sure
      //it doesn't break leave animations on ui-view and ng-include animations, e.g. <ui-view fa-edge-swapper></ui-view>)
      $$getIsolateById: function(id){
        return _isolateStore[id];
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#registerChild
       * @module famous.angular
       * @description
       * Register a child isolate's renderNode to the nearest parent that can sequence
       * it, and set up an event listener to remove it when the associated element is destroyed
       * by Angular.
       *
       * A `registerChild` event is sent upward with `scope.$emit`.
       *
       * @param {String} scope - the scope with an isolate to be sequenced
       * @param {String} element - the element to listen for destruction on
       * @param {Object} isolate - an isolated scope object from $famousDecorator#ensureIsolate
       * @param {Function} unregisterCallback - an optional callback to invoke when unregistration is complete
       * @returns {void}
       */
      registerChild: function(scope, element, isolate, unregisterCallback) {
        scope.$emit('registerChild', isolate);

        element.one('$destroy', function() {
          if ('removeMethod' in isolate) {
            isolate.removeMethod(isolate.id);
          }

          if(isolate && isolate.hide) { isolate.hide(); }

          // Invoke the callback, if provided
          if(unregisterCallback) unregisterCallback();
        });
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#sequenceWith
       * @module famous.angular
       * @description
       * Attach a listener for `registerChild` events.
       *
       * @param {String} scope - the scope to listen on
       * @param {Object} addMethod - the method to apply to the incoming isolate's content to add it
       * to the sequence
       * @param {Object} removeMethod - the method to apply to the incoming isolate's ID to remove it
       * from the sequence
       * @returns {void}
       */
      sequenceWith: function(scope, addMethod, removeMethod, updateMethod) {
        scope.$on('registerChild', function(evt, isolate) {
          if (evt.targetScope.$id !== scope.$id) {
            //add reference to parent isolate
            var parentIsolate = $famous.getIsolate(scope);
            isolate.$parent = parentIsolate;

            parentIsolate.$children = parentIsolate.$children || [];
            parentIsolate.$children.push(isolate);

            addMethod(isolate);
            evt.stopPropagation();

            // Attach the remove method to the isolate, so it can be invoked without scope, if it is provided
            if(removeMethod) isolate.removeMethod = removeMethod;
            if(updateMethod) isolate.updateMethod = updateMethod;
          }
        });
      }
    };
  }]);

/**
 * @ngdoc service
 * @name $famousPipe
 * @module famous.angular
 * @description
 * Provides common helpers for the event pipe directives fa-pipe-from and fa-pipe-to.
 */

angular.module('famous.angular')
  .service('$famousPipe', function() {

    /**
     * @param {EventHandler|Array} pipes - pipes to negotatiate
     * @param {Engine|RenderNode|Array} targets - nodes to negotiate
     * @param {String} method - action to apply from targets to pipes, e.g. "pipe" or "unpipe"
     */
    function bulkUpdatePipes(pipes, targets, method) {
      if (! (pipes instanceof Array)) {
        pipes = [pipes];
      }

      if (! (targets instanceof Array)) {
        targets = [targets];
      }

      for (var i = 0; i < pipes.length; i++) {
        for (var j = 0; j < targets.length; j++) {
          if (targets[j] !== undefined && pipes[i] !== undefined) {
            targets[j][method](pipes[i]);
          }
        }
      }
    }

    /**
     * @ngdoc method
     * @name $famousPipe#unpipesFromTargets
     * @module famous.angular
     * @param {EventHandler|Array} pipes - pipes to unpipe
     * @param {Engine|RenderNode|Array} targets - nodes to unpipe from
     * @description
     * Unpipes the specified pipes from the specified targets.
     */
    this.unpipesFromTargets = function(pipes, targets) {
      bulkUpdatePipes(pipes, targets, "unpipe");
    };

    /**
     * @ngdoc method
     * @name $famousPipe#pipesToTargets
     * @module famous.angular
     * @param {EventHandler|Array} pipes - pipes to pipe
     * @param {Engine|RenderNode|Array} targets - nodes to pipe to
     * @description
     * Pipes the specified pipes to the specified targets.
     */
    this.pipesToTargets = function(pipes, targets) {
      bulkUpdatePipes(pipes, targets, "pipe");
    };
  });

/**
 * @ngdoc service
 * @name $timeline
 * @function
 *
 * @description
 * The timeline service provides support for mapping timeline functions to different values.
 *
 * @example
 * ```html
 * <fa-modifier
 *   fa-rotate-y="rRotation(t.get())"
 *   fa-translate="translation(t.get())"
 * >
 *   ...
 * </fa-modifier>
 * ```
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * var Easing = $famous['famous/transitions/Easing'];
 *
 * $scope.t = new Transitionable(0);
 *
 * $scope.yRotation = $timeline([
 *   [0, 0, Easing.inOutQuad],
 *   [0.8, 1.1 * (Math.PI/2), Easing.inOutQuart],
 *   [1, Math.PI/2]
 * ]);
 *
 * $scope.translation = $timeline([
 *   [0, [100, 100, 0], Easing.inOutQuad],
 *   [1, [400, 200, 0]]
 * ]);
 *
 * ```
 */


angular.module('famous.angular')
  .factory('$timeline', function () {

    // polymorphic add for scalars and vectors
    var add = function(a, b) {
      if (typeof a === "number") {
        return a + b;
      }
      else {
        return a.map(function(x, i) { return x + b[i]; });
      }
    };

    // polymorphic subtract for scalars and vectors
    var subtract = function(a, b) {
      if (typeof a === "number") {
        return a - b;
      }
      else {
        return a.map(function(x, i) { return x - b[i]; });
      }
    };

    // polymorphic multiply for scalar and vectors
    var multiply = function(A, b) {
      // b is a scalar, A is a scalar or a vector
      if (typeof A === "number") {
        return A * b;
      }
      else {
        return A.map(function(x) { return x * b; });
      }
    };

    var scale = function (f, x1, x2, y1, y2) {
      // x1 and x2 must be scalars. y1 and y2 can be scalars or vectors
      return function(x) {
        var yTranslate = y1;
        var xTranslate = -x1;
        var xScale = 1 / (x2 - x1);
        var yScale = subtract(y2, y1);
        return add(multiply(yScale, f(xScale * (x + xTranslate))), yTranslate);
      };
    };

    return function(points) {
        //
        // Takes a list of points, with the curve to follow to the next point.
        // Any curve value on the last point is ignored. If no curve function is
        // provided, a linear (identity) function is used.
        //
        //  e.g., [[0, 100, Easings.inOutQuad], [1, 500]]
        //
        // Returns a piecewise function f:
        //
        //
        //         / y₀,             if x < x₀
        //         |
        //         | scaled(curveᵢ,  if xᵢ ≤ x < xᵢ₊₁
        //         |        xᵢ,
        //         |        xᵢ,
        // f(x) = <         yᵢ₊₁,
        //         |        yᵢ₊₁)(x)
        //         | for i in 0..segments.length - 1
        //         |
        //         \ last x,         otherwise
        //

        var linear = function(x) { return x; };

        return function(x) {
          if (x < points[0][0]) {
            return points[0][1];
          }
          for (var i = 0; i < points.length - 1; i++) {
            if (points[i][0] <= x && x < points[i+1][0]) {
              var f = scale(points[i][2] || linear,
                            points[i][0],
                            points[i+1][0],
                            points[i][1],
                            points[i+1][1]);

              return f(x);
            }
          }
          return points[points.length-1][1];
        };

      };

  });


/**
 * @ngdoc directive
 * @name faAnimateEnter
 * @module famous.angular
 * @restrict EA
 * @description Attaches the passed function/expression to Angular ngAnimate "enter" events on the given element.
 * Useful when you want to manage animations in Famo.us that are tied into Angular's data-driven events, e.g. on directives like ng-repeat, ui-view, and ng-if.
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-enter="myAnimationFunction($done)">
 * </fa-view>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimateEnter', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);

            attrs.$observe('faAnimateEnter', function () {
              isolate.$$animateEnterHandler = $parse(attrs.faAnimateEnter);
            });
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faAnimateHalt
 * @module famous.angular
 * @restrict EA
 * @description Will execute the passed function/expression when an ngAnimate event on the given element is halted before finishing.
 * Useful when you want to manage clean-up (e.g. Transitionable `.halt()`ing).
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-halt="cleanupFunction()">
 * </fa-view>
 * ```
 */


angular.module('famous.angular')
  .directive('faAnimateHalt', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);

            attrs.$observe('faAnimateHalt', function () {
              isolate.$$animateHaltHandler = $parse(attrs.faAnimateHalt);
            });
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faAnimateLeave
 * @module famous.angular
 * @restrict EA
 * @description Attaches the passed function/expression to Angular ngAnimate "leave" events on the given element.
 * Useful when you want to manage animations in Famo.us that are tied into Angular's data-driven events, e.g. on directives like ng-repeat, ui-view, and ng-if.
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-leave="myAnimationFunction($done)">
 * </fa-view>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimateLeave', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateLeaveHandler = $parse(attrs.faAnimateLeave);

            attrs.$observe('faAnimateLeave', function () {
              isolate.$$animateLeaveHandler = $parse(attrs.faAnimateLeave);
            });
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faAnimateMove
 * @module famous.angular
 * @restrict EA
 * @description Attaches the passed function/expression to Angular ngAnimate "move" events on the given element.
 * Useful when you want to manage animations in Famo.us that are tied into Angular's data-driven events, e.g. on directives like ng-repeat, ui-view, and ng-if.
 * 
 * @usage
 * ```html
 * <fa-view ng-repeat="view in views" fa-animate-move="myAnimationFunction($done)">
 * </fa-view>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimateMove', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);

            attrs.$observe('faAnimateMove', function () {
              isolate.$$animateMoveHandler = $parse(attrs.faAnimateMove);
            });
          }
        };
      }
    };
  }]);
/**
 * @ngdoc directive
 * @name faAnimation
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is deprecated.  Prefer using the $timeline service.  This directive is used to animate an element in conjunction with an {@link animate animate} directive
 * @deprecated true
 * @usage
 * ```html
 * <fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 *  <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
 * </fa-animation>
 * ```
 * @example
 * ### Animating with Transitionables
 * 
 * The most flexible way to animate modifier properties is by creating a Transitionable object on the scope and binding the property in the html.
 * Any changes to the Transitionable object on the scope will be reflected in the view immediately via Angular's two-way data binding.
 *
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * var Easing = $famous['famous/transitions/Easing'];
 * 
 * $scope.boxTransitionable = new Transitionable([0, 0, 0]);
 * 
 * $scope.animate = function() {
 *   $scope.boxTransitionable.set([200, 300, 0], {duration: 2000, curve: Easing.inOutBack});
 * };
 * ```
 * ```html
 * <fa-modifier fa-size="[100, 100]" fa-translate="boxTransitionable.get()">
 *   <fa-surface fa-background-color="'red'" fa-click="animate()">
 *   </fa-surface>
 * </fa-modifier>
 * ```
 * In the html, `fa-translate` is passed `boxTransitionable.get()`, a function expression that will return a value of [0,0,0] initially.
 * All transitionables have a `.get()` method that returns the interpolated state of the transition at the current time of invocation, returning either a number/array or an object.
 * 
 * This means that during this transition, calls to `.get()` provide the interpolated state along the way, perhaps [100, 150], [150, 185], and so on, until it reaches [200, 300].
 * 
 * When the user clicks the `fa-surface`, it will trigger the `animate()` function defined on the scope.  In turn, this calls the `.set()` method on the `boxTransitionable`,
 * which is passed the end state and a transition.
 * 
 * ### Passing Transitionables & values
 *
 * One may also choose to pass an array, with one or more of its values a function expression or a number.
 * ```html
 * <fa-modifier fa-size="[100, 100]" fa-translate="[yTrans.get(), 0, 0]" fa-touchstart="animate()">
 *       <fa-surface fa-background-color="'red'" fa-click="animateY()">
 *       </fa-surface>
 *     </fa-modifier>
 * ```
 * ```javascript
 * $scope.yTrans = new Transitionable(0);
 * 
 * $scope.animateY = function() {
 *   $scope.yTrans.set(200, {duration: 2000, curve: 'easeInOut'})
 * };
 * ```
 * In this example, `fa-translate` is passed an array, with the x value bound to a function expression that will return 0, and y & z values as 0's.
 * When `animateY()` is called, `yTrans` begins its transition, and its values are interpolated, updated on the view through Angular's two-way data binding.
 *
 * ### Transitionables & .get()
 *   A point of possible confusion is the fact that some modifier properties (`faOpacity`, `faSize`, `faOrigin`, `faAlign`) can be bound to a Transitionable object directly, without needing to be passed a `.get()` function expression, unlike the example above.
 *   In the example below, we create transitionable objects that will perform transitions on opacity (which accepts a Transitionable object directly) and translate (which does not accept a transitionable object directly). 
 *   
 *   The value of `fa-opacity` is bound to a Transitionable directly, `box.opacity`.
 *   Whereas `fa-translate` is bound to a method of a Transitionable, `box.translate.get()`, that returns an interpolated value.
 *   
 *   Clicking the fa-surface invokes `animateBox()` on the scope, in turn, executing the `.set()` methods of each prospective Transitionable from initial state to end state.
 *   
 * ```html
 * <fa-modifier fa-translate="box.translate.get()" fa-opacity="box.opacity" fa-size="[100, 100]">
 *     <fa-surface fa-click="animateBox()" fa-background-color="'red'"></fa-surface>
 *   </fa-modifier>
 * ```
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.box = {
 *     translate: new Transitionable([200,200,0]),
 *     opacity: new Transitionable(.3)
 *   };
 *    $scope.animateBox = function() {
 *     $scope.box.translate.set([0, 100, 0], {duration: 500, curve: 'easeInOut'});
 *     $scope.box.opacity.set(1, {duration: 500, curve: 'easeInOut'});
 *   };
 * ```
 * #### Why the difference?  
 *
 * `FaTranslate` (along with `faRotate`, `faTranslate`, `faScale`, `faSkew`, & more) pass through a Famous Transform function (`Transform.translate()`), whereas `faOpacity`, `faSize`, `faOrigin`, and `faAlign` are passed through a Famous Modifier.
 * 
 * A Famous `Transform.translate()` function does not accept a Transitionable object, but only an array.
 * A `.get()` function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a `faTranslate`, it can return an array that a `Transform.translate()` can accept.
 * 
 * `faOpacity` passes through a Famous Modifier, which has an `.opacityFrom()` method that can accept a Transitionable object directly.  
 * 
 * As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.
 * 
 * ### Callbacks at Transition completion
 * 
 * The `.set()` method of a Transitionable can accept 3 arguments: an endState, a transition, and an optional callback to be called upon observed completion of the transition.
 * In the example below, when the first transition completes, with the element translated to [200, 300, 0], the callback function is called, and the element begins the transition to [100, 100, 0]. 
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * 
 * $scope.boxTrans = new Transitionable([0, 0, 0]);
 * 
 * $scope.animateWithCallback = function() {
 *   $scope.boxTrans.set([200, 300, 0], {duration: 1000, curve: 'easeInOut'}, 
 *     function() {
 *       $scope.boxTrans.set([100, 100, 0], {duration: 1000, curve: 'easeInOut'});
 *     }
 *   );
 * };
 * ```
 * ```html
 * <fa-modifier fa-size="[100, 100]" fa-translate="boxTrans.get()">
 *   <fa-surface fa-background-color="'red'" fa-click="animateWithCallback()">
 *   </fa-surface>
 * </fa-modifier>
 * ```
 * 
 * ### Nesting modifiers & animations
 * 
 * Famous Modifiers affect all renderable child nodes (Modifiers & Surfaces) below them on the Render Tree.
 * In this example, two properties will be animated: the outermost Modifier's `fa-scale` property and innermost Modifier's `fa-rotate-Z` property.
 * 
 * Because Famous Modifiers affect all child nodes nested within them, when the outermost Modifier's scale property changes, it affects the scale of every modifier and surface below it.
 * The innermost Modifier with the `fa-rotate-Z` property affects the innermost surface only.  
 * 
 * ```html
 * <fa-modifier fa-scale="boxes.outer.scale.get()">
 *   <fa-modifier fa-size="[100, 100]">
 *     <fa-surface fa-background-color="'red'"></fa-surface>
 *     <fa-modifier fa-size="[50, 50]" fa-origin="[.5, .5]" fa-rotate-z="boxes.inner.rotateZ.get()">
 *       <fa-surface fa-background-color="'blue'" fa-click="animateBoxes()"></fa-surface>
 *     </fa-modifier>
 *   </fa-modifier> 
 * </fa-modifier>
 * ```
 * 
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.boxes = {
 *   outer: {
 *     scale: new Transitionable([2, 2])
 *   },
 *   inner: {
 *     rotateZ: new Transitionable(0)
 *   }
 * };
 * 
 * $scope.animateBoxes = function() {
 *   $scope.boxes.outer.scale.set([1, 1], {duration: 2000, curve: 'easeInOut'});
 *   $scope.boxes.inner.rotateZ.set(.8, {duration: 1000, curve: 'easeInOut'});
 * };
 * ```
 * 
 * ### $famous.find()
 *
 * `$famous.find()` is a method that can be used to perform a DOM look-up to retrieve the Famous isolate (node) of the appropriate object.
 * It accepts one argument, a string css selector (e.g. an #id or a .class,) and returns an array of elements matching the query.
 * 
 * It is useful for manipulation of Famous objects after they have been declared in the DOM.
 * With Angular, it is best to do DOM manipulation (including look-ups) in a directive's post-link function; Famous-Angular is no exception.
 * 
 * ```html
 * <fa-modifier id="myBox">
 *   <fa-surface></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * var myBox = $famous.find('#myBox'); // [Object]
 * // myBox[0] is the isolate object belonging to the modifier of id 'myBox' in the DOM.
 * // myBox[0].modifier is a reference to the Famo.us modifier corresponding to that element.
 * ```
 * If this is done outside of a directive's post-link function, there is no guarantee that `$famous.find()` will return anything, because the element may not have compiled yet.
 * 
 * ##Animating with directives
 * Below is an example of a custom directive called `fade-in` used to animate an element by transitioning its opacity from the values of `fa-opacity` to `opacity-end`, with the duration of `duration`.  Note: `opacity-end` and `duration` are NOT Famous-Angular attributes; they are custom to this particular example.
 * 
 * ```html
 * <fa-modifier fade-in fa-opacity="0.2" opacity-end="1" duration="500">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * .directive('fadeIn', 
 *   ['$famous', '$famousDecorator', '$timeout', 
 *   function ($famous, $famousDecorator, $timeout) {
 *   return {
 *     restrict: 'A',
 *     scope: false,
 *     priority: 16,
 *     compile: function(tElement, tAttrs, transclude) {
 *       var Transitionable = $famous['famous/transitions/Transitionable'];
 *       return {
 *         pre: function(scope, element, attrs) {
 *         },
 *         post: function(scope, element, attrs) {
 *           $famousDecorator.ensureIsolate(scope)
 *       
 *           $timeout(function() {
 *             var opacityStartValue = attrs.faOpacity;
 *             var opacityEndValue = attrs.opacityEnd;
 *             var duration = attrs.duration;
 *
 *             var opacityTransitionable = new Transitionable(opacityStartValue);
 *
 *             scope.isolate[scope.$id].modifier.opacityFrom(function() {
 *               return opacityTransitionable.get();
 *             });
 *
 *             opacityTransitionable.set(opacityEndValue, {duration: duration, curve: 'easeInOut'});
 *           });
 *       
 *         }
 *       }
 *     }
 *   }
 * }]);
 * ```
 *   
 * In the compile function, load up the AMD module for a Famous Transitionable, which will be used for the animation.  
 * 
 * The `fade-in` directive's priority is 16, higher than the priority of an `fa-modifier` (4) to ensure that the `fa-modifier` will be compiled first.  Therefore the post-link function of `fade-in` allows access to the `scope` of `fa-modifier`.  
 * 
 * `$famousDecorator.ensureIsolate(scope)` checks the passed in scope for an existing isolate;  if `scope.isolate` does not exist, it creates one.
 * 
 * Below, the rest of the directive is wrapped in a $timeout function to ensure that the animation will call on the next Famous engine tick.
 * 
 * `opacityStartValue`, `opacityEndValue`, and `duration` are convenience variables that access the `fa-opacity`, `opacity-end`, and `duration` attributes from the html.
 * 
 * A transitionable called `OpacityTransitionable` is instantiated with `startOpacity` (value of 0.2 in this example).
 * 
 * `scope.isolate` is a reference to the Famous-Angular `isolate` object that stores properties available to each particular Famous-Angular element.  The `isolate` object may look like this: {004: {Context Object} 005: {Modifier Object} 006: {Surface Object}}.
 * 
 * A particular element's "isolate" is accessed from the isolate object by key, with the unique $id property of the element, like so: `scope.isolate[scope.$id]`.  (The `fa-modifier`'s unique `$id` property might be 005, for example)  
 * 
 * Accessing the reference of the Famous Modifier that corresponds to the element, (`scope.isolate[scope.$id].modifier`), use the `.opacityFrom()` method (available to Famous Modifiers), and pass it a callback function that will return `opacityTransitionable.get()`.  In this particular example, we passed the value of `opacityStartValue (0.2)` into the constructor of opacityTransitionable earlier.  Therefore, at this point, `opacityTransitionable.get()` will return `0.2`.
 * 
 * The transition begins when `opacityTransitionable.set()` is called, which passes in the `opacityEndValue` and a transition object.
 *  
 */


angular.module('famous.angular')
  .directive('faAnimation', ['$famous', '$famousDecorator', function ($famous, famousDecorator) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function (tElement, tAttrs, transclude) {
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];
        return {
          pre: function (scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);
          },
          post: function (scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            setTimeout(function () {
              isolate.timeline = scope.$eval(attrs.timeline);
              isolate._trans = new Transitionable(0);

              isolate.play = function (callback) {
                var transition = {
                  duration: scope.$eval(attrs.duration),
                  curve: scope.$eval(attrs.curve) || 'linear'
                };
                isolate._trans.set(1, transition, function () {
                  if (callback){
                    callback();
                  }
                  if (attrs.loop) {
                    //Famo.us silently breaks its transitionable if this runs in
                    //the same execution context.  Maybe a suppressed SO error somewhere?
                    setTimeout(function () {
                      isolate.replay(callback);
                    }, 0);
                  }
                });
                //TODO:  handle $animate with a callback
              };
              isolate.reset = function () {
                isolate._trans.set(0);
              };
              isolate.replay = function (callback) {
                isolate.reset();
                isolate.play(callback);
              };

              //disengage is a function that
              //can unassign the event listener
              var _disengage = null;
              if (attrs.event) {
                if (_disengage){
                  _disengage();
                }
                _disengage = scope.$on(attrs.event, function (evt, data) {
                  var callback = data && data.callback ? data.callback : undefined;
                  isolate.replay(callback);
                });
              }

              var id = attrs.id;

              if (isolate.timeline === undefined) {
                isolate.timeline = isolate._trans.get.bind(isolate._trans);
                if (attrs.autoplay){
                  isolate.play();
                }
              }
              if (!isolate.timeline instanceof Function){
                throw new Error('timeline must be a reference to a function or duration must be provided');
              }


              /**
               * @ngdoc directive
               * @name animate
               * @module famous.angular
               * @restrict E
               * @deprecated true
               * @description
               * This directive is deprecated.  Prefer using the $timeline service.  This element is used to specify the animation of an element in a {@link faAnimation faAnimation} directive
               *
               * @usage
               * ```html
               * <fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
               *  <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
               * </fa-animation>
               * ```
               */

              var animates = element[0].querySelectorAll('animate');
              var declarations = {};

              for (var i = 0; i < animates.length; i++) {
                (function () {
                  var animate = animates[i];

                  //DOM selector string that points to our mod of interest
                  if (animate.attributes.targetmodselector) {
                    //dig out the reference to our modifier
                    //TODO:  support passing a direct reference to a modifier
                    //       instead of performing a DOM lookup
                    var modElements = angular.element(element[0].parentNode)[0].querySelectorAll(animate.attributes.targetmodselector.value);


                    angular.forEach(modElements, function (modElement) {
                      var modScope = angular.element(modElement).scope();
                      var modifier = modScope.isolate[modScope.$id].modifier;
                      var getTransform = modScope.isolate[modScope.$id].getTransform;

                      //TODO:  won't need to special-case curve type 'linear'
                      //       once/if it exists in Easing.js
                      var curve =
                        animate.attributes.curve &&
                          animate.attributes.curve.value !== 'linear'
                          ? Easing[animate.attributes.curve.value]
                          : function (j) {
                          return j;
                        }; //linear

                      //assign the modifier functions
                      if (animate.attributes.field) {
                        var field = animate.attributes.field.value;

                        var lowerBound =
                          animate.attributes.timelinelowerbound
                            ? parseFloat(animate.attributes.timelinelowerbound.value)
                            : 0;

                        var upperBound =
                          animate.attributes.timelineupperbound
                            ? parseFloat(animate.attributes.timelineupperbound.value)
                            : 1;

                        if (!animate.attributes.startvalue){
                          throw new Error('you must provide a start value for the animation');
                        }

                        var startValue = scope.$eval(animate.attributes.startvalue.value);

                        if (!animate.attributes.endvalue){
                          throw new Error('you must provide an end value for the animation');
                        }

                        var endValue = scope.$eval(animate.attributes.endValue.value);

                        //Keep arrays of all declarations so that transformFunctions
                        //can handle all of the appropriate segments

                        var modDecs =
                          declarations[modScope.$id] =
                            declarations[modScope.$id] || {};
                        var segments = modDecs[field] = modDecs[field] || [];
                        segments.push({
                          field: field,
                          lowerBound: lowerBound,
                          upperBound: upperBound,
                          startValue: startValue,
                          endValue: endValue,
                          curve: curve
                        });

                        //Keep modDecs[field] sorted
                        segments.sort(function (a, b) {
                          return a.lowerBound - b.lowerBound;
                        });

                        //Check domain overlap:
                        //after sorting by lowerBounds, if any segment's lower bound
                        //is lower than the lower bound of any item before it, domains are
                        //overlapping
                        for (var j = 1; j < segments.length; j++) {
                          var lower = segments[j].lowerBound;
                          for (var k = 0; k < j; k++) {
                            if (lower < segments[k].upperBound) {
                              throw new Error("Animate segments have overlapping" +
                                "domains for the same field (" + field + ")." + 
                                "At any point in the timeline, only one <animate>" +
                                "can affect a given field on the same modifier.");
                            }
                          }
                        }


                        //Domain:  timeline function bounded [0,1]
                        //Subdomains (between pipes):  specified subdomains of timeline segments
                        //Range:  output value, determined by interpolating startValue and
                        //        endValue through the easing curves.
                        //     |          |                       |          |
                        //     |          |                       |          |
                        //     |          |                       |          |
                        //     |          |                       |          |           
                        //     |  (ease)  |                       |  (ease)  |
                        //     |        -/|-----------------------|-\        |
                        //     |      -/  |                       |  -\      |
                        //     |    -/    |                       |    -\    |
                        //     |  -/      |                       |      -\  |
                        // ----|-/        |                       |        -\|-------
                        //     |          |                       |          |
                        //_____|__________|_______________________|__________|_______
                        //     |x(0,0)    |x(0,1)                 |x(1,0)    |x(1,1)

                        //TODO:  in order to support nested fa-animation directives,
                        //       this function needs to be exposed somehow. (pass a reference into the directive;
                        //       and then assign this function to that reference?)
                        //TODO:  if needed:  make this more efficient.  This is a hot-running
                        //       function and we should be able to optimize.
                        var transformFunction = function () {
                          var x = isolate.timeline() || 0;
                          var relevantIndex = 0;
                          var relevantSegment = segments[relevantIndex];

                          for (var j = 0; j < segments.length; j++) {
                            //this is the relevant segment if x is in the subdomain
                            if (x >= segments[j].lowerBound && x <= segments[j].upperBound) {
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if it is the last one
                            if (j === segments.length - 1) {
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if x is greater than its upper
                            //bound but less than the next segment's lower bound
                            if (x >= segments[j].upperBound && x < segments[j + 1].lowerBound) {
                              relevantSegment = segments[j];
                              break;
                            }
                          }

                          if (x <= relevantSegment.lowerBound){
                            return relevantSegment.startValue;
                          }
                          if (x >= relevantSegment.upperBound){
                            return relevantSegment.endValue;
                          }

                          //normalize our domain to [0, 1]
                          var subDomain = (relevantSegment.upperBound - relevantSegment.lowerBound);
                          var normalizedX = (x - relevantSegment.lowerBound) / subDomain;

                          //Support interpolating multiple values, e.g. for a Scale array [x,y,z]
                          if (Array.isArray(relevantSegment.startValue)) {
                            var ret = [];
                            for (var k = 0; k < relevantSegment.startValue.length; k++) {
                              ret.push(
                                relevantSegment.startValue[k] + relevantSegment.curve(normalizedX)
                                  *
                                  (relevantSegment.endValue[k] - relevantSegment.startValue[k])
                              );
                            }
                            return ret;
                          } else {
                            return relevantSegment.startValue
                              + relevantSegment.curve(normalizedX)
                              * (relevantSegment.endValue
                              - relevantSegment.startValue);
                          }
                        };

                        var transformComponents = modDecs.transformComponents = modDecs.transformComponents || [];

                        if (field === 'opacity') {
                          modifier.opacityFrom(function () {
                            return transformFunction();
                          });
                        } else if (field === 'origin') {
                          modifier.originFrom(function () {
                            return transformFunction();
                          });
                        } else if (field === 'size') {
                          modifier.sizeFrom(function () {
                            return transformFunction();
                          });
                        } else { //transform field
                          transformComponents.push({
                            field: field,
                            fn: transformFunction
                          });

                          modifier.transformFrom(function () {
                            var usedFields = {};
                            var mult = getTransform && getTransform() ? [getTransform()] : [];
                            for (var j = 0; j < transformComponents.length; j++) {
                              ((function () {
                                var f = transformComponents[j].field;
                                if (!usedFields[f]) {
                                  var transVal = transformComponents[j].fn();

                                  if (Array.isArray(transVal)){
                                    mult.push(Transform[f].apply(this, transVal));
                                  }
                                  else{
                                    mult.push(Transform[f](transVal));
                                  }
                                  usedFields[f] = true;
                                }
                              })());
                            }

                            //Transform.multiply fails on arrays of <=1 matricies
                            if (mult.length === 1){
                              return mult[0];
                            }
                            else{
                              return Transform.multiply.apply(this, mult);
                            }
                          });
                        }
                      }
                    });
                  }

                })();

              }
            }, 1);//end setTimeout
          }

        };

      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faApp
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is the container and entry point to Famo.us/Angular.  Behind the scenes,
 * it creates a Famous context and then adds child elements
 * to that context as they get compiled.  Inside of this directive,
 * normal HTML content will not get rendered to the screen unless
 * it is inside of a {@link faSurface fa-surface} directive.
 *
 * @usage
 * ```html
 * <fa-app ng-controller="MyCtrl">
 *   <!-- other fa- scene graph components -->
 * </fa-app>
 * ```
 * @example
 * `Fa-app` creates a Famous Context, the root of the Render Tree.  Renderables (such as `fa-modifier`'s & `fa-surface`'s) nested within an `fa-app` are added to this root context.  
 *
 * Declaring `fa-app` appends a div with the class of `"famous-angular-container"` to the DOM.  It then instantiates a Context via Famous' Engine `.createContext()` method, passing in a reference to the `famous-angular-container` div, resulting in a Famous context that renderables can be added to connected to Angular.  `Fa-app` can be declared as an element or as an attribute within another element.  
 *
<example module="faAppExampleApp">
 <file name="index.html">
  <fa-app>
    <fa-modifier>
      <fa-surface>This will be shown on screen.</fa-surface>
    </fa-modifier>
    <div>This will not appear on screen because it is not inside an fa-surface.</div>
  </fa-app>
 </file>
 <file name="style.css">
 fa-app {
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
   }
 </file>
 <file name="script.js">
 angular.module('faAppExampleApp', ['famous.angular']);
 </file>
</example>
 * ## Common Qustions
 * ### Multiple fa-app's
 * Nesting an `fa-app` within another `fa-app` is possible, and the use case of this approach would be for css content overflow.
 *
 * In the example below, there is an `fa-surface` with an `fa-app` nested inside.  Normally, an `fa-surface` should not nest another Famous element within it because it is a leaf node that has the purpose of being a container for html content.  The exception is nesting an `fa-app` within an `fa-surface`, which creates another Famous context, in which Famous elements can be nested inside.
 * 
 <example module="faAppExampleAppA">
  <file name="index.html">
  <fa-app style="width: 500px; height: 500px;">
      <fa-surface>
        <fa-app style="width: 200px; height: 200px; overflow: hidden;">
          <fa-image-surface 
             fa-image-url="https://famo.us/assets/images/famous_logo_white.svg" 
             fa-size="[400, 400]">
          </fa-image-surface>
        </fa-app>
      </fa-surface>
    </fa-app>
  </file>
  <file name="style.css">
  fa-app {
      background-color: #000;  
    }
  </file>
  <file name="script.js">
  angular.module('faAppExampleAppA', ['famous.angular']);
  </file>
 </example>
 * The outer `fa-app` is sized 500x500, and it contains all of the content.  The use case of this `fa-app` within another `fa-app` is to clip content using the css overflow:hidden property.  The `fa-image-surface` links to a 400x400 sized image of the Famous logo.  Its parent is the nested `fa-app`, whose size is only 200x200.  
 * 
 * The larger image content (400x400) will overflow the boundaries of its parent, the the nested `fa-app` (200x200).  Because `fa-app` has a css overflow:hidden property, it will clip the content of any of its children that is outside the 200x200 region.  Any part of the 400x400 image that reaches outside of these boundaries are ignored.  This may be useful for complex animations.  
 *  
 * Take note: declaring multiple `fa-app`s within a page is permitted, but each new one incurs a penalty for performance.  `fa-app` is similar to a Famo.us ContainerSurface, in that it creates an additional Context that the Famo.us Engine must manage.  
 * 
 * ### Fa-app must be declared with a height & width
 * The element `fa-app` is declared within must have a set height and width styling, declared inline or as a css declaration in an external stylesheet.
 * ```html
 * <fa-app style="width: 320px; height: 568px;">
 *    <!-- other fa- scene graph components -->
 * </fa-app>
 * ```
 * If `fa-app` is declared as an attribute of another element, that element must be a `display:block` element, such as a `div` or `p`.
 * ```html
 * <div fa-app style="width: 320px; height: 568px;">
 *   <!-- other fa- scene graph components -->
 * </div>
 * ```
 */

angular.module('famous.angular')
  .directive('faApp', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div style="display: none;"><div></div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function (tElement, tAttrs, transclude) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var View = $famous['famous/core/View'];
            var Engine = $famous['famous/core/Engine'];
            var Transform = $famous['famous/core/Transform'];

            element.append('<div class="famous-angular-clipping-container"><div class="famous-angular-container"></div></div>');
            isolate.context = Engine.createContext(element[0].querySelector('.famous-angular-container'));
            window.context = isolate.context;
            var _updatePerspective = function(){
              var val = parseInt(attrs.faPerspective);
              if(val) isolate.context.setPerspective(val);
            };

            attrs.$observe('faPerspective', _updatePerspective);
            _updatePerspective();

            function AppView() {
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            var getOrValue = function (x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function (data) {
              var transforms = [];
              if (data.mod().translate && data.mod().translate.length) {
                var values = data.mod().translate.map(getOrValue);
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope.faRotateZ) {
                transforms.push(Transform.rotateZ(scope.faRotateZ));
              }
              if (scope.faSkew) {
                transforms.push(Transform.skew(0, 0, scope.faSkew));
              }
              return Transform.multiply.apply(this, transforms);
            };

            isolate.view = new AppView();
            isolate.context.add(isolate.view);

            //HACK:  Since Famo.us Engine doesn't yet
            //support unregistering contexts, this will keep
            //the context from getting updated by the engine
            scope.$on('$destroy', function () {
              isolate.context.update = angular.noop;
            });

            scope.$on('registerChild', function (evt, data) {
              isolate.view.add(data.renderNode);
              evt.stopPropagation();
            });
          },
          post: function (scope, element, attrs) {

            var isolate = $famousDecorator.ensureIsolate(scope);
            transclude(scope, function (clone) {
              angular.element(element[0].querySelectorAll('div div')[0]).append(clone);
            });
            isolate.readyToRender = true;
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faCanvasSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faSize  -  Array that passes width and height to the canvas
 * @description
 * This directive creates a Famo.us CanvasSurface.
 * @usage
 * ```html
 * <fa-canvas-surface fa-size="[400,400]">
 * </fa-canvas-surface>
 * ```
 @example
 * To use `fa-canvas-surface`, declare an `fa-size` attribute with an array containing width and height.
 * ```html
 * <fa-canvas-surface
 *            fa-size="[400,400]"
 *            class="main-canvas"
 *            >
 * </fa-canvas-surface>
 * ```
 * `Fa-canvas-surface` accepts classes and faSize, the only two attributes HTML5 canvas requires is width and height.
 */
angular.module('famous.angular')
  .directive('faCanvasSurface', ['$famous', '$famousDecorator', '$interpolate', '$controller', '$compile', function ($famous, $famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<canvas class="fa-canvas-surface"></canvas>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var CanvasSurface = $famous['famous/surfaces/CanvasSurface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            isolate.renderNode = new CanvasSurface({
              size: scope.$eval(attrs.faSize)
            });
            
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
            
            // Throw an exception if anyother famous scene graph element is added on fa-surface.            
            $famousDecorator.sequenceWith(scope, function(data) {
              throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
            });
                        
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function() {
	            isolate.renderNode.setContent(element[0].querySelector('canvas.fa-canvas-surface'));
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('canvas.fa-canvas-surface')).append(clone);
            });

            //TODO:  on this and all other render-node-wrapping fa-directives,
            //       expose an actual RenderNode in isolate.renderNode and
            //       use that RenderNode's .set() function to add/remove content
            //       from the scene graph.  This will probably be instead of
            //       using RenderControllers.
            $famousDecorator.registerChild(scope, element, isolate, function() {
              // TODO: hook into RenderController and hide this render node
            });
                     
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faClick
 * @module famous.angular
 * @restrict A
 * @param {expression} faClick {@link https://docs.angularjs.org/guide/expression Expression} to evaluate upon
 * click. ({@link https://docs.angularjs.org/guide/expression#-event- Event object is available as `$event`})
 * @deprecated true
 * @description
 * This directive allows you to specify custom behavior when an element is clicked.
 *
 * @usage
 * ```html
 * <ANY fa-click="expression">
 *
 * </ANY>
 * ```
 * @example
 * ### Fa-click on an fa-surface
 * `Fa-click` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `fa-click` is bound to that `fa-surface`'s click eventHandler, and when the `fa-surface` is clicked, the function expression will be called. 
 *
 * ```html
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface fa-click="myClickHandler($event)" fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * $scope.myClickHandler = function($event) {
 *   console.log("click");
 *   console.log($event);
 * };
 * ```
 * ### Fa-click on an fa-view
 * `Fa-click` may be used on an `fa-view`.  The function expression bound to `fa-click` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `click` event, it will call the function expression bound to `fa-click`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a click event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-click` defines a callback function in which to handle click events, and when it receives a click event, it calls `myClickHandler()`. 
 * ```html
 * <fa-view fa-click="myClickHandler($event)" fa-pipe-from="myEvents">
 *   <fa-modifier fa-size="[100, 100]">
 *     <fa-surface fa-pipe-to="myEvents"
 *                 fa-background-color="'orange'">
 *     </fa-surface>
 *   </fa-modifier>
 * </fa-view>
 * ```
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.myEvents = new EventHandler();
 * 
 * $scope.myClickHandler = function($event) {
 *   console.log($event);
 *   console.log("fa-view receives the click event from the fa-surface, and calls myClickHandler defined on fa-click");
 * };
 * ```
 */
angular.module('famous.angular')
  .directive('faClick', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faClick) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);
              renderNode.on("click", function (data) {
                var fn = $parse(attrs.faClick);
                fn(scope, {$event: data});
                if (!scope.$$phase){
                  scope.$apply();
                }
              });
            }
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faContainerSurface
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us ContainerSurface containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us ContainerSurface's
 * constructor.  See [https://famo.us/docs/surfaces/ContainerSurface]
 *
 * @usage
 * ```html
 * <fa-container-surface fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-container-surface>
 * ```
 */

angular.module('famous.angular')
  .directive('faContainerSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ContainerSurface = $famous["famous/surfaces/ContainerSurface"];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ContainerSurface(options);
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                isolate.renderNode.add(data.renderGate);
              }
            );
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faDraggable
 * @module famous.angular
 * @restrict EA
 * @description fa-draggable Applies a Famo.us Draggable Modifier to its children, making them
 * respond to touch and mouse dragging
*/

angular.module('famous.angular')
  .directive('faDraggable', ["$famous", "$famousDecorator", "$parse", "$rootScope", function ($famous, $famousDecorator, $parse, $rootScope) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 2,
      scope: true,
      compile: function (tElement, tAttrs, transclude) {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var RenderNode = $famous['famous/core/RenderNode'];
            var Draggable = $famous['famous/modifiers/Draggable'];


            var options = scope.$eval(attrs.faOptions) || {};
            //watch options and update when changed
            scope.$watch(function(){
              return scope.$eval(attrs.faOptions);
            }, function(newVal, oldVal){
              newVal = newVal || {};
              isolate.modifier.setOptions(newVal);
            }, true);

            //TODO:  support activating and deactivating, possibly by hooking into ngDisabled

            isolate.modifier = new Draggable(options);

            isolate.renderNode = new RenderNode().add(isolate.modifier);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
            });

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate, function() {
              // When the actual element is destroyed by Angular,
              // "hide" the Draggable by deactivating it.
              isolate.modifier.deactivate();
            });

            // Trigger a $digest loop to make sure that callbacks for the
            // $observe listeners are executed in the compilation phase.
            if(!scope.$$phase && !$rootScope.$$phase) scope.$apply();
          }
        };
      }
    };
  }]);

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

      compile: function(tElement, tAttrs, transclude){
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

/**
 * @ngdoc directive
 * @name faFlexibleLayout
 * @module famous.angular
 * @restrict E
 * @description
 * This directive will create a Famo.us FlexibleLayout that
 * sequences from children passed in the provided `options` object,
 * which passes directly through to the Famo.us FlexibleLayout's
 * constructor. See [https://famo.us/docs/views/FlexibleLayout]
 *
 * @usage
 * ```html
 * <fa-flexible-layout fa-options="scopeOptionsObject">
 * </fa-flexible-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faFlexibleLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var FlexibleLayout = $famous["famous/views/FlexibleLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];
            var RenderNode = $famous['famous/core/RenderNode'];


            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};

            isolate.renderNode = new FlexibleLayout(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var updateFlexibleLayout = function () {
              _children.sort(function (a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function (_children) {
                var _ch = [];
                angular.forEach(_children, function (c, i) {
                  _ch[i] = c.renderGate;
                });
                return _ch;
              }(_children));
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateFlexibleLayout();
              },
              function(childScopeId) {
                _children = function (_children) {
                  var _ch = [];
                  angular.forEach(_children, function (c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateFlexibleLayout();
              }
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faFlipper
 * @module famous.angular
 * @requires famous
 * @restrict EA
 * @description
 * This directive will create a Famo.us Flipper containing the
 * specified front and back elements. The provided `options` object
 * will pass directly through to the Famo.us Flipper's
 * constructor.  See [https://famo.us/docs/views/Flipper]
 *
 * @usage
 * ```html
 * <fa-flipper fa-options="scopeOptionsObject">
 *   <!-- two render nodes -->
 * </fa-flipper>
 * ```
 *@example
 * A Famous Flipper has a `.flip()` method that toggles a rotation between front and back sides.
 * In the example below, when an `fa-surface` is clicked, it calls the function `flipIt`.
 *
 * This function attempts a DOM lookup for an isolate of an `fa-flipper` element, and calls the `.flip()` function of `fa-flipper`.
 *
 <example module="faFlipperExampleApp">
  <file name="index.html">
  <fa-app ng-controller="FlipperCtrl">
      <fa-flipper>
        <fa-modifier fa-size="[200, 200]">
          <fa-surface fa-background-color="'yellow'" fa-click="flipIt()">Click me to see me flip!</fa-surface>
        </fa-modifier>  
        <fa-modifier fa-size="[200, 200]">
          <fa-surface fa-background-color="'red'" fa-click="flipIt()">Flip me again!</fa-surface>
        </fa-modifier>  
      </fa-flipper>
    </fa-app>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    div {
      cursor: pointer;
      padding: 8px 8px;
    }
  </file>
  <file name="script.js">
  angular.module('faFlipperExampleApp', ['famous.angular'])
      .controller('FlipperCtrl', ['$scope', '$famous', function($scope, $famous) {
        $scope.flipIt = function() {
           $famous.find('fa-flipper')[0].flip();
        };
    }]);
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faFlipper', ["$famous", "$famousDecorator",
    function ($famous, $famousDecorator) {
      return {
        template: '<div></div>',
        restrict: 'E',
        transclude: true,
        scope: true,
        compile: function (tElem, tAttrs, transclude) {
          return {
            pre: function (scope, element, attrs) {
              var isolate = $famousDecorator.ensureIsolate(scope);
              var Flipper = $famous["famous/views/Flipper"];


              //TODO:  $watch and update, or $parse and attr.$observe
              var options = scope.$eval(attrs.faOptions) || {};
              isolate.renderNode = new Flipper(options);
              $famousDecorator.addRole('renderable',isolate);
              isolate.show();
           
              isolate.children = [];

              isolate.flip = function (overrideOptions) {
                isolate.renderNode.flip(overrideOptions || scope.$eval(attrs.faOptions));
              };

              $famousDecorator.sequenceWith(
                scope,
                function(data) {
                  //TODO:  support fa-index + sorting children instead of just a stack
                  var _childCount = isolate.children.length;
                  if (_childCount === 0) {
                    isolate.renderNode.setFront(data.renderGate);
                  } else if (_childCount === 1) {
                    isolate.renderNode.setBack(data.renderGate);
                  } else {
                    throw new Error('fa-flipper accepts only two child elements; more than two have been provided');
                  }

                  isolate.children.push(data.renderGate);
                },
                function(childScopeId) {
                  //TODO:  support fa-index + sorting children and removing
                  //       the child at the proper index instead of just popping off a stack

                  //Since children should handle hiding themselves, all we need to do is
                  //update our children array
                  isolate.children.splice(isolate.children.length - 1, 1);
                }
              );
            },
            post: function (scope, element, attrs) {
              var isolate = $famousDecorator.ensureIsolate(scope);
              transclude(scope, function (clone) {
                element.find('div').append(clone);
              });
              $famousDecorator.registerChild(scope, element, isolate);
            }
          };
        }
      };
    }
  ]);
/**
 * @ngdoc directive
 * @name faGridLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us GridLayout containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us GridLayout's
 * constructor.  See [https://famo.us/docs/views/GridLayout]
 *
 * @usage
 * ```html
 * <fa-grid-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-grid-layout>
 * ```
 * @example
 * A Famous Grid Layout divides a context into evenly-sized grid cells.  Pass an option such as `dimension` by binding an object with the property to `fa-options`.
 *
 * In the example below, `fa-options` references `myGridLayoutOptions` on the scope.  The dimensions property has a value of `[2,2]` which specifies the columns and rows.  `fa-size` is specified as `[100, 100]` on the fa-modifier, so each `fa-surface` will have these dimensions.
 *
 <example module="faGridExampleApp">
  <file name="index.html">
  <fa-app ng-controller="GridCtrl">
    <fa-grid-layout fa-options="myGridLayoutOptions">
       <fa-modifier ng-repeat="grid in grids"
                    fa-size="[100, 100]">
         <fa-surface fa-background-color="grid.bgColor"></fa-surface>
       </fa-modifier>
    </fa-grid-layout>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faGridExampleApp', ['famous.angular'])
      .controller('GridCtrl', ['$scope', function($scope) {

        $scope.myGridLayoutOptions = {
           dimensions: [2,2], // specifies number of columns and rows
        };

        $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

    }]);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>

 * If `fa-size` is not specified, as in this example below, the fa-surface's will collectively fill the height and width of its parent modifier/context.
 *
 <example module="faGridExampleAppA">
  <file name="index.html">
  <fa-app ng-controller="GridCtrlA">
      <fa-grid-layout fa-options="myGridLayoutOptions">
         <fa-surface ng-repeat="grid in grids" fa-background-color="grid.bgColor"></fa-surface>
      </fa-grid-layout>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faGridExampleAppA', ['famous.angular'])
      .controller('GridCtrlA', ['$scope', function($scope) {

        $scope.myGridLayoutOptions = {
           dimensions: [2,2], // specifies number of columns and rows
        };

        $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

    }]);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faGridLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        return  {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var GridLayout = $famous["famous/views/GridLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new GridLayout(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var updateGridLayout = function () {
              scope.$$postDigest(function(){
                _children.sort(function (a, b) {
                  return a.index - b.index;
                });
                isolate.renderNode.sequenceFrom(function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c, i) {
                    _ch[i] = c.renderGate;
                  });
                  return _ch;
                }(_children));
              });
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateGridLayout();
              },
              function(childScopeId) {
                _children = function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateGridLayout();
              },
              updateGridLayout
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faHeaderFooterLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us HeaderFooterLayout containing
 * a Header, Content, and Footer based on the order of its child elements.
 *  See [https://famo.us/docs/views/HeaderFooterLayout]
 *
 * @usage
 * ```html
 * <fa-header-footer-layout>
 *   <!-- header rendernode -->
 *   <!-- content rendernode -->
 *   <!-- footer rendernode -->
 * </fa-header-footer-layout>
 * ```
 * @example
 * `fa-header-footer` is a View that arranges three renderables into a header and footer area with defined sizes, and a content area that fills up the remaining space.
 *
 * To use it, declare it in the html and nest 3 renderables inside.  In the example below, there are three direct children elements: a Modifier (with an `fa-surface` nested inside), a Surface, and another Modifier (with an `fa-surface` nested inside).  The order that they are declared in the html determines whether each corresponds to a header, content, and footer.
 *
 * Since the header and footer Modifiers have fixed heights of `[undefined, 75]` (fill the parent container horizontally, 75 pixels vertically), the content will fill the remaining height of the parent modifier or context.
 *
 <example module="faHeaderFooterExampleApp">
  <file name="index.html">
  <fa-app>

      <fa-header-footer-layout fa-options="{headerSize: 75, footerSize: 75}">

        <!-- header -->
        <fa-surface fa-background-color="'red'">Header</fa-surface>
      
        <!-- content -->
        <fa-surface fa-background-color="'blue'">Content</fa-surface>
      
        <!-- footer -->
        <fa-surface fa-background-color="'green'">Footer</fa-surface>

      </fa-header-footer-layout>

    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faHeaderFooterExampleApp', ['famous.angular'])
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 * 
 * Famo.us' `HeaderFooterLayout` defaults to a vertical orientation.
 * Specify a direction in the fa-options object to obtain a horizontal orientation.
 * 
 <example module="faHeaderFooterExampleAppA">
  <file name="index.html">
  <fa-app>

      <fa-header-footer-layout fa-options="{direction: 0, headerSize: 75, footerSize: 75}">

        <!-- header -->
        <fa-surface fa-background-color="'red'">Header</fa-surface>
      
        <!-- content -->
        <fa-surface fa-background-color="'blue'">Content</fa-surface>
      
        <!-- footer -->
        <fa-surface fa-background-color="'green'">Footer</fa-surface>

      </fa-header-footer-layout>

    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faHeaderFooterExampleAppA', ['famous.angular'])
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 * ## ng-repeat inside a fa-header-footer
 *
 * `Fa-header-footer` works with ng-repeat'ed renderables:
 *
 <example module="faHeaderFooterExampleAppB">
  <file name="index.html">
  <fa-app ng-controller="HeaderFooterCtrlB">
      <fa-header-footer-layout>
        <fa-modifier ng-repeat="view in views" fa-size="view.size">
          <fa-surface fa-background-color="view.bgColor">
            {{view.text}}
          </fa-surface>
        </fa-modifier>
      </fa-header-footer-layout>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faHeaderFooterExampleAppB', ['famous.angular'])
      .controller('HeaderFooterCtrlB', ['$scope', function($scope) {
        $scope.views = [
          {bgColor: "red", text: "header", size: [undefined, 100]},
          {bgColor: "green", text: "content", size: [undefined, undefined]},
          {bgColor: "blue", text: "footer", size: [undefined, 100]}
        ];
    }]);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>

 * In the example above, 3 renderables are generated through an ng-repeat.  The header and footer `Modifier`s generated by the ng-repeat have defined sizes of `[undefined, 100]` (they will fill their parent container horizontally, and be 100 pixels vertically).  The content has a size of `[undefined, undefined]`, and it will fill the remaining heght and width of its container.
 *
 * Note:
 * 
 * - If more than 3 renderables are nested inside an `fa-header-footer-layout`, it will throw an error: `fa-header-footer-layout can accept no more than 3 children.`
 * - Furthermore, in the basic example we used the `fa-options` attribute to specify the size of the header and footer. Here we do not use modifiers on the surfaces within the header fotter layout to achieve a similar effect. Note that this approach does not work as well with vertical orientations.
 * 
 *
 */

angular.module('famous.angular')
  .directive('faHeaderFooterLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        var HeaderFooterLayout = $famous["famous/views/HeaderFooterLayout"];
        var RenderNode = $famous["famous/core/RenderNode"];
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var _header = new RenderNode();
            var _content = new RenderNode();
            var _footer = new RenderNode();

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new HeaderFooterLayout(options);
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var _numberOfChildren = 0;

            $famousDecorator.sequenceWith(
              scope,
              function addChild(data) {
                _numberOfChildren++;

                //TODO:  investigate using header.set, content.set etc instead
                //       of header.add [for consistency with child removal]
                if (_numberOfChildren === 1) {
                  isolate.renderNode.header.add(data.renderGate);
                } else if (_numberOfChildren === 2){
                  isolate.renderNode.content.add(data.renderGate);
                } else if (_numberOfChildren === 3){
                  isolate.renderNode.footer.add(data.renderGate);
                } else {
                  throw new Error('fa-header-footer-layout can accept no more than 3 children');
                }
              },
              function removeChild(childScopeId) {
                if (_numberOfChildren === 1) {
                  isolate.renderNode.header.set({});
                } else if (_numberOfChildren === 2){
                  isolate.renderNode.content.set({});
                } else if (_numberOfChildren === 3){
                  isolate.renderNode.footer.set({});
                }
                _numberOfChildren--;
              }
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faImageSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faImageUrl  -  String url pointing to the image that should be loaded into the Famo.us ImageSurface
 * @description
 * This directive creates a Famo.us ImageSurface and loads
 * the specified ImageUrl.
 * @usage
 * ```html
 * <fa-image-surface fa-image-url="img/my-image.png">
 * </fa-image-surface>
 * ```
 @example
 * To use `fa-image-surface`, declare an `fa-image-url` attribute with a string url.
 <example module="faImageSurfExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-image-surface
                 fa-image-url="http://famo.us/integrations/angular/img/famous-angular-logos.png"
                 class="img"
                 fa-color="'blue'"
                 fa-background-color="'#fff'"
                 fa-size="[500, 200]">
      </fa-image-surface>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faImageSurfExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>

 * `Fa-image-surface` accepts two css-style properties: `color` and `background color`, which may be assigned values by the `fa-color` and `fa-background-color` attributes respectively.
 *
 * `Fa-size` may also be declared as an attribute.  If void, the `fa-image-surface` will inherit the size of its parent node.
 */

angular.module('famous.angular')
  .directive('faImageSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function (tElem, tAttrs, transclude) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ImageSurface = $famous['famous/surfaces/ImageSurface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function () {
                return isolate.getProperties();
              },
              function () {
                if (isolate.renderNode) {
                  isolate.renderNode.setProperties(isolate.getProperties());
                }
              },
              true
            );

            //TODO:  duplicate of fa-surface's _propToFaProp function.
            //       Refactor into a util object/service?
            var _propToFaProp = function (prop) {
              return "fa" + prop.charAt(0).toUpperCase() + prop.slice(1);
            };

            isolate.getProperties = function () {
              var baseProperties = scope.$eval(attrs.faProperties) || {};
              var properties = [
                "backgroundColor",
                "color"
              ];
              for (var i = 0; i < properties.length; i++) {
                var prop = properties[i];
                var faProp = _propToFaProp(prop);
                if (attrs[faProp]) {
                  baseProperties[prop] = scope.$eval(attrs[faProp]);
                }
              }
              return baseProperties;
            };

            isolate.renderNode = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });
            
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function () {
              isolate.renderNode.setContent(attrs.faImageUrl);
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faIndex
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is used to specify the rendering order of elements
 * inside of a ViewSequence-based component, such as @link faScrollView faScrollView}
 * or @link faGridLayout faGridLayout}.  As a special case, when elements are added to
 * these controls using ng-repeat, they are automatically assigned the
 * $index property exposed by ng-repeat.  When adding elements manually
 * (e.g. to a faScrollView but not using ng-repeat) or in a case where custom
 * order is desired, then the index value must be assigned/overridden using the faIndex directive.
 * @usage
 * ```html
 * <fa-scroll-view>
 *  <fa-surface fa-index="0">Surface 1</fa-surface>
 *  <fa-surface fa-index="1">Surface 2</fa-surface>
 * </fa-scroll-view>
 * ```
 *
 * @example
 * `Fa-index` determines the order of which the surfaces appear in the sequential view.
 * In this example below, a Scroll View is created with two nested `fa-view`'s, both of which have an `fa-index` of 0 and 1, respectively.
 *
 * If `fa-index` is declared explicitly, it will override any default order of `fa-view`'s declared in html.
 * If `fa-views` are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
 * The `fa-view` with the blue background color appears after the one with the red background because its `fa-index` is set to 1.
 *
 * `fa-scroll-view` accepts another directive called `fa-start-index` as an attribute, which determines which `fa-view` the Scroll View displays by default.
 * `Fa-start-index` will not affect the sequential order of the layout; the `fa-view` with the red background will be layed out first, followed by the one with the blue background.
 *  By setting `fa-start-index` to 1, the Scroll View will display the View with the index of 1, which is the View with the blue background color. 
 *
 <example module="faIndexExampleApp">
  <file name="index.html">
  <fa-app ng-controller="IndexCtrl"> 

     <!-- The scroll View will start at the index of 1 -->
      <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollView" fa-start-index="1">

        <!-- Even though this view is declared first in html, it will will be layed out 2nd -->
        <!-- On page load, the scroll View will scroll to this view, and display it.  -->

         <fa-view fa-index="1">
            <fa-modifier fa-size="[320, 320]">
               <fa-surface fa-pipe-to="eventHandler" 
                           fa-background-color="'blue'">
                           <p>Scroll me back!</p>
               </fa-surface>
            </fa-modifier>
         </fa-view>
    
         <fa-view fa-index="0">
            <fa-modifier fa-size="[320, 320]">
               <fa-surface fa-pipe-to="eventHandler" 
                           fa-background-color="'red'">
                           <p>Scroll me!</p>
               </fa-surface>
            </fa-modifier>
         </fa-view>
    
      </fa-scroll-view>   
    </fa-app>   
  </file>
  <file name="script.js">
  angular.module('faIndexExampleApp', ['famous.angular'])
      .controller('IndexCtrl', ['$scope', '$famous', function($scope, $famous) {

       var EventHandler = $famous['famous/core/EventHandler'];
       $scope.eventHandler = new EventHandler();
       $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
      
       $scope.options = {
         scrollView: {
           direction: 0 // displays the fa-views horizontally
         }
       };

    }]);
  </file>
  <file name="style.css">
  fa-app {
      width: 320px;
      height: 320px;
      overflow: hidden;
    }
    p {
      padding: 8px 8px;
    }
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faIndex', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope, element);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function () {
              return scope.$eval(attrs.faIndex);
            }, function () {
              isolate.index = scope.$eval(attrs.faIndex);
              if(isolate.updateMethod) isolate.updateMethod();
            });
          }
        };
      }
    };
  }]);
'use strict';
/**
 * @ngdoc directive
 * @name ngClick
 * @module famous.angular
 * @restrict A
 * @requires famous.angular
 *
 * @description
 * This is a wrapped for the default ngClick which allows you to specify custom behavior when an fa-surface is clicked.
 * the wrapper is also designed to be be used on touchscreen devices. It matches all the features supported by ngClick,
 * including ngTouch module for all types of fa-surface.
 *
 * If ngTouch is requried to add touch click capabilites in non F/A elements. Add ngTouch dependence before adding famous.angular otherwise
 * this functionality will be lost.
 *
 * @usage
 * ```html
 * <ANY ng-click="expression">
 *
 * </ANY>
 * ```
 * @example
 <example module="faInputExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ClickCtrl" id="app">
      <fa-modifier fa-size="[300, 100]">
        <fa-surface fa-background-color="'red'" ng-click="myClickHandler($event)">Click Me!  This has been clicked {{clicked}} times.</fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="style.css">
  #app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    fa-surface {
      cursor: pointer;
    }
  </file>
  <file name="script.js">
  angular.module('faInputExampleApp', ['famous.angular'])
      .controller('ClickCtrl', ['$scope', function($scope) {
        $scope.clicked = 0;
        $scope.myClickHandler = function($event) {
          console.log($event);
          $scope.clicked++;
        };
    }]);
  </file>
 </example>
 * ### ng-click on an fa-surface
 * `ng-click` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `ng-click` is bound to that `fa-surface`'s click eventHandler, and when the `fa-surface` is clicked, the function expression will be called.
**/
angular.module('famous.angular')
.config(['$provide', function  ($provide) {

  $provide.decorator('ngClickDirective', ['$delegate', '$famousDecorator', '$parse', '$rootElement', '$famous', '$timeout', function ($delegate, $famousDecorator, $parse, $rootElement, $famous, $timeout) {
    var directive = $delegate[0];

    var compile = directive.compile;

    var TAP_DURATION = 750; // Shorter than 750ms is a tap, longer is a taphold or drag.
    var MOVE_TOLERANCE = 12; // 12px seems to work in most mobile browsers.
    var PREVENT_DURATION = 2500; // 2.5 seconds maximum from preventGhostClick call to click
    var CLICKBUSTER_THRESHOLD = 25; // 25 pixels in any dimension is the limit for busting clicks.

    var ACTIVE_CLASS_NAME = 'ng-click-active';
    var lastPreventedTime;
    var touchCoordinates;
    var lastLabelClickCoordinates;

    var Engine = $famous['famous/core/Engine'];

    // Checks if the coordinates are close enough to be within the region.
    function hit(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
    }

    // Checks a list of allowable regions against a click location.
    // Returns true if the click should be allowed.
    // Splices out the allowable region from the list after it has been used.
    function checkAllowableRegions(touchCoordinates, x, y) {
      for (var i = 0; i < touchCoordinates.length; i += 2) {
        if (hit(touchCoordinates[i], touchCoordinates[i+1], x, y)) {
          touchCoordinates.splice(i, i + 2);
          return true; // allowable region
        }
      }
      return false; // No allowable region; bust it.
    }

    // Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
    // was called recently.
    function onClick(event) {
      if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
        return; // Too old.
      }

      var touches = event.touches && event.touches.length ? event.touches : [event];
      var x = touches[0].clientX;
      var y = touches[0].clientY;


      // Look for an allowable region containing this click.
      // If we find one, that means it was created by touchstart and not removed by
      // preventGhostClick, so we don't bust it.
      if (checkAllowableRegions(touchCoordinates, x, y)) {
        return;
      }

      // If we didn't find an allowable region, bust the click.
      event.stopPropagation();
      event.preventDefault();

      // Blur focused form elements
      if(event.target) {
        event.target.blur();
      }
    }


    // Global touchstart handler that creates an allowable region for a click event.
    // This allowable region can be removed by preventGhostClick if we want to bust it.
    function onTouchStart(event) {
      var touches = event.touches && event.touches.length ? event.touches : [event];
      var x = touches[0].clientX;
      var y = touches[0].clientY;
      touchCoordinates.push(x, y);

      $timeout(function() {
        // Remove the allowable region.
        for (var i = 0; i < touchCoordinates.length; i += 2) {
          if (touchCoordinates[i] === x && touchCoordinates[i+1] === y) {
            touchCoordinates.splice(i, i + 2);
            return;
          }
        }
      }, PREVENT_DURATION, false);
    }

    // On the first call, attaches some event handlers. Then whenever it gets called, it creates a
    // zone around the touchstart where clicks will get busted.
    function preventGhostClick(x, y) {
      if (!touchCoordinates) {
        $rootElement[0].addEventListener('click', onClick, true);
        $rootElement[0].addEventListener('touchstart', onTouchStart, true);
        touchCoordinates = [];
      }

      lastPreventedTime = Date.now();

      checkAllowableRegions(touchCoordinates, x, y);
    }

    directive.compile = function(element , attrs, transclude) {
      if($famous.util.isFaElement(element)) {
        if($famous.util.isASurface(element)) {
          return {
            post: function(scope, element, attr) {
              var clickHandler = $parse(attr.ngClick),
                  tapping = false,
                  tapElement,  // Used to blur the element after a tap.
                  startTime,   // Used to check if the tap was held too long.
                  touchStartX,
                  touchStartY;
              var isolate = $famous.getIsolate(scope);
              var renderNode = isolate.renderNode;

              function resetState() {
                tapping = false;

                // TODO: renderNode.

                renderNode.removeClass(ACTIVE_CLASS_NAME);
              }

              renderNode.on('touchstart', function(event) {
                tapping = true;
                tapElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
                // Hack for Safari, which can target text nodes instead of containers.
                if(tapElement.nodeType === 3) {
                  tapElement = tapElement.parentNode;
                }

                renderNode.addClass(ACTIVE_CLASS_NAME);

                startTime = Date.now();

                var touches = event.touches && event.touches.length ? event.touches : [event];
                var e = touches[0].originalEvent || touches[0];
                touchStartX = e.clientX;
                touchStartY = e.clientY;
              });

              renderNode.on('touchmove', function(event) {
                resetState();
              });

              renderNode.on('touchcancel', function(event) {
                resetState();
              });

              renderNode.on('touchend', function(event) {
                var diff = Date.now() - startTime;

                var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches :
                    ((event.touches && event.touches.length) ? event.touches : [event]);
                var e = touches[0].originalEvent || touches[0];
                var x = e.clientX;
                var y = e.clientY;
                var dist = Math.sqrt( Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2) );

                if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
                  // Call preventGhostClick so the clickbuster will catch the corresponding click.
                  preventGhostClick(x, y);

                  if (!angular.isDefined(attr.disabled) || attr.disabled === 'false') {
                    renderNode.emit('click', [event]);
                  }
                }

                resetState();
              });

              renderNode.on('click', function(event, touchend) {
                scope.$apply(function() {
                  clickHandler(scope, {$event: (touchend || event)});
                });
              });

              renderNode.on('mousedown', function(event) {
                renderNode.addClass(ACTIVE_CLASS_NAME);
              });

              renderNode.on('mousemove mouseup', function(event) {
                renderNode.removeClass(ACTIVE_CLASS_NAME);
              });

            }
          };
        }
      }else {
        return compile(element, attrs, transclude);
      }
    };
    return $delegate;
  }]);



  angular.forEach(
  'dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '),
  function(name) {
    var directiveName = window.$famousUtil.directiveNormalize('ng-' + name) ;

    $provide.decorator(directiveName+'Directive', ['$delegate', '$famousDecorator', '$parse', '$famous', function ($delegate, $famousDecorator, $parse, $famous) {
        var directive = $delegate[0];

        var compile = directive.compile;
        directive.compile = function(element , attrs, transclude) {
          if($famous.util.isFaElement(element)) {
            return {

              post: function (scope, element, attrs) {
                var isolate = $famousDecorator.ensureIsolate(scope);

                if (attrs[directiveName]) {
                  var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

                  renderNode.on(name, function (data) {
                    var fn = $parse(attrs[directiveName]);
                    fn(scope, {$event: data});
                    if (!scope.$$phase){
                      scope.$apply();
                    }
                  });
                }
              }
            };
          }else {

            return compile(element , attrs, transclude);
          }
        };
      return $delegate;
    }]);
  });
}]);

/**
 * @ngdoc directive
 * @name ngDblclick
 *
 * @description
 * This wrapped on `ngDblclick` directive allows you to specify custom behavior on a dblclick event on a fa-surface .
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngDblclick {@link guide/expression Expression} to evaluate upon
 * a dblclick. (The Event object is available as `$event`)
 *
 * @usage
 * ```html
 * <ANY ng-dblclick="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-dblclick="count = count + 1" ng-init="count=0">
        Increment (on double click), count: {{count}}
      </fa-surface>
     </file>
     <file name="style.css">
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      fa-surface {
        cursor: pointer;
      }
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMousedown
 *
 * @description
 * The ngMousedown directive allows you to specify custom behavior on mousedown event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousedown {@link guide/expression Expression} to evaluate upon
 * mousedown. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mousedown="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mousedown="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (on mouse down), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseup
 *
 * @description
 * Specify custom behavior on mouseup event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseup {@link guide/expression Expression} to evaluate upon
 * mouseup. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseup="expression">
 *
 * </ANY>
 * ```
 * @example
  <example>
     <file name="index.html">
      <fa-surface ng-mouseup="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (on mouse up), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */

/**
 * @ngdoc directive
 * @name ngMouseover
 *
 * @description
 * Specify custom behavior on mouseover event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseover {@link guide/expression Expression} to evaluate upon
 * mouseover. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseover="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseover="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse is over), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseenter
 *
 * @description
 * Specify custom behavior on mouseenter event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseenter {@link guide/expression Expression} to evaluate upon
 * mouseenter. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseenter="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseenter="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse enters), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseleave
 *
 * @description
 * Specify custom behavior on mouseleave event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseleave {@link guide/expression Expression} to evaluate upon
 * mouseleave. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseleave="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseleave="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse leaves), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMousemove
 *
 * @description
 * Specify custom behavior on mousemove event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousemove {@link guide/expression Expression} to evaluate upon
 * mousemove. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mousemove="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mousemove="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse moves), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeydown
 *
 * @description
 * Specify custom behavior on keydown event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeydown {@link guide/expression Expression} to evaluate upon
 * keydown. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keydown="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keydown="count = count + 1" ng-init="count=0">
        key down count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeyup
 *
 * @description
 * Specify custom behavior on keyup event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeyup {@link guide/expression Expression} to evaluate upon
 * keyup. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keyup="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keyup="count = count + 1" ng-init="count=0">
        key up count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeypress
 *
 * @description
 * Specify custom behavior on keypress event on a fa-surface.
 *
 * @element ANY
 * @param {expression} ngKeypress {@link guide/expression Expression} to evaluate upon
 * keypress. ({@link guide/expression#-event- Event object is available as `$event`}
 * and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keypress="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keypress="count = count + 1" ng-init="count=0">
        key press count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngSubmit
 *
 * @description
 * Enables binding angular expressions to onsubmit events on a fa-surface.
 *
 * Additionally it prevents the default action (which for form means sending the request to the
 * server and reloading the current page), but only if the form does not contain `action`,
 * `data-action`, or `x-action` attributes.
 *
 * <div class="alert alert-warning">
 * **Warning:** Be careful not to cause "double-submission" by using both the `ngClick` and
 * `ngSubmit` handlers together. See the
 * {@link form#submitting-a-form-and-preventing-the-default-action `form` directive documentation}
 * for a detailed discussion of when `ngSubmit` may be triggered.
 * </div>
 *
 * @element form
 * @priority 0
 * @param {expression} ngSubmit {@link guide/expression Expression} to eval.
 * ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-submit="expression">
 *
 * </ANY>
 * ```
 * @example
   <example module="submitExample">
   </example>
 */

/**
 * @ngdoc directive
 * @name ngFocus
 *
 * @description
 * Specify custom behavior on focus event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngFocus {@link guide/expression Expression} to evaluate upon
 * focus. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-focus="expression">
 *
 * </ANY>
 * ```
 * @example
 * See {@link ngClick ngClick}
 */

/**
 * @ngdoc directive
 * @name ngBlur
 *
 * @description
 * Specify custom behavior on blur event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngBlur {@link guide/expression Expression} to evaluate upon
 * blur. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-blur="expression">
 *
 * </ANY>
 * ```
 * @example
 */

/**
 * @ngdoc directive
 * @name ngCopy
 *
 * @description
 * Specify custom behavior on copy event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCopy {@link guide/expression Expression} to evaluate upon
 * copy. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-copy="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>

   </example>
 */

/**
 * @ngdoc directive
 * @name ngCut
 *
 * @description
 * Specify custom behavior on cut event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCut {@link guide/expression Expression} to evaluate upon
 * cut. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-cut="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>

   </example>
 */

/**
 * @ngdoc directive
 * @name ngPaste
 *
 * @description
 * Specify custom behavior on paste event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngPaste {@link guide/expression Expression} to evaluate upon
 * paste. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-paste="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
   </example>
 */

/**
 * @ngdoc directive
 * @name faModifier
 * @module famous.angular
 * @restrict EA
 * @param {Array|Function|Particle} faRotate  -  Array of numbers or function returning an array of numbers to which this Modifier's rotate should be bound.
 * @param {Number|Function|Particle} faRotateX  -  Number or function returning a number to which this Modifier's rotateX should be bound
 * @param {Number|Function|Particle} faRotateY  -  Number or function returning a number to which this Modifier's rotateY should be bound
 * @param {Number|Function|Particle} faRotateZ  -  Number or function returning a number to which this Modifier's rotateZ should be bound
 * @param {Array|Function|Particle} faScale  -  Array of numbers or function returning an array of numbers to which this Modifier's scale should be bound
 * @param {Array|Function|Particle} faSkew  -  Array of numbers or function returning an array of numbers to which this Modifier's skew should be bound
 * @param {Array|Function|Particle} faAboutOrigin  -  Array of arguments (or a function returning an array of arguments) to pass to Transform.aboutOrigin
 * @param {Number|Function|Particle} faPerspective  -  Number or array returning a number to which this modifier's perspective (focusZ) should be bound.
 * @param {Transform} faTransform - Manually created Famo.us Transform object (an array) that can be passed to the modifier.  *Will override all other transform attributes.*
 * @param {Number|Function|Transitionable|Particle} faOpacity  -  Number or function returning a number to which this Modifier's opacity should be bound
 * @param {Array|Function|Transitionable|Particle} faSize  -  Array of numbers (e.g. [100, 500] for the x- and y-sizes) or function returning an array of numbers to which this Modifier's size should be bound
 * @param {Array|Function|Transitionable|Particle} faOrigin  -  Array of numbers (e.g. [.5, 0] for the x- and y-origins) or function returning an array of numbers to which this Modifier's origin should be bound
 * @param {Array|Function|Transitionable|Particle} faAlign  -  Array of numbers (e.g. [.5, 0] for the x- and y-aligns) or function returning an array of numbers to which this Modifier's align should be bound
 * @param {Array.String} faTransformOrder  -  Optional array of strings to specify which transforms to apply and in which order. (e.g. `fa-transform-order="['rotateZ', 'translate', 'scale']"`)  Default behavior is to evaluate all supported transforms and apply them in alphabetical order.
 * @description
 * This directive creates a Famo.us Modifier that will affect all children render nodes.  Its properties can be bound
 * to values (e.g. `fa-translate="[15, 20, 1]"`, Famo.us Transitionable objects, or to functions that return numbers.
 * @usage
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-opacity=".25" fa-skew="myScopeSkewVariable"
                   fa-translate="[25, 50, 2]" 
                   fa-scale="myScopeFunctionThatReturnsAnArray">
        <!-- Child elements of this fa-modifier will be affected by the values above -->
        <fa-surface>I'm translucent, skewed, and translated</fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faModifierExampleApp', ['famous.angular'])
      .controller('ModifierCtrl', ['$scope', function($scope) {

        $scope.myScopeSkewVariable = [0,0,.3];

        $scope.myScopeFunctionThatReturnsAnArray = function() {
          return [1.5, 1.5];
        };
    }]);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * @example
 * ## Values that fa-modifier attributes accept
 * `Fa-modifier` properties, (such as `faRotate`, `faScale`, etc) can be bound to number/arrays, object properties defined on the scope, function references, or function expressions.
 * Some properties (`faOpacity`, `faSize`, `faOrigin`, `faAlign`) can be bound to a Transitionable object directly.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-origin="[.5,.5]" fa-size="[100, 100]" fa-rotate=".3">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faModifierExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Object properties on the scope
 *`Fa-modifier` properties can be bound to object properties defined on the scope.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <!-- These properties are bound to properties of $scope.boxObject in the contorller -->
      <fa-modifier fa-origin="boxObject.origin" fa-size="boxObject.size">
          <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', function($scope) {

            $scope.boxObject = {
               origin: [.4, .4],
               size: [50, 50]
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Function references
 * `Fa-modifier` properties can be bound to a function reference that returns a value.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-origin="genBoxOrigin" fa-size="[200, 200]">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', function($scope) {

            $scope.getX = function() {
              return .2;
            };
            $scope.getY = function() {
              return .3;
            }
            $scope.genBoxOrigin = function() {
              return [$scope.getX(), $scope.getY()];
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Function expressions
 * `Fa-modifier` properties can be bound to a function expression.  `boxTransitionable` is an instantiated `Transitionable` object with the value of `[0,0,0]`.
 * The `.get()` method is available to all `Transitionable` objects, and it returns an interpolated value of a transition at calltime.
 * When `fa-translate` calls `boxTransitionable.get()`, it returns `[100,50,0]`.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-size="[100, 100]" fa-translate="boxTransitionable.get()">
        <fa-surface fa-background-color="'red'" fa-click="animate()"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', '$famous', function($scope, $famous) {

            var Transitionable = $famous['famous/transitions/Transitionable'];

            $scope.boxTransitionable = new Transitionable([100, 50, 0]);

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Transitionables
 * Some properties (`faOpacity`, `faSize`, `faOrigin`, `faAlign`) can be bound to a `Transitionable` object directly.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-size="[100, 100]" fa-opacity="opacityTrans">
        <fa-surface fa-background-color="'orange'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', '$famous', function($scope, $famous) {

            var Transitionable = $famous['famous/transitions/Transitionable'];

            $scope.opacityTrans = new Transitionable(.25);

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Transitionable.get() vs Transitionable
 * `FaTranslate` (along with `faRotate`, `faTranslate`, `faScale`, `faSkew`, & more) pass through a Famous Transform function (`Transform.translate()`), whereas `faOpacity`, `faSize`, `faOrigin`, and `faAlign` are passed through a Famous Modifier.
 *
 * A Famous `Transform.translate()` function does not accept a Transitionable object, but only an array.
 * A `.get()` function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a `faTranslate`, it can return an array that a `Transform.translate()` can accept.
 *
 * `faOpacity` passes through a Famous Modifier, which has an `.opacityFrom()` method that can accept a Transitionable object directly, therefore a `.get()` method is not required.
 *
 * As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.
 *
 * ## Fa-transform
 * Whenever a "transform" https://famo.us/docs/0.2.0/core/Transform property is used on a `fa-modifier`, such as `fa-translate`, `fa-scale`, `fa-origin`, etc, their values are passed through a `Transform function` which returns a 16 element transform array.
 * `Fa-transform` can be used to directly pass a 16-element transform matrix to a `fa-modifier`.
 *
 * ### Values that fa-transform accepts
 * Passed as an array:
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier
          fa-transform="[1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1]"
          fa-size="[100, 100]">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faModifierExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * Passed as an object on the scope:
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-transform="matrix" fa-size="[50, 50]">
        <fa-surface fa-background-color="'green'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', function($scope) {

            $scope.matrix = [1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1];

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * Passed as a function reference that returns a 16-element matrix3d webkit array:
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-transform="variousTransforms" fa-size="[100, 100]">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', '$famous', function($scope, $famous) {

            var Transform = $famous['famous/core/Transform'];

            $scope.variousTransforms = function() {
              var translate = Transform.translate(100, 100, 0);
              var skew = Transform.skew(0, 0, 0.3);
              return Transform.multiply(translate, skew);
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * `Transform` is a Famo.us math object used to calculate transforms.  It has various methods, such as `translate`, `rotate`, and `skew` that returns a 16-element matrix array.  `Transform.multiply` multiplies two or more Transform matrix types to return a final Transform 16-element matrix array, and this is what is passed into `fa-transform`.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ModifierCtrl">
      <fa-modifier fa-transform="skewFunc"
                   fa-translate="[100, 100, 0]"
                   fa-size="[100, 100]">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faModifierExampleApp', ['famous.angular'])
          .controller('ModifierCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var Transform = $famous['famous/core/Transform'];

            $scope.skewFunc = function() {
              return Transform.skew(0, 0, 0.3);
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * The fa-surface will only be skewed; fa-translate will be overriden, and not translated 100 pixels right and down.
 *
 * ## Animate modifier properties and not surfaces
 * Famous surfaces are styled with position:absolute, and their positions are defined by matrix3d webkit transforms.
 * The role of Modifiers is to to hold onto size, transform, origin, and opacity states, and applying those layout and styling properties to its child nodes.
 * As in vanilla Famous, you should animate properties of modifiers, such as transform, opacity, etc, rather than animate properties on the surface itself, as modifiers are responsible for layout and visibility.
 * ```html
 *   <fa-modifier fa-rotate-z="boxA.rotate.get()">
 *     <fa-surface fa-click="animateBoxA()" fa-background-color="'red'"></fa-surface>
 *   </fa-modifier>
 * ```
 *
 * ## The order of transforms matter
 * ### Fa-Transform-order
 *
 * `Fa-transform-order` can be used to specify the order of transforms on a modifier.  In the first example below, the translate is applied first, translating the box over to the right, and then it is rotated around its origin.
 * In the second example, the rotation happens first, and then the translation is calculated in relation to the origin that has been rotated.
 *
 * If fa-transform-order is not specified and there are multiple transforms on a Modifier, they will be be transformed in alphabetical order of their properties (e.g. "r" in rotate comes before "t" in translate).
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-transform-order="['translate', 'rotateZ']"
                   fa-rotate-z="0.3"
                   fa-translate="[100, 0, 0]"
                   fa-size="[100, 100]">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
      
      <fa-modifier fa-transform-order="['rotateZ', 'translate']"
                   fa-rotate-z="0.3"
                   fa-translate="[100, 0, 0]"
                   fa-size="[100, 100]">
        <fa-surface fa-background-color="'blue'"></fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faModifierExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Nesting Modifiers
 * You can also specify the order of transforms by nesting Modifiers.  In the example below, each Modifier has one Transform property (e.g. translate, rotate, skew, scale, etc).  Each Famous modifier affects all child nodes below it on the Render Tree.
 *
 <example module="faModifierExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-translate="[100, 100]">
         <fa-modifier fa-rotate-z=".6" fa-size="[100, 100]">
           <fa-surface fa-background-color="'red'"></fa-surface>
         </fa-modifier>
      </fa-modifier>
      
       <fa-modifier fa-rotate-z=".6">
         <fa-modifier fa-translate="[100, 100]" fa-size="[100, 100]">
           <fa-surface fa-background-color="'blue'"></fa-surface>
         </fa-modifier>
       </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faModifierExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
*/

angular.module('famous.angular')
  .directive('faModifier', ["$famous", "$famousDecorator", "$parse", "$rootScope", function ($famous, $famousDecorator, $parse, $rootScope) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 2,
      scope: true,
      compile: function (tElement, tAttrs, transclude) {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var RenderNode = $famous['famous/core/RenderNode'];
            var Modifier = $famous['famous/core/Modifier'];
            var Transform = $famous['famous/core/Transform'];
            var Particle = $famous['famous/physics/bodies/Particle'];

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            var _unwrapParticle = function(part){
              return part.getPosition();
            };

            var _transformFields = [
              "aboutOrigin",
              "perspective",
              "rotate",
              "rotateAxis",
              "rotateX",
              "rotateY",
              "rotateZ",
              "scale",
              "skew",
              "translate"
            ];

            attrs.$observe('faTransformOrder', function () {
              var candidate = scope.$eval(attrs.faTransformOrder);
              if(candidate !== undefined) _transformFields = candidate;
            });

            var _parsedTransforms = {};
            angular.forEach(_transformFields, function (field) {
              var attrName = $famous.util.directiveNormalize('fa-' + field);
              attrs.$observe(attrName, function () {
                _parsedTransforms[field] = $parse(attrs[attrName]);
              });
            });


            var _transformFn = angular.noop;
            attrs.$observe('faTransform', function () {
              _transformFn = $parse(attrs.faTransform);
            });
            isolate.getTransform = function () {
              //if faTransform is provided, return it
              //instead of looping through the other transforms.
              var override = _transformFn(scope);
              if(override !== undefined){
                if(override instanceof Function) return override();
                else if(override instanceof Object && override.get !== undefined) return override.get();
                else return override;
              }

              var transforms = [];
              angular.forEach(_transformFields, function (field) {
                var candidate = _parsedTransforms[field] ? _parsedTransforms[field](scope) : undefined;
                if (candidate !== undefined) {
                  //TODO:feat Support Transitionables
                  if(candidate instanceof Function) candidate = candidate();
                  if(candidate instanceof Array) transforms.push(Transform[field].apply(this, candidate));
                  else if(candidate instanceof Particle) transforms.push(Transform[field].apply(this, _unwrapParticle(candidate)));
                  else transforms.push(Transform[field].call(this, candidate));
                }
              });

              if(!transforms.length) return undefined;
              else if (transforms.length === 1) return transforms[0];
              else return Transform.multiply.apply(this, transforms);
            };

            var _alignFn = angular.noop;
            attrs.$observe('faAlign', function () {
              _alignFn = $parse(attrs.faAlign);
            });
            isolate.getAlign = function () {
              var ret = _alignFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else if(ret instanceof Particle) return _unwrapParticle(ret);
              else return ret;
            };

            var _opacityFn = angular.noop;
            attrs.$observe('faOpacity', function () {
              _opacityFn = $parse(attrs.faOpacity);
            });
            isolate.getOpacity = function () {
              var ret = _opacityFn(scope);
              if(ret === undefined) return 1;
              else if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else if(ret instanceof Particle) return _unwrapParticle(ret);
              else return ret;
            };

            var _sizeFn = angular.noop;
            attrs.$observe('faSize', function () {
              _sizeFn = $parse(attrs.faSize);
            });
            isolate.getSize = function () {
              var ret = _sizeFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else if(ret instanceof Particle) return _unwrapParticle(ret);
              else return ret;
            };

            var _originFn = angular.noop;
            attrs.$observe('faOrigin', function () {
              _originFn = $parse(attrs.faOrigin);
            });
            isolate.getOrigin = function () {
              var ret = _originFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else if(ret instanceof Particle) return _unwrapParticle(ret);
              else return ret;
            };

            isolate.modifier = new Modifier({
              transform: isolate.getTransform,
              size: isolate.getSize,
              opacity: isolate.getOpacity,
              origin: isolate.getOrigin,
              align: isolate.getAlign
            });

            isolate.renderNode = new RenderNode().add(isolate.modifier);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
            });

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate, function() {
              // When the actual element is destroyed by Angular,
              // "hide" the Modifier by setting its opacity to 0.
              isolate.modifier.setOpacity(0);
            });

            // Trigger a $digest loop to make sure that callbacks for the
            // $observe listeners are executed in the compilation phase.
            if(!scope.$$phase && !$rootScope.$$phase) scope.$apply();
          }
        };
      }
    };
  }]);

angular.module('famous.angular')
  .directive('faMouseover', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faMouseover) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("mouseover", function(data) {
                var fn = $parse(attrs.faMouseover);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        };
      }
    };
  }]);
/**
 * @ngdoc directive
 * @name faOptions
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is used to specify options for all famous directives
 * @usage
 * ```html
 *<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">
 *<fa-view>
 *<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>
 *</fa-view>
 *</fa-grid-layout>
 *```
 *
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandler = new EventHandler();
 * $scope.gridOptions = {dimensions: [2, 2]};
 *```
 */
angular.module('famous.angular')
    .directive('faOptions', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
        return {
            restrict: 'A',
            scope: false,
            priority: -16,
            compile: function () {
                return {
                    post: function (scope, element, attrs) {
                        var isolate = $famousDecorator.ensureIsolate(scope, element);
                        scope.$watch(function () {
                            return scope.$eval(attrs.faOptions);
                        }, function () {
                            isolate.renderNode.setOptions(scope.$eval(attrs.faOptions));
                        }, true);
                    }
                };
            }
        };
    }]);
/**
 * @ngdoc directive
 * @name faPipeFrom
 * @module famous.angular
 * @restrict A
 * @priority 16
 * @param {Object} EventHandler - Event handler target object
 * @description
 * This directive pipes a target event handler to an element's event handler.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-from="EventHandler">
 *   <!-- zero or more render nodes -->
 * </ANY>
 * ```
 * @example
 *
 * ##ScrollView example
 *
 * In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
 * To pass information between two unrelated views, or even between a nested View to its parent, use `fa-pipe-to` and `fa-pipe-from` to pipe and receive events.
 * 
 * In the example below, even though `fa-view`, `fa-modifier`, and `fa-surface` are all nested within an `fa-scroll-view`, all of these elements' events (such as touch or scroll) do not propagate upwards towards their parent.
 *
 * Note:  This example will not work.
 *
 * ```html
 * <!-- fa-scroll-view is not receiving any events from its children -->
 * <fa-scroll-view>
 *    <fa-view ng-repeat="view in views">
 *       <fa-modifier fa-size="[320, 320]">
 *        <!-- Events on fa-surface are not propagated upwards to its parents automatically -->
 *           <fa-surface fa-background-color="'blue'"></fa-surface>
 *         </fa-modifier>
 *    </fa-view>
 * </fa-scroll-view>
 *  ```
 * 
 * In the example below, events from the `fa-surface` are piped to `myEventHandler`, a source event handler, via `fa-pipe-to`. `Fa-scroll-view` receives events from `myEventHandler`, its target event handler, via `fa-pipe-from`. 
 * `myEventHandler` refers to an instantiated Famous EventHandler declared on the scope.  Using pipes allows events to propagate between `fa-surface`s and the `fa-scroll-view`.
 *
 *
 <example module="faPipeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="PipeCtrl">
      <!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them -->
      <fa-scroll-view fa-pipe-from="myEventHandler">
          <fa-view ng-repeat="view in views">
            <fa-modifier fa-size="[undefined, 160]">
            <!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler -->
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faPipeExampleApp', ['famous.angular'])
          .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];

            $scope.views = [{color: 'red'}, {color: 'blue'}, {color: 'green'}, {color: 'yellow'}, {color: 'orange'}];

            $scope.myEventHandler = new EventHandler();

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ##Event Handlers on the Controller
 * 
 * The example below is more in line with a "vanilla" Famous approach to event piping.  There are two Views, each with one Surface.  In the html, the second View has a`fa-pipe-from` bound to `eventHandlerB`.  
 * 
 * Two event handlers are instantiated on the controller.  `EventHandlerA` pipes to `eventHandlerB`, using: `eventHandlerA.pipe(eventHandlerB)`.
 *
 * If the fa-surface on the first View is clicked, it calls `surfaceClick()` via fa-click, which causes `eventHandlerA` to emit a custom event called `myEvent`.
 * Because `evenHandlerA` pipes to `eventHandlerB`, `eventHandlerB` receives `myEvent`.  
 * 
 * An event handler for `myEvent` is declared for `eventHandlerB` using an `.on()` method.  When eventHandlerB receives a `myEvent` event, the event is handled with a callback function that translates the `fa-surface` on the second view.
 * 
 * ```html
 * <fa-view>
 *   <fa-modifier fa-size="[100, 100]">
 *       <fa-surface fa-background-color="'blue'" fa-click="surfaceClick()"></fa-surface>
 *     </fa-modifier>
 * </fa-view>
 * <fa-view fa-pipe-from="eventHandlerB">
 *   <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
 *       <fa-surface fa-background-color="'red'"></fa-surface>
 *   </fa-modifier>
 * </fa-view>
 * ```
 * 
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandlerA = new EventHandler();
 * $scope.eventHandlerB = new EventHandler();
 * $scope.eventHandlerA.pipe($scope.eventHandlerB); 
 * // all events received by eventHandlerA wil be piped to eventHandlerB
 *
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.redTrans = new Transitionable([0, 0, 0]);
 *
 * // eventHandlerA emits 'myEvent' on click
 * $scope.surfaceClick = function() {
 *   $scope.eventHandlerA.emit('myEvent');
 * };
 *
 * // eventHandlerA pipes all events it receives to eventHandlerB
 * // This is an event handler defined on eventHandlerB for handling 'myEvent'
 * $scope.eventHandlerB.on('myEvent', function() {
 *   $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
 * });
 * ```
 *
 <example module="faPipeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="PipeCtrl">
      <fa-view>
        <fa-modifier fa-size="[100, 100]">
            <fa-surface class="blue-surface" fa-background-color="'blue'" fa-click="surfaceClick()">Click me!</fa-surface>
          </fa-modifier>
      </fa-view>
      <fa-view fa-pipe-from="eventHandlerB">
        <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
            <fa-surface fa-background-color="'red'"></fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faPipeExampleApp', ['famous.angular'])
          .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandlerA = new EventHandler();
            $scope.eventHandlerB = new EventHandler();
            $scope.eventHandlerA.pipe($scope.eventHandlerB); 
            // all events received by eventHandlerA wil be piped to eventHandlerB
            
            var Transitionable = $famous['famous/transitions/Transitionable'];
            $scope.redTrans = new Transitionable([0, 100, 0]);
            
            // eventHandlerA emits 'myEvent' on click
            $scope.surfaceClick = function() {
              $scope.eventHandlerA.emit('myEvent');
            };
            
            // eventHandlerA pipes all events it receives to eventHandlerB
            // This is an event handler defined on eventHandlerB for handling 'myEvent'
            $scope.eventHandlerB.on('myEvent', function() {
              $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
            });

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .blue-surface {
      cursor: pointer;
      color: #fff;
    }
  </file>
 </example> 
 *
 * ##Switching Pipes
 * 
 * Another feature of `fa-pipe-to` and `fa-pipe-from` is the ability to switch pipes.
 * 
 * Using fa-pipe-to & fa-pipe-from involves binding it to a reference of an event handler on the scope.
 * If the event handler bound to `fa-pipe-to/fa-pipe-from` changes, the directives unpipes from that event handler, and can pipe to another event handler.
 *
 * The Famous approach to events allows more flexibility than DOM events which are hierarchical.  The example below shows a case in which eventing to non-hierarchical eventing & switching pipes dynamically can allow more expressiveness with events than a hierarchical DOM event propagation model.
 * 
 * ### Example & Explanation
 * 
 * Touch events from a directional pad conditionally affect three different Scroll Views on a page.
 * Based on which checkboxes are checked, the scroll events on the directional pad will affect either Scroll View A, Scroll View B, or Scroll View C.
 * The pipes are databound using `fa-pipe-to` and `fa-pipe-from`, and they are swapped out using the controller.
 * 
 * There are two main `fa-view`s: the directional pad which contains a Scroll View (for input) & 3 checkboxes, and the other `fa-view` that contains 3 Scroll Views.
 * The Scroll View of the directional pad uses `fa-pipe-from` to pipe events from `mainPipe` to its Scroll View's event handler.
 * The surface within the directional pad uses `fa-pipe-to` to pipe `fa-surface` events to `mainPipe`.
 * 
 * In the second view containing 3 Scroll Views, each Scroll View pipes from `emptyPipe` by default, another instantiated EventHandler that has no events piped to it.  
 *  
 *
 * The directional pad has a list of input checkboxes created by an ng-repeated list from `$scope.inputList`.
 * If a checkbox is checked, it calls `checkBoxChange()`, passing the index of the object within the ng-repeat, the letter (such as `'A'`), and the model (such as `'checkBox.A'`) of the respective checkbox.
 * If the checkbox is checked, the model (`checkBox.A`) is assigned the value of "true", and if it is unchecked, it is assigned the value of "false".
 * 
 * In the controller, `$scope.checkBoxChange()` changes the value of the pipe of the respective Scroll View (A, B, or C) that corresponds to the checkBox.
 * If the checkbox is checked, it assigns the respective Scroll View (A, B, or C) to pipe from `$scope.mainPipe`, and if unchecked, it will continue to pipe from `$scope.emptyPipe`.
 * In short, the checkboxes act as switches to change piping events.
 *
<example module="faPipeExampleApp">
 <file name="index.html">
 <fa-app ng-controller="PipeCtrl">
     <!-- directional pad view -->
     <fa-view>
       <!-- scroll view used as a directional pad input, receives events from mainPipe-->
       <fa-scroll-view fa-pipe-from="mainPipe">
         <fa-modifier fa-translate="[0, 0, 15]" fa-size="[300, 50]">
           <fa-view>
             <fa-modifier>
               <!-- mousewheel events will be piped to mainPipe -->
               <fa-surface fa-background-color="'orange'" fa-pipe-to="mainPipe">
                 <div>Directional pad</div>
                   <span ng-repeat="input in inputList">
                     <label>{{input.letter}}</label>
                     <!-- checkboxes -->
                     <input type="checkbox"
                            ng-model="input.model" 
                            name="scrollPipeTo" 
                            ng-change="checkBoxChange($index, input.letter, input.model)"
                            ng-true-value="true"
                            ng-false-value="false">
                   </span>
               </fa-surface>
             </fa-modifier>
           </fa-view>
         </fa-modifier>
       </fa-scroll-view>
     </fa-view>
     
     <!-- view with 3 Scroll Views -->
     <fa-view>
       <!-- ng-repeat creating 3 different scroll Views -->
       <fa-modifier ng-repeat="view in scrollViews"
                    fa-translate="[100 * $index, 50, 0]">
         <fa-view>
           <!-- each Scroll View conditionally receives events from mainPipe or emptyPipe, default is emptyPipe -->
           <fa-scroll-view fa-pipe-from="view.pipe" fa-options="options.scrollViewTwo">
             <fa-view ng-repeat="items in list">
               <fa-modifier fa-size="[100, 100]">
                   <fa-surface fa-background-color="view.bgColor">
                     Index: {{$index}}
                   </fa-surface>
                 </fa-modifier>
             </fa-view>
            </fa-scroll-view>   
         </fa-view>
       </fa-modifier>
     </fa-view>
   </fa-app>
 </file>
 <file name="script.js">
 angular.module('faPipeExampleApp', ['famous.angular'])
     .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {

       // Event Handlers
       var EventHandler = $famous['famous/core/EventHandler'];
       
       $scope.mainPipe = new EventHandler();
       $scope.emptyPipe = new EventHandler();
       
       // items in ng-repeated list in each of the 3 Scroll Views
       $scope.list = [];
       for (var i = 0; i < 10; i++) {
         $scope.list.push({});
       };
       
       // 3 inputs in the directional pad corresponding to the 3 scroll views
       $scope.inputList = [{model: "checkBox.A", letter: "A"},{model: "checkBox.B", letter: "B"}, {model: "checkBox.C", letter: "C"}];
       
       // pipes that each of the 3 scroll views is binded to through fa-pipe-from
       $scope.pipes = {
         A: $scope.emptyPipe,
         B: $scope.emptyPipe,
         C: $scope.emptyPipe
       };

       // 3 scrollviews
       $scope.scrollViews = [{pipe: $scope.pipes.A, bgColor: "blue"}, {pipe: $scope.pipes.B, bgColor: "red"}, {pipe: $scope.pipes.C, bgColor: "green"}];
       
       // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
       $scope.checkBoxChange = function(index, model, value) {
         if (value == 'true') {
           console.log($scope.pipes[model], + " is now pointing to mainPipe");
           $scope.scrollViews[index].pipe = $scope.mainPipe;
         
         } else {
           console.log($scope.pipes[model] + " is now pointing to emptyPipe");
           $scope.scrollViews[index].pipe = $scope.emptyPipe;
         }
       };
   }]);
 </file>
 <file name="style.css">
 fa-app {
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
   }
 </file>
</example>
*
*/

angular.module('famous.angular')
  .directive('faPipeFrom', ['$famous', '$famousDecorator', '$famousPipe', function ($famous, $famousDecorator, $famousPipe) {
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
                var source;
                if(isolate.renderNode && isolate.renderNode._isModifier) source = isolate.renderNode._object;                                         
                else if(isolate.renderNode) source = isolate.renderNode._eventInput || isolate.renderNode;
                else source = Engine;
                $famousPipe.unpipesFromTargets(source, oldTarget);
                $famousPipe.pipesToTargets(source, newTarget);
              }
            );

            // Destroy listeners along with scope
            scope.$on('$destroy', function() {
              $famousPipe.unpipesFromTargets(
                isolate.renderNode || Engine,
                scope.$eval(attrs.faPipeFrom)
              );
            });
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faPipeTo
 * @module famous.angular
 * @restrict A
 * @priority 16
 * @param {Object} EventHandler - Event handler source object
 * @description
 * This directive pipes an element's event handler to a source event handler.
 *
 * @usage
 * ```html
 * <ANY fa-pipe-to="EventHandler">
 *   <!-- zero or more render nodes -->
 * </ANY>
 * ```
 * @example
 *
 * ##ScrollView example
 *
 * In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
 * To pass information between two unrelated views, or even between a nested View to its parent, use `fa-pipe-to` and `fa-pipe-from` to pipe and receive events.
 * 
 * In the example below, even though `fa-view`, `fa-modifier`, and `fa-surface` are all nested within an `fa-scroll-view`, all of these elements' events (such as touch or scroll) do not propagate upwards towards their parent.
 *
 * Note:  This example will not work.
 *
 * ```html
 * <!-- fa-scroll-view is not receiving any events from its children -->
 * <fa-scroll-view>
 *    <fa-view ng-repeat="view in views">
 *       <fa-modifier fa-size="[320, 320]">
 *        <!-- Events on fa-surface are not propagated upwards to its parents automatically -->
 *           <fa-surface fa-background-color="'blue'"></fa-surface>
 *         </fa-modifier>
 *    </fa-view>
 * </fa-scroll-view>
 *  ```
 * 
 * In the example below, events from the `fa-surface` are piped to `myEventHandler`, a source event handler, via `fa-pipe-to`. `Fa-scroll-view` receives events from `myEventHandler`, its target event handler, via `fa-pipe-from`. 
 * `myEventHandler` refers to an instantiated Famous EventHandler declared on the scope.  Using pipes allows events to propagate between `fa-surface`s and the `fa-scroll-view`.
 *
 *
 <example module="faPipeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="PipeCtrl">
      <!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them -->
      <fa-scroll-view fa-pipe-from="myEventHandler">
          <fa-view ng-repeat="view in views">
            <fa-modifier fa-size="[undefined, 160]">
            <!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler -->
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faPipeExampleApp', ['famous.angular'])
          .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];

            $scope.views = [{color: 'red'}, {color: 'blue'}, {color: 'green'}, {color: 'yellow'}, {color: 'orange'}];

            $scope.myEventHandler = new EventHandler();

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ##Event Handlers on the Controller
 * 
 * The example below is more in line with a "vanilla" Famous approach to event piping.  There are two Views, each with one Surface.  In the html, the second View has a`fa-pipe-from` bound to `eventHandlerB`.  
 * 
 * Two event handlers are instantiated on the controller.  `EventHandlerA` pipes to `eventHandlerB`, using: `eventHandlerA.pipe(eventHandlerB)`.
 *
 * If the fa-surface on the first View is clicked, it calls `surfaceClick()` via fa-click, which causes `eventHandlerA` to emit a custom event called `myEvent`.
 * Because `evenHandlerA` pipes to `eventHandlerB`, `eventHandlerB` receives `myEvent`.  
 * 
 * An event handler for `myEvent` is declared for `eventHandlerB` using an `.on()` method.  When eventHandlerB receives a `myEvent` event, the event is handled with a callback function that translates the `fa-surface` on the second view.
 * 
 * ```html
 * <fa-view>
 *   <fa-modifier fa-size="[100, 100]">
 *       <fa-surface fa-background-color="'blue'" fa-click="surfaceClick()"></fa-surface>
 *     </fa-modifier>
 * </fa-view>
 * <fa-view fa-pipe-from="eventHandlerB">
 *   <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
 *       <fa-surface fa-background-color="'red'"></fa-surface>
 *   </fa-modifier>
 * </fa-view>
 * ```
 * 
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandlerA = new EventHandler();
 * $scope.eventHandlerB = new EventHandler();
 * $scope.eventHandlerA.pipe($scope.eventHandlerB); 
 * // all events received by eventHandlerA wil be piped to eventHandlerB
 *
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.redTrans = new Transitionable([0, 0, 0]);
 *
 * // eventHandlerA emits 'myEvent' on click
 * $scope.surfaceClick = function() {
 *   $scope.eventHandlerA.emit('myEvent');
 * };
 *
 * // eventHandlerA pipes all events it receives to eventHandlerB
 * // This is an event handler defined on eventHandlerB for handling 'myEvent'
 * $scope.eventHandlerB.on('myEvent', function() {
 *   $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
 * });
 * ```
 *
 <example module="faPipeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="PipeCtrl">
      <fa-view>
        <fa-modifier fa-size="[100, 100]">
            <fa-surface class="blue-surface" fa-background-color="'blue'" fa-click="surfaceClick()">Click me!</fa-surface>
          </fa-modifier>
      </fa-view>
      <fa-view fa-pipe-from="eventHandlerB">
        <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
            <fa-surface fa-background-color="'red'"></fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faPipeExampleApp', ['famous.angular'])
          .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandlerA = new EventHandler();
            $scope.eventHandlerB = new EventHandler();
            $scope.eventHandlerA.pipe($scope.eventHandlerB); 
            // all events received by eventHandlerA wil be piped to eventHandlerB
            
            var Transitionable = $famous['famous/transitions/Transitionable'];
            $scope.redTrans = new Transitionable([0, 100, 0]);
            
            // eventHandlerA emits 'myEvent' on click
            $scope.surfaceClick = function() {
              $scope.eventHandlerA.emit('myEvent');
            };
            
            // eventHandlerA pipes all events it receives to eventHandlerB
            // This is an event handler defined on eventHandlerB for handling 'myEvent'
            $scope.eventHandlerB.on('myEvent', function() {
              $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
            });

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .blue-surface {
      cursor: pointer;
      color: #fff;
    }
  </file>
 </example> 
 *
 * ##Switching Pipes
 * 
 * Another feature of `fa-pipe-to` and `fa-pipe-from` is the ability to switch pipes.
 * 
 * Using fa-pipe-to & fa-pipe-from involves binding it to a reference of an event handler on the scope.
 * If the event handler bound to `fa-pipe-to/fa-pipe-from` changes, the directives unpipes from that event handler, and can pipe to another event handler.
 *
 * The Famous approach to events allows more flexibility than DOM events which are hierarchical.  The example below shows a case in which eventing to non-hierarchical eventing & switching pipes dynamically can allow more expressiveness with events than a hierarchical DOM event propagation model.
 * 
 * ### Example & Explanation
 * 
 * Touch events from a directional pad conditionally affect three different Scroll Views on a page.
 * Based on which checkboxes are checked, the scroll events on the directional pad will affect either Scroll View A, Scroll View B, or Scroll View C.
 * The pipes are databound using `fa-pipe-to` and `fa-pipe-from`, and they are swapped out using the controller.
 * 
 * There are two main `fa-view`s: the directional pad which contains a Scroll View (for input) & 3 checkboxes, and the other `fa-view` that contains 3 Scroll Views.
 * The Scroll View of the directional pad uses `fa-pipe-from` to pipe events from `mainPipe` to its Scroll View's event handler.
 * The surface within the directional pad uses `fa-pipe-to` to pipe `fa-surface` events to `mainPipe`.
 * 
 * In the second view containing 3 Scroll Views, each Scroll View pipes from `emptyPipe` by default, another instantiated EventHandler that has no events piped to it.  
 *  
 *
 * The directional pad has a list of input checkboxes created by an ng-repeated list from `$scope.inputList`.
 * If a checkbox is checked, it calls `checkBoxChange()`, passing the index of the object within the ng-repeat, the letter (such as `'A'`), and the model (such as `'checkBox.A'`) of the respective checkbox.
 * If the checkbox is checked, the model (`checkBox.A`) is assigned the value of "true", and if it is unchecked, it is assigned the value of "false".
 * 
 * In the controller, `$scope.checkBoxChange()` changes the value of the pipe of the respective Scroll View (A, B, or C) that corresponds to the checkBox.
 * If the checkbox is checked, it assigns the respective Scroll View (A, B, or C) to pipe from `$scope.mainPipe`, and if unchecked, it will continue to pipe from `$scope.emptyPipe`.
 * In short, the checkboxes act as switches to change piping events.
 *
<example module="faPipeExampleApp">
 <file name="index.html">
 <fa-app ng-controller="PipeCtrl">
     <!-- directional pad view -->
     <fa-view>
       <!-- scroll view used as a directional pad input, receives events from mainPipe-->
       <fa-scroll-view fa-pipe-from="mainPipe">
         <fa-modifier fa-translate="[0, 0, 15]" fa-size="[300, 50]">
           <fa-view>
             <fa-modifier>
               <!-- mousewheel events will be piped to mainPipe -->
               <fa-surface fa-background-color="'orange'" fa-pipe-to="mainPipe">
                 <div>Directional pad</div>
                   <span ng-repeat="input in inputList">
                     <label>{{input.letter}}</label>
                     <!-- checkboxes -->
                     <input type="checkbox"
                            ng-model="input.model" 
                            name="scrollPipeTo" 
                            ng-change="checkBoxChange($index, input.letter, input.model)"
                            ng-true-value="true"
                            ng-false-value="false">
                   </span>
               </fa-surface>
             </fa-modifier>
           </fa-view>
         </fa-modifier>
       </fa-scroll-view>
     </fa-view>
     
     <!-- view with 3 Scroll Views -->
     <fa-view>
       <!-- ng-repeat creating 3 different scroll Views -->
       <fa-modifier ng-repeat="view in scrollViews"
                    fa-translate="[100 * $index, 50, 0]">
         <fa-view>
           <!-- each Scroll View conditionally receives events from mainPipe or emptyPipe, default is emptyPipe -->
           <fa-scroll-view fa-pipe-from="view.pipe" fa-options="options.scrollViewTwo">
             <fa-view ng-repeat="items in list">
               <fa-modifier fa-size="[100, 100]">
                   <fa-surface fa-background-color="view.bgColor">
                     Index: {{$index}}
                   </fa-surface>
                 </fa-modifier>
             </fa-view>
            </fa-scroll-view>   
         </fa-view>
       </fa-modifier>
     </fa-view>
   </fa-app>
 </file>
 <file name="script.js">
 angular.module('faPipeExampleApp', ['famous.angular'])
     .controller('PipeCtrl', ['$scope', '$famous', function($scope, $famous) {

       // Event Handlers
       var EventHandler = $famous['famous/core/EventHandler'];
       
       $scope.mainPipe = new EventHandler();
       $scope.emptyPipe = new EventHandler();
       
       // items in ng-repeated list in each of the 3 Scroll Views
       $scope.list = [];
       for (var i = 0; i < 10; i++) {
         $scope.list.push({});
       };
       
       // 3 inputs in the directional pad corresponding to the 3 scroll views
       $scope.inputList = [{model: "checkBox.A", letter: "A"},{model: "checkBox.B", letter: "B"}, {model: "checkBox.C", letter: "C"}];
       
       // pipes that each of the 3 scroll views is binded to through fa-pipe-from
       $scope.pipes = {
         A: $scope.emptyPipe,
         B: $scope.emptyPipe,
         C: $scope.emptyPipe
       };

       // 3 scrollviews
       $scope.scrollViews = [{pipe: $scope.pipes.A, bgColor: "blue"}, {pipe: $scope.pipes.B, bgColor: "red"}, {pipe: $scope.pipes.C, bgColor: "green"}];
       
       // function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
       $scope.checkBoxChange = function(index, model, value) {
         if (value == 'true') {
           console.log($scope.pipes[model], + " is now pointing to mainPipe");
           $scope.scrollViews[index].pipe = $scope.mainPipe;
         
         } else {
           console.log($scope.pipes[model] + " is now pointing to emptyPipe");
           $scope.scrollViews[index].pipe = $scope.emptyPipe;
         }
       };
   }]);
 </file>
 <file name="style.css">
 fa-app {
     position: fixed;
     top: 0;
     right: 0;
     bottom: 0;
     left: 0;
   }
 </file>
</example>
*
*/

angular.module('famous.angular')
  .directive('faPipeTo', ['$famous', '$famousDecorator', '$famousPipe', function ($famous, $famousDecorator, $famousPipe) {
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
              function(newSource, oldSource) {
                var target;
                if(isolate.renderNode && isolate.renderNode._isModifier) target = isolate.renderNode._object;
                else if(isolate.renderNode) target = isolate.renderNode._eventOutput || isolate.renderNode;
                else target = Engine;
                $famousPipe.unpipesFromTargets(oldSource, target);
                $famousPipe.pipesToTargets(newSource, target);
              }
            );

            // Destroy listeners along with scope
            scope.$on('$destroy', function() {
              $famousPipe.unpipesFromTargets(
                scope.$eval(attrs.faPipeTo),
                isolate.renderNode || Engine
              );
            });
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faRenderNode
 * @module famous.angular
 * @restrict EA
 * @description
 * A directive to insert a {@link https://famo.us/docs/core/RenderNode Famo.us RenderNode} that is
 * a wrapper for inserting a renderable component (like a Modifer or Surface) into the render tree.
 * It allows you to pass a reference to an arbitrary render node from your controller.
 * @usage
 * ```html
 * <fa-render-node fa-node="arbitrary render node reference">
 *     <!-- content -->
 * </fa-render-node>
 * ```
 * @example
 * `Fa-render-node` can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.
 *
 * All Famous widgets, such as a Scroll View, a Sequential Layout, or a Header-footer-layout, are extended Famous Views.
 * `Fa-render-node` allows a developer to create & extend their own Famous View, and use it within their own Famous-Angular app.
 *
 * In the example below, a Famous View is instantiated on the scope; a Modifier is added to it, and then a Surface is added below.
 * This approach of creating a View and adding renderables to it with the `.add()` method is more in line with a "vanilla Famous" approach than a declarative approach with Famous-Angular.
 *
 * In the html view, an `fa-render-node` is declared, with an `fa-node` attribute bound to the newly-created View on the scope, resulting in our custom View appearing on the page.
 *
 <example module="faRenderNodeExampleApp">
  <file name="index.html">
  <fa-app ng-controller="RenderCtrl">
      <fa-render-node fa-node="masterView" id="render"></fa-render-node>
    </fa-app>

    <script>
      angular.module('faRenderNodeExampleApp', ['famous.angular'])
          .controller('RenderCtrl', ['$scope', '$famous',function($scope, $famous) {

            var View = $famous['famous/core/View'];
            var Modifier = $famous['famous/core/Modifier'];
            var Surface = $famous['famous/core/Surface'];
            var Transform = $famous['famous/core/Transform'];
            
            $scope.masterView = new View();
            
            var _surf = new Surface({properties: {backgroundColor: 'red'}});
            _surf.setContent("I'm a surface");
            
            var _mod = new Modifier();
            
            var _width = 320;
            var _height = 568;
            _mod.transformFrom(function(){
              return Transform.translate(Math.random() * _width, 0, 1);
            });
            
            $scope.masterView.add(_mod).add(_surf);

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faRenderNode', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var Engine = $famous['famous/core/Engine'];
            var RenderNode = $famous['famous/core/RenderNode'];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.children = [];

            attrs.$observe('faPipeTo', function(val){
              var pipeTo = scope.$eval(val);
              if(pipeTo)
                Engine.pipe(pipeTo);
            });

            isolate.renderNode = scope.$eval(attrs.faNode);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
              isolate.children.push(data);
            });

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faScrollView
 * @module famous.angular
 * @restrict E
 * @description
 * This directive allows you to specify a {@link https://famo.us/docs/views/Scrollview famo.us Scrollview}
 * that will lay out a collection of renderables sequentially in the specified direction
 * and will allow you to scroll through them with mousewheel or touch events.
 *
 * @usage
 * ```html
 * <fa-scroll-view>
 *   <fa-view>
 *     <!-- content -->
 *   </fa-view>
 * </fa-scroll-view>
 * ```
 *
 * @example
 * ### Scroll View + Events + ng-repeat
 * In the example below, `fa-scroll-view` displays a collection of nested `fa-views` generated by ng-repeat.
 * In Famous, events are not propagated from these nested `fa-view`'s to its parent `fa-scroll-view`.
 *
 * When a nested View needs to trigger higher-order app behavior within another View (such as a Scroll View), the best practice is to pass data via Famous Events.
 *
 * To use a Scroll View, create an instance of a Famous Event Handler on the scope.  Within each ng-repeated `fa-view` are nested `fa-surface`s.  Pipe all Surface events to the event handler using `fa-pipe-to`, and then specify that the Scroll View will receive events from that specific event handler using `fa-pipe-from`.
 *
 * Input events (like click or mousewheel) are captured on Surfaces, and piping must be used to specify where the events will broadcast and be received.
 * This will enable scrolling by connecting input events from the `fa-surface`s to the `fa-scroll-view`, otherwise the Scroll View will not receive mousewheel events.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl">
      <!-- fa-scroll-view receives all events from $scope.myEventHandler, and decides how to handle them -->
      <fa-scroll-view fa-pipe-from="myEventHandler">
          <fa-view ng-repeat="view in views">
            <fa-modifier fa-size="[undefined, 160]">
            <!-- All events on fa-surfaces (click, mousewheel) are piped to $scope.myEventHandler -->
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];

            $scope.views = [{color: 'red'}, {color: 'blue'}, {color: 'green'}, {color: 'yellow'}, {color: 'orange'}];

            $scope.myEventHandler = new EventHandler();

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * To specify (optional) configurable options for the Scroll View, bind an object on the scope to the `fa-options` attribute on `fa-scroll-view`.
 * Notable options include `clipSize`, which specifies the size of the area in pixels to display content in, and `direction`, which specifies whether the nested views will scroll horizontally or vertically (1 is vertical, 0 is horizontal).
 * A full list of configurable options for Scroll View may be found at https://famo.us/docs/0.2.0/views/Scrollview/.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl">
      <fa-scroll-view fa-pipe-from="myEventHandler" fa-options="options.myScrollView">
          <fa-view ng-repeat="view in list">
            <fa-modifier fa-size="[500, 320]">
               <fa-surface fa-background-color="view.color"
                            fa-pipe-to="myEventHandler">
                  {{view.content}}
               </fa-surface>
              </fa-modifier>
          </fa-view>
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEventHandler = new EventHandler();
            $scope.list = [{content: "Scroll", color: "red"}, {content: "horizontally", color: "blue"}, {content: "yay!", color: "green"}, {content: "woo!", color: "yellow"}];
            
            $scope.options = {
              myScrollView: {
                clipSize: 100,
                paginated: false,
                speedLimit: 5,
                direction: 0,
              }
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 * ### Scroll View with explicitly created views
 * `Fa-index` determines the order of which the surfaces appear in the sequential view.
 * In this example below, a Scroll View is created with two nested `fa-view`'s, both of which have an `fa-index` of 0 and 1, respectively.
 *
 * If `fa-index` is declared explicitly, it will override any default order of `fa-view`'s declared in html.
 * If `fa-views` are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
 * The `fa-view` with the blue background color appears after the one with the red background because its `fa-index` is set to 1.
 *
 * `fa-scroll-view` accepts another attribute called `fa-start-index`, which determines which `fa-view` the Scroll View displays by default.
 * `Fa-start-index` will not affect the sequential order of the layout; the `fa-view` with the red background will be layed out first, followed by the one with the blue background.
 * By setting `fa-start-index` to 1, the Scroll View will display the View with the index of 1 by default, "starting" at the index of 1, which is the View with the blue background color.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl" style="width: 100%; height: 320px; overflow: hidden;">
      <!-- The scroll View will start at the index of 1 -->
       <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewTwo" fa-start-index="1">
         <!-- Even though this view is declared first in html, it will will be layed out 2nd -->
         <!-- On page load, the scroll View will scroll to this view, and display it.  -->
          <fa-view fa-index="1">
             <fa-modifier fa-size="[undefined, 320]">
                <fa-surface fa-pipe-to="eventHandler"
                            fa-background-color="'blue'">
                  I am first in html, but displayed second!
                </fa-surface>
             </fa-modifier>
          </fa-view>

          <fa-view fa-index="0">
             <fa-modifier fa-size="[undefined, 320]">
                <fa-surface fa-pipe-to="eventHandler"
                            fa-background-color="'red'">
                  I am second in html, but displayed first!  Scroll horizontally!
                </fa-surface>
             </fa-modifier>
          </fa-view>

       </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandler = new EventHandler();
            $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
            
            $scope.options = {
              scrollViewTwo: {
                direction: 0,
                paginated: true
              }
            };

        }]);
    </script>
  </file>
 </example>
 *
 *
 * ### Combining multiple Scroll Views
 *
 * Combining both approaches above (a Scroll View with ng-repeated views, and one with explicitly created views), one can can nest a Scroll View within another Scroll View.
 * A Scroll View is a Famous widget that displays a collection of views sequentially; it is agnostic about the Views that are inside of it; it only requires that events are piped from Surfaces to the ScrollView.
 *
 * In the example below, the outer Scroll View contains two explictly created Views.  One of those Views contains another Scroll View with sub-views created through an ngRepeat.
 * The outer Scroll View is passed an option for its `direction` to be `horizontal (0)`, and the inner Scroll View is passed an option for a `vertical direction (1)`.
 *
 <example module="faScrollViewExampleApp">
  <file name="index.html">
  <fa-app ng-controller="ScrollCtrl" style="width: 100%; height: 568px;">
      <!-- outer scroll view that scrolls horizontally between "main" view and "sidebar" view-->
      <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewOuter">
    
        <!-- sidebar view -->
        <fa-view fa-index="0">
          <fa-modifier fa-size="[200, undefined]" id="sideBarMod">
              <fa-surface fa-pipe-to="eventHandler"
                          fa-background-color="'blue'"
                          fa-size="[undefined, undefined]">
                Sidebar (scroll horizontally to hide)
              </fa-surface>
            </fa-modifier>
        </fa-view>
    
        <!-- main view -->
        <fa-view fa-index="1">
        <!-- inner scroll view that scrolls vertically-->
          <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewInner">
            <fa-view ng-repeat="item in list">
              <fa-surface fa-pipe-to="eventHandler"
                          fa-size="[undefined, 200]"
                          fa-background-color="'red'">
                {{item.content}}
              </fa-surface>
            </fa-view>
          </fa-scroll-view>
        </fa-view>
    
      </fa-scroll-view>
    </fa-app>

    <script>
      angular.module('faScrollViewExampleApp', ['famous.angular'])
          .controller('ScrollCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.eventHandler = new EventHandler();
            $scope.list = [{
              content: "Awesome content"
            },{
              content: "Scroll vertically to see more awesome content"
            },{
              content: "Famo.us/angular rocks!"
              }
            ];
            
            $scope.options = {
              scrollViewOuter: {
                direction: 0,
                paginated: true
              },
              scrollViewInner :{
                direction: 1
              }
            };

        }]);
    </script>
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faScrollView', ['$famous', '$famousDecorator', function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ScrollView = $famous["famous/views/Scrollview"];
            var ViewSequence = $famous['famous/core/ViewSequence'];
            var Surface = $famous['famous/core/Surface'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ScrollView(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();


            var updateScrollview = function(init){
              // Synchronize the update on the next digest cycle
              // (if this isn't done, $index will not be up-to-date
              // and sort order will be incorrect.)
              scope.$$postDigest(function(){
                _children.sort(function(a, b){
                  return a.index - b.index;
                });

                var options = {
                  array: function(_children) {
                    var _ch = [];
                    angular.forEach(_children, function(c, i) {
                      _ch[i] = c.renderGate;
                    });
                    return _ch;
                  }(_children)
                };
                //set the first page on the scrollview if
                //specified
                if(init)
                  options.index = scope.$eval(attrs.faStartIndex);

                var viewSeq = new ViewSequence(options);
                isolate.renderNode.sequenceFrom(viewSeq);
              });
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateScrollview(true);
              },
              function(childScopeId) {
                _children = function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateScrollview();
              },
              updateScrollview
            );

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);

          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faSequentialLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us SequentialLayout containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us faSequentialLayout's
 * constructor.  See [https://famo.us/docs/views/SequentialLayout]
 *
 * @usage
 * ```html
 * <fa-sequential-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-sequential-layout>
 * ```
 * @example
 * `Fa-sequential-layout` is a Famous View that arranges a collection of renderables sequentially in a specified direction.  Pass options (such as `direction`) by binding an object with the property to `fa-options`.
 *
 * In the example below, an ng-repeat is used on an `fa-view` and the elements nested below it.  The size of each `fa-surface` is `[undefined, 100]`, specifying that the width will fill the parent container, and the height will be 100 pixels.
 *
 * There are no positioning properties (such as `fa-translate`) specified on the `fa-modifier`, but these `fa-surface`s will translate automatically in the specified direction as not to overlap each other.
 *
 <example module="faSequentialExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SequentialCtrl">
      <fa-sequential-layout fa-options="sequentialOptions">
       <fa-view ng-repeat="view in sequence">
         <fa-modifier fa-size="[undefined, 100]">
           <fa-surface fa-background-color="view.bgColor"></fa-surface>
         </fa-modifier>
       </fa-view>
      </fa-sequential-layout>
    </fa-app>

    <script>
      angular.module('faSequentialExampleApp', ['famous.angular'])
          .controller('SequentialCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.sequentialOptions = {
              direction: 1, // vertical = 1 (default), horizontal = 0
            };

            $scope.sequence = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faSequentialLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        window.$f = $famous;
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var SequentialLayout = $famous["famous/views/SequentialLayout"];


            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};

            isolate.renderNode = new SequentialLayout(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var _updateSequentialLayout = function() {
              _children.sort(function(a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function(_children) {
                var _ch = [];
                angular.forEach(_children, function(c, i) {
                  _ch[i] = c.renderGate;
                });
                return _ch;
              }(_children));
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                _updateSequentialLayout();
              },
              function(childScopeId) {
                _children = function (_children) {
                  var _ch = [];
                  angular.forEach(_children, function (c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                _updateSequentialLayout();
              }
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faSurface
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create general Famo.us surfaces, which are the
 * leaf nodes of the scene graph.  The content inside
 * surfaces is what gets rendered to the screen.
 * This is where you can create form elements, attach
 * images, or output raw text content with one-way databinding {{lb}}{{rb}}.
 * You can include entire complex HTML snippets inside a faSurface, including
 * ngIncludes or custom (vanilla Angular) directives.
 *
 * @usage
 * ```html
 * <fa-surface>
 *   Here's some data-bound content {{lb}}myScopeVariable{{rb}}
 * </fa-surface>
 * ```
 *
 * @example
 * An `fa-surface` can use an ng-include to compile an external HTML fragment:
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-size="[960, undefined]">
         <fa-surface fa-size="[undefined, undefined]">
           <div ng-include src=" 'helloWorld.html' "></div>
         </fa-surface>
       </fa-modifier>
    </fa-app>
  </file>
  <file name="helloWorld.html">
  <p>This is compiled from an external HTML fragment in helloWorld.html!</p>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ##Common Confusions
 *  ### A Surface is a leaf node
 *  An fa-surface is a leaf node; this means that there should not be Famous-Angular elements nested within an fa-surface.
 *
 *  This following example will NOT work correctly:
 *  ```html
 *  <fa-surface>
 *     <!-- the contents of a Surface must be standard HTML. -->
 *     <!-- If a Famo.us component is on a surface, it will not get rendered correctly. -->
 *     <fa-modifier>
 *       <fa-surface>This will not work correctly.</fa-surface>
 *     </fa-modifier>
 *  </fa-surface>
 * ```
 *
 It will throw this error: "Error: Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app."
 *
 *  The purpose of an fa-surface is to contain viewable HTML content:
 * ```html
 *  <fa-surface>
 *     <!-- content -->
 *     <!-- databound content with curly braces -->
 *     <!-- no other Famous renderable nodes allowed inside a Surface-->
 *  </fa-surface>
 *  ```
 *
 * ### Properties on surfaces vs modifiers
 * With Famous, properties related to layout and visibility belong on a Modifier.  A Surface should be added below a Modifier on the Render Tree, as Modifiers affect everything below them.
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-surface fa-origin="[.5, 0]">This will not change the origin.</fa-surface>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 * While you can specify `fa-size` on surfaces themselves, it is not recommended.
 * This is not best practice:
 * ```html
 * <fa-surface fa-size="[100, 100]"></fa-surface>
 * ```
 *
 * Whereas this is the preferred approach:
 * ```html
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface fa-size="[undefined, undefined]">
 *   </fa-surface>
 * </fa-modifier>
 * ```
 *
 * You may also omit `fa-size="[undefined, undefined]"` on the surface and the surface will fill to the size of the modifier, in this case, `[100, 100]`.
 *
 * In Famous' Render Tree, Modifiers modify all the nodes (other Modifiers and Surfaces) below them.  By setting the `fa-surface`'s `fa-size` to `[undefined, undefined]`, it will inherit from the `fa-modifier`'s `fa-size` of `[100, 100]`.
 *
 * `Fa-surfaces` also cannot have an `fa-size`, assigned to a function, as is in the case of modifiers, which can take number/array or a function.
 * For example, this will not work:
 * ```html
 * <fa-surface fa-size="sizeForBoxFunction"></fa-surface>
 * ```
 * ```javascript
 * $scope.sizeForBoxFunction = function() {
 *    return [75, 75];
 * };
 * ```
 * To reiterate, the best practice to animate or set any layout/visibilty properties of a surface is to do so on a modifier that affects the Surface.  The purpose of a Surface is to contain HTML content, whether rendered from a template, or data-bound.
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SurfaceCtrl">
      <fa-modifier fa-size="sizeForBoxFunction">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faSurfaceExampleApp', ['famous.angular'])
        .controller('SurfaceCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.sizeForBoxFunction = function() {
               return [75, 75];
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### fa-color & fa-background-color
 * The exceptions of not setting layout/visibility properties on an `fa-surface` are `fa-color` and `fa-background-color`: these two properties are passed through the `.setProperties()` method available on Famous Surfaces.
 * Take note that they accept a string in the html view.  If you do not enclose them in quotation marks, Angular will evaluate it as an object on the scope, but surrounding it with quotation marks will specify it as a string expression.
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-size="[200, 50]">
        <fa-surface fa-background-color="'orange'" fa-color="'#fff'">
            This text should be white on an orange background.
        </fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### ng-class
 * Ng-Class works on `fa-surface`s:
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SurfaceCtrl">
      <fa-modifier fa-size="[300, 50]">
        <fa-surface ng-class="{strike: applyStrike}">
          Check box to apply strikethrough!
          <input type="checkbox" ng-model="applyStrike"></input>
        </fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .strike {
      text-decoration: line-through;
    }
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular'])
        .controller('SurfaceCtrl', ['$scope', '$famous', function($scope, $famous) {
      }]);
  </file>
 </example>
 *
 *
 */

angular.module('famous.angular')
  .directive('faSurface', ['$famous', '$famousDecorator', '$interpolate', '$controller', '$compile', function ($famous, $famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            
            var isolate = $famousDecorator.ensureIsolate(scope);
            // console.log("fa-surface", isolate);
            var Surface = $famous['famous/core/Surface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties();
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            );

            //TODO:  duplicate of fa-image-surface's _propToFaProp function.
            //       Refactor into a util object/service? 
            var _propToFaProp = function(prop){
              return "fa" + prop.charAt(0).toUpperCase() + prop.slice(1);
            };

            isolate.getProperties = function(){
              var baseProperties = scope.$eval(attrs.faProperties) || {};
              //TODO:  instead of a 'whitelist' like this, consider looping
              //       through all of the members of attrs that aren't 'fa-size'
              //       or 'fa-properties' ('blacklist') and considering each of
              //       them to be CSS properties.
              //       Alternatively, don't support fa-css-properties on
              //       the directive, in favor of requiring them to be passed in
              //       by fa-properties
              var properties = [
                "backgroundColor",
                "margin",
                "padding",
                "color",
                "pointerEvents",
                "zIndex"
              ];
              for(var i = 0; i < properties.length; i++){
                var prop = properties[i];
                var faProp = _propToFaProp(prop);
                if(attrs[faProp]) baseProperties[prop] = scope.$eval(attrs[faProp]);
              }
              return baseProperties;
            };
            var _sizeAnimateTimeStamps = [];

            attrs.$observe('faSize',function () {
              isolate.renderNode.setSize(scope.$eval(attrs.faSize));
              _sizeAnimateTimeStamps.push(new Date());
              
              if(_sizeAnimateTimeStamps.length > 5) {
                if((_sizeAnimateTimeStamps[4]-_sizeAnimateTimeStamps[0]) <= 1000 ){
                  console.warn("Using fa-size on fa-surface to animate is significantly non-performant, prefer to use fa-size on an fa-modifier surrounding a fa-surface");
                }
                _sizeAnimateTimeStamps.shift();
              }
            });

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              properties: isolate.getProperties()
            });
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
            // Throw an exception if anyother famous scene graph element is added on fa-surface.            
            $famousDecorator.sequenceWith(scope, function(data) {
              throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
            });
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function() {
              isolate.renderNode.setContent(element[0].querySelector('div.fa-surface'));
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              angular.element(element[0].querySelectorAll('div.fa-surface')).append(clone);
            });

            //TODO:  on this and all other render-node-wrapping fa-directives,
            //       expose an actual RenderNode in isolate.renderNode and
            //       use that RenderNode's .set() function to add/remove content
            //       from the scene graph.  This will probably be instead of
            //       using RenderControllers.
            $famousDecorator.registerChild(scope, element, isolate, function() {
              // TODO: hook into RenderController and hide this render node
            });


          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faTap
 * @module famous.angular
 * @restrict A
 * @param {expression} faTap Expression to evaluate upon tap. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is tapped.
 *
 * @usage
 * ```html
 * <ANY fa-tap="expression">
 *
 * </ANY>
 * ```
 * @example
 * Note: For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * `Fa-tap` checks if a touchmove event fires between a touchstart and tap event.  If the touchmove event fired, (the user "dragged" their finger), a `fa-tap` event will not fire.  If the user did not "drag" their finger on touch, when releasing their finger, a tap event will fire, and fa-tap will fire.
 *
 <example module="faTapExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TapCtrl">
      <fa-modifier fa-size="[100, 100]">
        <fa-surface fa-tap="tapHandler($event)"
                    fa-background-color="'red'">
          Tap count: {{tapCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTapExampleApp', ['famous.angular'])
        .controller('TapCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.tapCount = 0;

            $scope.tapHandler = function($event) {
              console.log($event);
              $scope.tapCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Fa-tap on an fa-view
 * `Fa-tap` may be used on an `fa-view`.  The function expression bound to `fa-tap` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `tap` event, it will call the function expression bound to `fa-tap`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a tap event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-tap` defines a callback function in which to handle tap events, and when it receives a tap event, it calls `tap()`. 
 *
 <example module="faTapExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TapCtrl">

      <!-- The fa-view receives the tap event from the fa-surface, and calls $scope.tap, which is bound to fa-tap on the fa-view. -->

      <fa-view fa-tap="tap($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[100, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Tap count: {{tapCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTapExampleApp', ['famous.angular'])
        .controller('TapCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.tapCount = 0;
            
            $scope.tap = function($event) {
              console.log($event);
              $scope.tapCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faTap', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTap) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              var _dragging = false;

              renderNode.on("touchmove", function(data) {
                _dragging = true;
                return data;
              });

              renderNode.on("tap", function(data) {
                if (!_dragging){
                  var fn = $parse(attrs.faTap);
                  fn(scope, {$event:data});
                  if(!scope.$$phase)
                    scope.$apply();
                }
                _dragging = false;
              });
            }
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faTouchend
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchend Expression to evaluate upon touchend. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior after an element that {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchend has been touched}.
 *
 * @usage
 * ```html
 * <ANY fa-touchend="expression">
 *
 * </ANY>
 * ```
 * 
 * Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * @example
 * Upon a touchend event firing, fa-touchend will evaluate the expression bound to it.
 * 
 * Touchstart fires once upon first touch; touchend fires as the touch point is moved along a touch surface; touchend fires upon release of the touch point.
 * 
 * ### Fa-touchend on an fa-surface
 * `Fa-touchend` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 * The function expression bound to `fa-touchend` is bound to that `fa-surface`'s touchend eventHandler, and when touchend fires, the function expression will be called. 
 *
 <example module="faTouchEndExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchEndCtrl">
      <fa-modifier fa-size="[200, 100]">
        <fa-surface fa-touchend="touchEnd($event)"
                    fa-background-color="'red'">
          Touch-end count: {{touchEndCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTouchEndExampleApp', ['famous.angular'])
        .controller('TouchEndCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.touchEndCount = 0;

            $scope.touchEnd = function($event) {
              console.log($event);
              $scope.touchEndCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### Fa-touchend on an fa-view
 * `Fa-touchend` may be used on an `fa-view`.  The function expression bound to `fa-touchend` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `touchend` event, it will call the function expression bound to `fa-touchend`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a touchend event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-touchend` defines a callback function in which to handle touchend events, and when it receives a touchend event, it calls `touchEnd()`. 
 *
 <example module="faTouchEndExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchEndCtrl">

      <!-- The fa-view receives the touchend event from the fa-surface, and calls $scope.touchEnd, which is bound to fa-touchend on the fa-view. -->

      <fa-view fa-touchend="touchEnd($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[100, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Touch-end count: {{touchEndCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTouchEndExampleApp', ['famous.angular'])
        .controller('TouchEndCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.touchEndCount = 0;
            
            $scope.touchEnd = function($event) {
              console.log($event);
              $scope.touchEndCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 */

angular.module('famous.angular')
  .directive('faTouchend', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchend) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("touchend", function(data) {
                var fn = $parse(attrs.faTouchend);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });

            }
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faTouchmove
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchmove Expression to evaluate upon touchmove. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchmove moved along a touch surface}.
 *
 * @usage
 * ```html
 * <ANY fa-touchmove="expression">
 *
 * </ANY>
 * ```
 *
 * Note:  For development purposes, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * @example
 * Upon a touchmove event firing, `fa-touchmove` will evaluate the expression bound to it.
 * 
 * touchmove fires once upon first touch; touchmove fires as the touch point (finger) is moved along a touch surface, until release of the touch point.
 * The rate of which touchmove events fire is implementation-defined by browser and hardware.
 * `fa-touchmove` evaluates the expression bound to it upon each firing of touchmove.
 *
 * ### Fa-touchmove on an fa-surface
 * `Fa-touchmove`can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `fa-touchmove` is bound to that `fa-surface`'s touchmove eventHandler, and when touchmove fires, the function expression will be called. 
 *
 <example module="faTouchMoveExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchMoveCtrl">
      <fa-modifier fa-size="[200, 100]">
        <fa-surface fa-touchmove="touchMove($event)"
                    fa-background-color="'red'">
          Touch move count: {{touchMoveCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTouchMoveExampleApp', ['famous.angular'])
        .controller('TouchMoveCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.touchMoveCount = 0;

            $scope.touchMove = function($event) {
              console.log($event);
              $scope.touchMoveCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 * ### Fa-touchmove on an fa-view
 * `Fa-touchmove` may be used on an `fa-view`.  The function expression bound to `fa-touchmove` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `touchmove` event, it will call the function expression bound to `fa-touchmove`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a touchmove event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-touchmove` defines a callback function in which to handle touchmove events, and when it receives a touchmove event, it calls `touchMove()`. 
 *
 <example module="faTouchMoveExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchMoveCtrl">

      <!-- The fa-view receives the touchmove event from the fa-surface, and calls $scope.touchMove, which is bound to fa-touchmove on the fa-view. -->

      <fa-view fa-touchmove="touchMove($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[200, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Touch move count: {{touchMoveCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTouchMoveExampleApp', ['famous.angular'])
        .controller('TouchMoveCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.touchMoveCount = 0;
            
            $scope.touchMove = function($event) {
              console.log($event);
              $scope.touchMoveCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faTouchmove', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchmove) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("touchmove", function(data) {
                var fn = $parse(attrs.faTouchmove);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faTouchstart
 * @module famous.angular
 * @restrict A
 * @param {expression} faTouchstart Expression to evaluate upon touchstart. (Event object is available as `$event`)
 * @description
 * This directive allows you to specify custom behavior when an element is {@link https://developer.mozilla.org/en-US/docs/Web/Reference/Events/touchstart touched upon a touch surface}.
 *
 * @usage
 * ```html
 * <ANY fa-touchstart="expression">
 *
 * </ANY>
 * ```
 * 
 * Note:  For development purposes, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation
 * 
 * @example
 * Upon a `touchstart` event firing, `fa-touchstart` will evaluate the expression bound to it.
 * 
 * Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
 * If the touch point moves or releases touch, it will not fire another touchstart; touchstart fires once upon the first touch.
 * If the touch point is placed upon the touch surface again, it will fire another touchstart event.
 *
 * ### Fa-touchstart on an fa-surface
 * `Fa-touchstart` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `fa-touchstart` is bound to that `fa-surface`'s touchstart eventHandler, and when touchstart fires, the function expression will be called. 
 *
 <example module="faTouchStartExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchStartCtrl">
      <fa-modifier fa-size="[200, 100]">
        <fa-surface fa-touchstart="touchStart($event)"
                    fa-background-color="'red'">
          Touch start count: {{touchStartCount}}
        </fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faTouchStartExampleApp', ['famous.angular'])
        .controller('TouchStartCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.touchStartCount = 0;

            $scope.touchStart = function($event) {
              console.log($event);
              $scope.touchStartCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 *
 * ### Fa-touchstart on an fa-view
 * `Fa-touchstart` may be used on an `fa-view`.  The function expression bound to `fa-touchstart` will be bound to the `fa-view`'s internal `_eventInput`, the aggregation point of all events received by the `fa-view`.  When it receives a `touchstart` event, it will call the function expression bound to `fa-touchstart`.
 *  
 * In the example below, the `fa-surface` pipes its Surface events to an instantied Famous Event Handler called `myEvents`.
 * `Fa-view` pipes from `myEvents`, receiving all events piped by the `fa-surface`.
 * 
 * When a touchstart event occurs on the `fa-surface`, it is piped to the `fa-view`.  
 * `fa-touchstart` defines a callback function in which to handle touchstart events, and when it receives a touchstart event, it calls `touchStart()`. 
 *
 <example module="faTouchStartExampleApp">
  <file name="index.html">
  <fa-app ng-controller="TouchStartCtrl">

      <!-- The fa-view receives the touchstart event from the fa-surface, and calls $scope.touchStart, bound to fa-touchstart on the fa-view. -->

      <fa-view fa-touchstart="touchStart($event)" fa-pipe-from="myEvents">
        <fa-modifier fa-size="[200, 100]">
          <fa-surface fa-pipe-to="myEvents"
                      fa-background-color="'orange'">
            Touch start count: {{touchStartCount}}
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-app>

    <script>
      angular.module('faTouchStartExampleApp', ['famous.angular'])
        .controller('TouchStartCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            var EventHandler = $famous['famous/core/EventHandler'];
            $scope.myEvents = new EventHandler();

            $scope.touchStartCount = 0;
            
            $scope.touchStart = function($event) {
              console.log($event);
              $scope.touchStartCount++;
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 */

angular.module('famous.angular')
  .directive('faTouchstart', ['$parse', '$famousDecorator', function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchstart) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

              renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchstart);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        };
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faVideoSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faVideoUrl  -  String url pointing to the video that should be loaded into the Famo.us VideoSurface
 * @param {Object} faOptions  -   Object that sets options for the Famo.us VideoSurface
 * @description
 * This directive creates a Famo.us VideoSurface and loads the specified VideoUrl.
 * @usage
 * ```html
 * <fa-video-surface fa-video-url="vid/my-video.mp4">
 * </fa-video-surface>
 * ```
 @example
 * To use `fa-video-surface`, declare an `fa-video-url` attribute with a string url.
 * ```html
 * <fa-video-surface
 *            fa-video-url="vid/my-video.mp4"
 *            class="video"
 *            fa-options="{autoplay:true}">
 * </fa-video-surface>
 * ```
 * `Fa-video-surface` accepts options via the fa-options attribute. Currently the only option supported by Famo.us is autoplay, so you will have to target other attributes for the video element like controls and loop on the renderNode after the surface deploy event fires. 
 *
 *  var video = $famous.find('.video')[0].renderNode;
 *  video.on('deploy', function(){
 *     var player = video._currTarget;
 *     player.controls = true;
 *     player.loop = true;
 *     player.onprogress = console.log('video is downloading');
 *  });  
 *
 * `Fa-video-surface` can be modified via fa-modifier just like any Surface.
 *
 */

angular.module('famous.angular')
      .directive('faVideoSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
        return {
          scope: true,
          transclude: true,
          template: '<div class="fa-video-surface"></div>',
          restrict: 'EA',
          compile: function (tElem, tAttrs, transclude) {
            return {
              pre: function (scope, element, attrs) {
                var isolate = $famousDecorator.ensureIsolate(scope);
      
                var VideoSurface = $famous['famous/surfaces/VideoSurface'];
      
                scope.$watch(function(){
                
                  return scope.$eval(attrs.faOptions);
                  
                }, function(oldVal, newVal){
                
                  isolate.renderNode.setOptions(newVal);
                  
                }, true);
      
                isolate.renderNode = new VideoSurface({
                  class: scope.$eval(attrs.class)
                });
                
                $famousDecorator.addRole('renderable',isolate);
                isolate.show();
                      
                if (attrs.class) {
                  isolate.renderNode.setClasses(attrs['class'].split(' '));
                }
                // Throw an exception if anyother famous scene graph element is added on fa-surface.            
                $famousDecorator.sequenceWith(scope, function(data) {
                  throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
                });                
                
              },
              post: function (scope, element, attrs) {
              
                var isolate = $famousDecorator.ensureIsolate(scope);
      
                var updateContent = function () {
                  isolate.renderNode.setContent(attrs.faVideoUrl);
                };
      
                updateContent();
      
                attrs.$observe('faVideoUrl', updateContent);
      
                $famousDecorator.registerChild(scope, element, isolate);
              }
            };
          }
        };
      }]);
/**
 * @ngdoc directive
 * @name faView
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to wrap child elements into a View render node.  This is especially useful for grouping.
 * Use an `<fa-view>` surrounded by a `<fa-modifier>` in order to affect the View's position, scale, etc.
 *
 * @usage
 * ```html
 * <fa-view>
 *   <!-- content -->
 * </fa-view>
 * ```
 * @example
 * A Famous View is used for encapsulating many Modifiers and Surfaces together.  Internally, it is a Render Node that has its own input EventHandler (`_eventInput`) and output EventHandler (`_eventOutput`).
 * It does not map to DOM elements, but rather, it is an empty Render Node that can be extended by a developer.
 * A View's input eventHandler is the aggregation point of all events coming into the View, and from there, the View can listen for specific events and handle them.
 *
 * A more concrete example is a Scroll View: it is a Famous View that has been extended with certain sets of behavior to handle events such as a mouse scroll.
 * In the example below, when an `fa-surface` within an `fa-scroll-view` propagates an event (such as mouse scroll), these events are piped to the Scroll View (through `fa-pipe-to`). These events go through the Scroll View's `_eventInput` (using `fa-pipe-from`).  From there, the Scroll View has pre-defined event handlers to handle these events.
 *
 * Famous Views are a way to encapsulate large event systems with renderables (Surfaces & Modifiers).
 *
 *```html
 * <fa-scroll-view fa-pipe-from="myEventHandler">
 *   <fa-view>
 *     <fa-modifier fa-size="[320, 320]">
 *         <fa-surface fa-pipe-to="myEventHandler"></fa-surface>
 *       </fa-modifier>
 *   </fa-view>
 * </fa-scroll-view>
 *```
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.myEventHandler = new EventHandler();
 * ```
 *
 * ### Event propagation within & between Views
 * In the Famous event model, an `fa-view` nested within another `fa-view` does not automatically propagate its events to its parent.
 * Not even an `fa-surface` nested inside an `fa-view` propagates its events to the `fa-view`.  All events to an `fa-view` must be piped explicitly.
 *
 * For a more thorough discussion on Famous-Angular events, go to fa-pipe-from/fa-pipe-to in the docs.
 */

angular.module('famous.angular')
  .directive('faView', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var View = $famous['famous/core/View'];

        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            isolate.children = [];

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            
            $famousDecorator.sequenceWith(scope, function(data) {
              isolate.renderNode.add(data.renderGate);
              isolate.children.push(data);
            });

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
