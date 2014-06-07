'use strict';

// Put angular bootstrap on hold
window.name = "NG_DEFER_BOOTSTRAP!" + window.name;

//TODO:  Ensure that this list stays up-to-date with
//       the filesystem (maybe write a bash script
//       working around `ls -R1 app/scripts/famous` ?)
var requirements = [
  "famous/core/Engine",
  "famous/core/EventEmitter",
  "famous/core/EventHandler",
  "famous/core/Modifier",
  "famous/core/RenderNode",
  "famous/core/Surface",
  "famous/core/Transform",
  "famous/core/View",
  "famous/core/ViewSequence",
  "famous/events/EventArbiter",
  "famous/events/EventFilter",
  "famous/events/EventMapper",
  "famous/inputs/FastClick",
  "famous/inputs/GenericSync",
  "famous/inputs/MouseSync",
  "famous/inputs/PinchSync",
  "famous/inputs/RotateSync",
  "famous/inputs/TouchSync",
  "famous/surfaces/ImageSurface",
  "famous/surfaces/InputSurface",
  "famous/transitions/Easing",
  "famous/transitions/SpringTransition",
  "famous/transitions/Transitionable",
  "famous/transitions/TransitionableTransform",
  "famous/utilities/KeyCodes",
  "famous/utilities/Timer",
  "famous/views/Flipper",
  "famous/views/GridLayout",
  "famous/views/HeaderFooterLayout",
  "famous/views/RenderController",
  "famous/views/Scroller",
  "famous/views/Scrollview",
  "famous/views/SequentialLayout"
]

//declare the module before the async callback so that
//it will be accessible to other synchronously loaded angular
//components
var ngFameApp = angular.module('famous.angular', []);

require(requirements, function(/*args*/) {
  //capture 'arguments' in a variable that will exist in
  //child scopes
  var required = arguments;

  /**
   * @ngdoc provider
   * @name $famousProvider
   * @module famous.angular
   * @description
   * This provider is loaded as an AMD module and will keep a reference on the complete Famo.us library.
   * We use this provider to avoid needing to deal with AMD on any other angular files.
   *
   * @usage
   * You probably won't have to configure this provider
   *
   * ```js
   * angular.module('mySuperApp', ['famous.angular']).config(
   *   function($famousProvider) {
   *
   *       // Register your modules
   *       $famousProvider.registerModule('moduleKey', module);
   *
   *   };
   * });
   * ```
   *
   */
  ngFameApp.provider('$famous', function() {
    // hash for storing modules
    var _modules = {};

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
      return ('isolate' in scope) ? scope.isolate[scope.$id] : {};
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

    _modules.find = function(selector){
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
    }

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

  ngFameApp.config(['$famousProvider', function($famousProvider) {
    for(var i = 0; i < requirements.length; i++) {
      $famousProvider.registerModule(requirements[i], required[i]);
    }
    //    console.log('registered modules', famousProvider.$get());
  }]);

  angular.element(document).ready(function() {
    // For some reason Karma evaluates angular.resumeBootstrap as undefined.
    // Our versions of angular, angular-mocks and karma the latest stable
    // releases, so not sure why this is happening.
    // Quick fix until then.
    if (angular.resumeBootstrap) {
      angular.resumeBootstrap();
    }
  });

  // To delay Karma's bootstrapping until $famous is ready, fire off a global
  // event to allow karma to know when the $famous provider has been declared.
  window.dispatchEvent(new Event('$famousModulesLoaded'));

});
