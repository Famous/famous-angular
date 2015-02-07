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
    "famous/views/DrawerLayout": famous.views.DrawerLayout,
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
      if(!element[0]) return false;

      return IS_A_SURFACE.test(element[0].tagName);
    },

    /**
      Check if the element selected is an fa- element
      @param {Array} element - derived element
      @return {boolean}
    */
    isFaElement : function (element) {
      if(!element[0]) return false;

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
