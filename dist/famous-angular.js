/**
 * famous-angular - An MVC for Famo.us apps, powered by AngularJS. Integrates seamlessly with existing Angular and Famo.us apps.
 * @version v0.0.15
 * @link https://github.com/Famous/famous-angular
 * @license MPL v2.0
 */
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
 */

angular.module('famous.angular')
  .factory('$famousDecorator', function () {
    //TODO:  add repeated logic to these roles
    var _roles = {
      child: {
      },
      parent: {
      }
    }

    return {
      //TODO:  patch into _roles and assign the
      // appropriate role to the given scope
      addRole: function(role, scope){

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
       *  
       * @usage
       * 
       * ```js
       * var isolate = $famousDecorator.ensureIsolate($scope);
       * ```
       */
      ensureIsolate: function(scope){
        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        return isolate;
      }
    };
  });


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
 * @ngdoc directive
 * @name faAnimation
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to animate an element in conjunction with an {@link api/directive/animate animate} directive
 *
 * @usage
 * ```html
 * <fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 *  <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
 * </fa-animation>
 * ```

@example
Animating with Transitionables
------------------------------
The most flexible way to animate modifier properties is by creating a Transitionable object on the scope and binding the property in the html.
Any changes to the Transitionable object on the scope will be reflected in the view immediately via Angular's two-way data binding.

```javascript
var Transitionable = $famous['famous/transitions/Transitionable'];
var Easing = require('famous/transitions/Easing');

$scope.boxTransitionable = new Transitionable([0, 0, 0]);

$scope.animate = function() {
  $scope.boxTransitionable.set([200, 300, 0], {duration: 2000, curve: Easing.inOutBack});
};
```
```html
<fa-modifier fa-size="[100, 100]" fa-translate="boxTransitionable.get()">
  <fa-surface fa-background-color="'red'" fa-click="animate()">
  </fa-surface>
</fa-modifier>
```
In the html, fa-translate is passed boxTransitionable.get(), a function that will return a value of [0,0,0] initially.
All transitionables have a .get() method that returns the interpolated state of the transition at the current time of invocation, returning either a number/array or an object.
This means that during this transition, calls to .get() provide the interpolated state along the way, perhaps [100, 150], [150, 185], and so on, until it reaches [200, 300].
When the user clicks the fa-surface, it will trigger the animate() function defined on the scope.  In turn, this executes the .set() method on the boxTransitionable,
which is passed the end state and a transition.

Passing Transitionables & values
---------------------------------

One may also choose to pass an array, with one or more of its values a function, or a number.
```html
<fa-modifier fa-size="[100, 100]" fa-translate="[yTrans.get(), 0, 0]" fa-touchstart="animate()">
      <fa-surface fa-background-color="'red'" fa-click="animateY()">
      </fa-surface>
    </fa-modifier>
```
```javascript
$scope.yTrans = new Transitionable(0);

$scope.animateY = function() {
  $scope.yTrans.set(200, {duration: 2000, curve: 'easeInOut'})
};
```
In this example, fa-translate is passed an array, with the x value as a function that will return 0, and y & z values as 0's.
When animateY() is called, yTrans begins its transition, and its values are interpolated, updated on the view through Angular's two-way data binding.


Transitionables & .get()
-------------------------------
  @example
  A point of possible confusion is the fact that some modifier properties (faOpacity, faSize, faOrigin, faAlign) can be bound to a Transitionable object directly, without needing to be passed a .get() function, unlike the example above.
  In the example below, we create transitionable objects that will perform transitions on translate and opacity. 
  
  The value of fa-opacity is bound to a Transitionable directly, box.opacity.
  Whereas fa-translate is bound to a method of a Transitionable, box.translate.get(), that returns an interpolated value.
  Clicking the fa-surface invokes animateBox() on the scope, in turn, executing the .set() methods of each prospective Transitionable from initial state to end state defined by their respective .set() methods.
  
* ```html
* <fa-modifier fa-translate="box.translate.get()" fa-size="[100, 100]" fa-opacity="box.opacity">
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

Why the difference?  

FaTranslate (along with faRotate, faTranslate, faScale, faSkew, & more) pass through a Famous Transform function (Transform.translate()), whereas faOpacity, faSize, faOrigin, and faAlign are passed through a Famous Modifier.
A Famous Transform.translate() function does not accept a Transitionable object, but only an array.
A .get() function of a Transitionable returns an interpolated value of a current transition, therefore in the case of a faTranslate, it can return an array that a Transform.translate() can accept.
Whereas faOpacity is passes through a Famous Modifier, which has an .opacityFrom() method that can accept a Transitionable object directly.  

As a design principle, Famous-Angular attempts to pass values directly to Famous as much as possible, and these differences are due to the core Famous library.

Callbacks
---------
The .set() method of a Transitionable can accept 3 arguments: an endState, a transition, and an optional callback to be called upon observed completion of the transition.
In the example below, when the first transition completes, with the element translated to [200, 300, 0], the callback function is called, and the element begins the transition to [100, 100, 0]. 
```javascript
var Transitionable = $famous['famous/transitions/Transitionable'];

$scope.boxTrans = new Transitionable([0, 0, 0]);

$scope.animateWithCallback = function() {
  $scope.boxTrans.set([200, 300, 0], {duration: 1000, curve: 'easeInOut'}, 
    function() {
      $scope.boxTrans.set([100, 100, 0], {duration: 1000, curve: 'easeInOut'});
    }
  );
};
```

```html
<fa-modifier fa-size="[100, 100]" fa-translate="boxTrans.get()">
  <fa-surface fa-background-color="'red'" fa-click="animateWithCallback()">
  </fa-surface>
</fa-modifier>
```

Nesting modifiers & animations
------------------------------
Famous Modifiers affect all renderable child nodes (Modifiers & Surfaces) below them on the Render Tree.
In this example, two properties will be animated: the outermost Modifier's scale property and innermost Modifier's rotateZ property.
Because Famous Modifiers affect all child nodes nested within them, when the outermost Modifier's scale property changes, it affects the scale of every modifier and surface below it.
The innermost Modifier with the fa-rotate-Z property affects the innermost surface only.  

```html
<fa-modifier fa-scale="boxes.outer.scale.get()" fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'">
    <fa-modifier fa-size="[50, 50]" fa-origin="[.5, .5]" fa-rotate-z="boxes.inner.rotateZ.get()">
      <fa-surface fa-background-color="'blue'" fa-click="animateBoxes()"></fa-surface>
    </fa-modifier>
  </fa-surface>
</fa-modifier>
```

```javascript
var Transitionable = $famous['famous/transitions/Transitionable'];
$scope.boxes = {
  outer: {
    scale: new Transitionable([2, 2])
  },
  inner: {
    rotateZ: new Transitionable(0)
  }
};

$scope.animateBoxes = function() {
  $scope.boxes.outer.scale.set([1, 1], {duration: 2000, curve: 'easeInOut'});
  $scope.boxes.inner.rotateZ.set(.8, {duration: 1000, curve: 'easeInOut'});
};
```

$famous.find()
--------------
$famous.find() is a method that can be used to perform a DOM look-up to retrieves the Famous isolate (node) of the appropriate object.
It accepts one argument, a string css selector (e.g. an #id or a .class,) and returns an array of elements matching the query.
It is useful for manipulation of Famous objects after they have been declared in the DOM.
With Angular, it is best to do DOM manipulation (including look-ups) in a directive's post-link function; famous-angular is no exception.

```html
<fa-modifier id="myBox">
  <fa-surface></fa-surface>
</fa-modifier>
```
```javascript
var myBox = $famous.find('#myBox'); // [Object]
                                    // myBox[0] is the isolate object belonging to the modifier of id 'myBox' in the DOM.
                                    // myBox[0].modifier is a reference to the Famo.us modifier corresponding to that element.
```
If this is done outside of a directive's post-link function, there is no guarantee that $famous.find() will return anything, because the element may not have compiled yet.

In the example below, there is a custom directive called fadeIn that accepts an id property, and does DOM manipulation to change the opacity of an element.

```html
  <fa-modifier id="myModifier" fa-size="[100, 100]">
    <fa-surface fa-background-color="'red'"></fa-surface>
    <fade-in id="myModifier"></fade-in>
  </fa-modifier>
```

```javascript
.directive('fadeIn', ['$famous', '$famousDecorator', function ($famous, $famousDecorator) {
  return {
    restrict: 'EA',
    scope: {
      id: '@'
    },
    compile: function(tElement, tAttrs, transclude) {
      var Transitionable = $famous['famous/transitions/Transitionable'];
      return {
        pre: function(scope, element, attrs) {
        },
        post: function(scope, element, attrs) {
          var myElement = $famous.find('#' + scope.id)[0];

          var opacityTransitionable = new Transitionable(0);

          myElement.modifier.setOpacity(function() {
            return opacityTransitionable.get();
          });

          opacityTransitionable.set(1, {duration: 1500, curve: 'easeInOut'});
        }
      }
    }
  }
}]);
``` 

In the post-link function, pass $famous.find() the id attribute from the html view.  A Transitionable is instantiated with the value of 0.
Then, using DOM manipulation, access the modifier property of the element.  Famous modifiers have a .setOpacity() method that can accept a function.
Pass opacityTransitionable.get(), which returns 0, thereby setting the opacity of myElement to 0.

Then, using the .set() method, pass in the value of 1 as the end state as the first argument, and a transition object as the second argument.


 */


angular.module('famous.angular')
  .directive('faAnimation', ['$famous', '$famousDecorator', function ($famous, famousDecorator) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            setTimeout(function(){
              isolate.timeline = scope.$eval(attrs.timeline);
              isolate._trans = new Transitionable(0);

              isolate.play = function(callback){
                var transition = {
                  duration: scope.$eval(attrs.duration),
                  curve: scope.$eval(attrs.curve) || 'linear'
                };
                isolate._trans.set(1, transition, function(){
                  if(callback)
                    callback();
                  if(attrs.loop){
                    //Famo.us silently breaks its transitionable if this runs in
                    //the same execution context.  Maybe a suppressed SO error somewhere?
                    setTimeout(function(){isolate.replay(callback)}, 0);
                  }
                });
                //TODO:  handle $animate with a callback
              }
              isolate.reset = function(){
                isolate._trans.set(0);
              }
              isolate.replay = function(callback){
                isolate.reset();
                isolate.play(callback);
              }

              //disengage is a function that
              //can unassign the event listener
              var _disengage = undefined;
              if(attrs.event){
                if(_disengage)
                  _disengage();
                _disengage = scope.$on(attrs.event, function(evt, data){
                  var callback = data && data.callback ? data.callback : undefined;
                  isolate.replay(callback)
                })
              }

              var id = attrs.id;

              if(isolate.timeline === undefined){
                isolate.timeline = isolate._trans.get.bind(isolate._trans);
                if(attrs.autoplay)
                  isolate.play();
              }
              if(!isolate.timeline instanceof Function)
                throw 'timeline must be a reference to a function or duration must be provided';

	            /**
	             * @ngdoc directive
	             * @name animate
	             * @module famous.angular
	             * @restrict E
	             * @description
	             * This element is used to specify the animation of an element in a {@link api/directive/faAnimation faAnimation} directive
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

              for(var i = 0; i < animates.length; i++){
                (function(){
                  var animate = animates[i];

                  //DOM selector string that points to our mod of interest
                  if(animate.attributes['targetmodselector']){
                    //dig out the reference to our modifier
                    //TODO:  support passing a direct reference to a modifier
                    //       instead of performing a DOM lookup
	                var modElements = angular.element(element[0].parentNode)[0].querySelectorAll(animate.attributes['targetmodselector'].value);
                    
                    
                    angular.forEach(modElements, function(modElement){
                      var modScope = angular.element(modElement).scope();
                      var modifier = modScope.isolate[modScope.$id].modifier;
                      var getTransform = modScope.isolate[modScope.$id].getTransform;

                      //TODO:  won't need to special-case curve type 'linear'
                      //       once/if it exists in Easing.js
                      var curve =
                        animate.attributes['curve'] &&
                        animate.attributes['curve'].value !== 'linear' 
                        ? Easing[animate.attributes['curve'].value]
                        : function(j) {return j;}; //linear

                      //assign the modifier functions
                      if(animate.attributes['field']){
                        var field = animate.attributes['field'].value;

                        var lowerBound =
                        animate.attributes['timelinelowerbound']
                          ? parseFloat(animate.attributes['timelinelowerbound'].value)
                          : 0;

                        var upperBound =
                          animate.attributes['timelineupperbound']
                          ? parseFloat(animate.attributes['timelineupperbound'].value)
                          : 1;

                        if(!animate.attributes['startvalue'])
                          throw 'you must provide a start value for the animation'
                        var startValue = scope.$eval(animate.attributes['startvalue'].value);

                        if(!animate.attributes['endvalue'])
                          throw 'you must provide an end value for the animation'
                        var endValue = scope.$eval(animate.attributes['endValue'].value);

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
                        segments.sort(function(a, b){
                          return a.lowerBound - b.lowerBound;
                        });

                        //Check domain overlap:
                        //after sorting by lowerBounds, if any segment's lower bound
                        //is lower than the lower bound of any item before it, domains are
                        //overlapping
                        for(var j = 1; j < segments.length; j++){
                          var lower = segments[j].lowerBound;
                          for(var k = 0; k < j; k++){
                            if(lower < segments[k].upperBound){
                              throw "Animate segments have overlapping \
                                domains for the same field (" + field + "). \
                                At any point in the timeline, only one <animate> \
                                can affect a given field on the same modifier."
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
                        var transformFunction = function(){
                          var x = isolate.timeline() || 0;
                          var relevantIndex = 0;
                          var relevantSegment = segments[relevantIndex];

                          for(var j = 0; j < segments.length; j++){
                            //this is the relevant segment if x is in the subdomain
                            if(x >= segments[j].lowerBound && x <= segments[j].upperBound){
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if it is the last one
                            if(j === segments.length - 1){
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if x is greater than its upper
                            //bound but less than the next segment's lower bound
                            if(x >= segments[j].upperBound && x < segments[j + 1].lowerBound){
                              relevantSegment = segments[j];
                              break;
                            }
                          }

                          if(x <= relevantSegment.lowerBound)
                            return relevantSegment.startValue;
                          if(x >= relevantSegment.upperBound)
                            return relevantSegment.endValue; 
                          //normalize our domain to [0, 1]
                          var subDomain = (relevantSegment.upperBound - relevantSegment.lowerBound)
                          var normalizedX = (x - relevantSegment.lowerBound) / subDomain;

                          //Support interpolating multiple values, e.g. for a Scale array [x,y,z]
                          if(Array.isArray(relevantSegment.startValue)){
                            var ret = [];
                            for(var j = 0; j < relevantSegment.startValue.length; j++){
                              ret.push(
                                relevantSegment.startValue[j] + relevantSegment.curve(normalizedX)
                                *
                                (relevantSegment.endValue[j] - relevantSegment.startValue[j])
                              );
                            }
                            return ret;
                          }else{
                            return relevantSegment.startValue
                              + relevantSegment.curve(normalizedX)
                              * (relevantSegment.endValue
                              - relevantSegment.startValue);
                          }
                        };

                        var transformComponents = modDecs.transformComponents = modDecs.transformComponents || [];

                        if(field === 'opacity'){
                          modifier.opacityFrom(function(){
                            return transformFunction();
                          });
                        }else if (field === 'origin'){
                          modifier.originFrom(function(){
                            return transformFunction();
                          });
                        }else if (field === 'size'){
                          modifier.sizeFrom(function(){
                            return transformFunction();
                          });
                        }else{ //transform field
                          transformComponents.push({
                            field: field,
                            fn: transformFunction
                          })

                          modifier.transformFrom(function(){
                            var usedFields = {};
                            var mult = getTransform && getTransform() ? [getTransform()] : [];
                            for(var j = 0; j < transformComponents.length; j++){
                              ((function(){
                                var f = transformComponents[j].field;
                                if(!usedFields[f]){
                                  var transVal = transformComponents[j].fn();

                                  if(Array.isArray(transVal))
                                    mult.push(Transform[f].apply(this, transVal));
                                  else
                                    mult.push(Transform[f](transVal));  
                                  usedFields[f] = true;
                                }
                              })());
                            }

                            //Transform.multiply fails on arrays of <=1 matricies
                            if(mult.length === 1)
                              return mult[0]
                            else
                              return Transform.multiply.apply(this, mult);
                          });
                        }
                      }
                    });
                  }

                })();
                
              }
            }, 1)//end setTimeout
          }

        }

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
 * it is inside of a {@link api/directive/faSurface fa-surface} directive.
 *
 * @usage
 * ```html
 * <fa-app ng-controller="MyCtrl">
 *   <!-- other fa- scene graph components -->
 * </fa-app>
 * ```

 * Fa-app creates a Famous context, the root of the Render Tree.  In the html, it appears as a div with the css class "famous-container". 
 * Elements (such as fa-modifier's & fa-surface's) nested within an <fa-app> are added to this root context. 
 *   
 * Declaring fa-app appends a div with the class of "famous-angular-container" to the DOM.  It then instantiates a Context via Famous' Engine createContext method, passing in the famous-angular-container div, resulting in a Famous context that renderables can be added to.
 * 
 * Nesting an fa-app within another fa-app is possible, and the use case of this approach would be for content overflow.
 * Declaring multiple fa-app's within a page is permitted, but each extra results in a penalty to performance, and fa-app's should definitely not be declared within an ng-repeat.

Fa-app can be declared on its own or within another element.  

Note:  Right now, the element fa-app is declared within must have a height and width styling, declared inline or as a css declaration in an external stylesheet.

```html
<fa-app style="width: 320px; height: 568px;">
</fa-app>
```

*/

angular.module('famous.angular')
  .directive('faApp', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div style="display: none;"><div></div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            var View = $famous['famous/core/View'];
            var Engine = $famous['famous/core/Engine'];
            var Transform = $famous['famous/core/Transform']

            
            element.append('<div class="famous-angular-container"></div>');
            isolate.context = Engine.createContext(element[0].querySelector('.famous-angular-container'));

            function AppView(){
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function(data) {
              var transforms = [];
              if (data.mod().translate && data.mod().translate.length) {
                var values = data.mod().translate.map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            isolate.view = new AppView();
            isolate.context.add(isolate.view);

            //HACK:  Since Famo.us Engine doesn't yet
            //support unregistering contexts, this will keep
            //the context from getting updated by the engine
            scope.$on('$destroy', function(){
              isolate.context.update = angular.noop;
            })


            //TODO:  What if the actual scope hierarchy
            //were angular $watched instead of using eventing?
            //Could write a function that traverses angular's scopes
            //and returns a hash-like
            //representation of render-node-containing $scopes
            //(via their isolate objects.)  Then, tweak the scene
            //graph as needed when it sees changes.
            //This would make e.g. reflowing elements in a scrollview
            //more elegant than the current approach, but would
            //require a bit of replumbing.  Would need to investigate
            //the overhead of $watching a potentially complex scene graph, too
            scope.$on('registerChild', function(evt, data){
              isolate.view.add(data.renderNode);
              evt.stopPropagation();
            })
          },
          post: function(scope, element, attrs){

            var isolate = $famousDecorator.ensureIsolate(scope);
            transclude(scope, function(clone) {
	            angular.element(element[0].querySelectorAll('div div')[0]).append(clone);
            });
            isolate.readyToRender = true;
          }
        }
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
 * Example:
 * ```javascript
 * $scope.myClickHandler = function(){
 *   console.log('clicked') // clicked
 * }
 * ```
 * ```html
 * <fa-surface fa-click="myClickHandler()">Click me</fa-surface>
 * ```
 */

angular.module('famous.angular')
  .directive('faClick', ["$parse", "$famousDecorator",function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            if (attrs.faClick) {
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("click", function(data) {
                var fn = $parse(attrs.faClick);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faFlipper
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us Flipper containing the
 * specified front and back elements. The provided `options` object
 * will pass directly through to the Famo.us Flipper's
 * constructor.  See [https://famo.us/docs/0.2.0/views/Flipper/]
 *
 * @usage
 * ```html
 * <fa-flipper fa-options="scopeOptionsObject">
 *   <!-- two render nodes -->
 * </fa-flipper>
 * ```
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
              isolate.children = [];

              isolate.flip = function (overrideOptions) {
                isolate.renderNode.flip(overrideOptions || scope.$eval(attrs.faOptions));
              };

              scope.$on('$destroy', function() {
                scope.$emit('unregisterChild', {id: scope.$id});
              });
              
              scope.$on('registerChild', function (evt, data) {
                if (evt.targetScope.$id != scope.$id) {
                  var _childCount = isolate.children.length;
                  if (_childCount == 0) {
                    isolate.renderNode.setFront(data.renderNode);
                  }else if (_childCount == 1) {
                    isolate.renderNode.setBack(data.renderNode);
                  }else{
                    throw "fa-flipper accepts only two child elements; more than two have been provided"
                  }
                  isolate.children.push(data.renderNode);
                  evt.stopPropagation();
                };
              });

              //TODO:  handle unregisterChild
              scope.$on('unregisterChild', function(evt, data){
                if(evt.targetScope.$id != scope.$id){

                }
              });

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
 * constructor.  See [https://famo.us/docs/0.1.1/views/GridLayout/]
 *
 * @usage
 * ```html
 * <fa-grid-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-grid-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faGridLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var GridLayout = $famous["famous/views/GridLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new GridLayout(options);

            var updateGridLayout = function(){
              _children.sort(function(a, b){
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function(_children) {
	              var _ch = [];
	              angular.forEach(_children, function(c, i) {
		              _ch[i] = c.renderNode;
	              })
	              return _ch;
              }(_children));
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateGridLayout();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
	            _children = function(_children) {
		          var _ch = [];
		          angular.forEach(_children, function(c) {
			        if(c.id !== data.id) {
				      _ch.push(c);
			        }
		          });
		          return _ch;
	            }(_children);
                updateGridLayout();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
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
 */

angular.module('famous.angular')
  .directive('faImageSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var ImageSurface = $famous['famous/surfaces/ImageSurface'];
            var Transform = $famous['famous/core/Transform']
            var EventHandler = $famous['famous/core/EventHandler'];

            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties()
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            )

            isolate.getProperties = function(){
              return {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
              };
            };

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.renderNode = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var updateContent = function(){
              isolate.renderNode.setContent(attrs.faImageUrl)
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            scope.$emit('registerChild', isolate);
          }
        }
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
 * inside of a ViewSequence-based component, such as @link api/directive/faScrollView faScrollView}
 * or @link api/directive/faGridLayout faGridLayout}.  As a special case, when elements are added to
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
 */

angular.module('famous.angular')
  .directive('faIndex', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function(){
              return scope.$eval(attrs.faIndex)
            }, function(){
              isolate.index = scope.$eval(attrs.faIndex)
            });
          }
        }
      }
    };
  }]);
/**
 * @ngdoc directive
 * @name faModifier
 * @module famous.angular
 * @restrict EA
 * @param {Array|Function} faRotate  -  Array of numbers or function returning an array of numbers to which this Modifier's rotate should be bound.
 * @param {Number|Function} faRotateX  -  Number or function returning a number to which this Modifier's rotateX should be bound
 * @param {Number|Function} faRotateY  -  Number or function returning a number to which this Modifier's rotateY should be bound
 * @param {Number|Function} faRotateZ  -  Number or function returning a number to which this Modifier's rotateZ should be bound
 * @param {Array|Function} faScale  -  Array of numbers or function returning an array of numbers to which this Modifier's scale should be bound
 * @param {Array|Function} faSkew  -  Array of numbers or function returning an array of numbers to which this Modifier's skew should be bound
 * @param {Array|Function} faAboutOrigin  -  Array of arguments (or a function returning an array of arguments) to pass to Transform.aboutOrigin
 * @param {Number|Function} faPerspective  -  Number or array returning a number to which this modifier's perspective (focusZ) should be bound.
 * @param {Transform} faTransform - Manually created Famo.us Transform object (an array) that can be passed to the modifier.  *Will override all other transform attributes.*
 * @param {Number|Function|Transitionable} faOpacity  -  Number or function returning a number to which this Modifier's opacity should be bound
 * @param {Array|Function|Transitionable} faSize  -  Array of numbers (e.g. [100, 500] for the x- and y-sizes) or function returning an array of numbers to which this Modifier's size should be bound
 * @param {Array|Function|Transitionable} faOrigin  -  Array of numbers (e.g. [.5, 0] for the x- and y-origins) or function returning an array of numbers to which this Modifier's origin should be bound
 * @param {Array|Function|Transitionable} faAlign  -  Array of numbers (e.g. [.5, 0] for the x- and y-aligns) or function returning an array of numbers to which this Modifier's align should be bound
 * @param {Array.String} faTransformOrder  -  Optional array of strings to specify which transforms to apply and in which order. (e.g. `fa-transform-order="['rotateZ', 'translate', 'scale']"`)  Default behavior is to evaluate all supported transforms and apply them in alphabetical order.
 * @description
 * This directive creates a Famo.us Modifier that will affect all children render nodes.  Its properties can be bound
 * to values (e.g. `fa-translate="[15, 20, 1]"`, Famo.us Transitionable objects, or to functions that return numbers.
 * @usage
 * ```html
 * <fa-modifier fa-opacity=".25" fa-skew="myScopeSkewVariable" fa-translate="[25, 50, 2]" fa-scale="myScopeFunctionThatReturnsAnArray">
 *   <!-- Child elements of this fa-modifier will be affected by the values above -->
 *   <fa-surface>I'm translucent, skewed, rotated, and translated</fa-surface>
 * </fa-modifier>
 * ```

* @example
## The order of transforms matter 
### Fa-Transform-order

* Fa-transform-order can be used to specify the order of transforms on a modifier.  In the first example below, the translate is applied first, translating the box over to the right, and then it is rotated around its origin.

* In the second example, the rotation happens first, and then the translation is calculated in relation to the origin that has been rotated.

* If fa-transform-order is not specified and there are multiple transforms on a modifier, they will be be transformed in alphabetical order of their properties (e.g. "r" in rotate comes before "t" in translate).

```html
<fa-modifier fa-transform-order="['translate', 'rotateZ']" fa-rotate-z="0.3" fa-translate="[100, 0, 0]" fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'"></fa-surface>
</fa-modifier>

<fa-modifier fa-transform-order="['rotateZ', 'translate']" fa-rotate-z="0.3" fa-translate="[100, 0, 0]" fa-size="[100, 100]">
  <fa-surface fa-background-color="'blue'"></fa-surface>
</fa-modifier>
```

 * You can also specify the order of transforms by nesting modifiers.  For instance, if you translate an element and then rotate it, the result will be different than if you had rotated it and then translated it. 

 * ```html
 * <fa-modifier fa-translate="[100, 100]">
 *    <fa-modifier fa-rotate-z=".6" fa-size="[100, 100]">
 *      <fa-surface fa-background-color="red"></fa-surface>
 *    </fa-modifier>
 * </fa-modifier>
 *
 *  <fa-modifier fa-rotate-z=".6">
 *    <fa-modifier fa-translate="[100, 100]" fa-size="[100, 100]">
 *      <fa-surface class="red"></fa-surface>
 *    </fa-modifier>
 *  </fa-modifier>
 * ```

## Values for fa-modifier attributes

Fa-modifier properties, (such as faRotate, faScale, etc) can be bound to number/arrays, object properties defined on the scope, or function references.

### Number/Array values
* Fa-modifier properties can be bound to number/array values.

* ```html
*  <fa-modifier fa-origin="[.5,.5]" fa-size="[100, 100]" fa-rotate=".3">
*    <fa-surface fa-background-color="'red'"></fa-surface>
*  </fa-modifier>
* ```

### Object properties on the scope
*Fa-modifier properties can be bound to object properties defined on the scope.

* ```html
*<fa-modifier fa-origin="boxObject.origin" fa-size="boxObject.size">
*    <fa-surface fa-background-color="'red'"></fa-surface>
*  </fa-modifier>
* ```
* ```javascript
$scope.boxObject = {
*    origin: [.4, .4],
*    size: [50, 50]
*  }
* ```

### Functions
* Fa-modifier properties can be bound to a function on the scope that returns a value.

* ```html
* <fa-modifier fa-origin="genBoxOrigin">
*   <fa-surface fa-background-color="'red'"></fa-surface>
* </fa-modifier>
* ```

* ```javascript
* $scope.getX = function() {
*   return .2;
* };
* $scope.getY = function() {
*   return .3;
* }
* $scope.genBoxOrigin = function() {
*   return [$scope.getX(), $scope.getY()];
* };
* ```

### Fa-transform
* Fa-transform can be used to directly pass a 16-element transform matrix to a fa-modifier:
* 
* Passed as an array:

* ```html
* <fa-modifier 
*     fa-transform="[1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1]"
*     fa-size="[100, 100]">
*   <fa-surface fa-background-color="'red'"></fa-surface>
* </fa-modifier>
* ```

Passed as an object on the scope:

* ```javascript
* $scope.matrix = [1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1];
* ```
* ```html
* <fa-modifier fa-transform="matrix" fa-size="[50, 50]">
*   <fa-surface fa-background-color="'green'"></fa-surface>
* </fa-modifier>
* ```

Fa-transform will also accept a transitionable object that returns a 16-element matrix array:

* ```javascript
* $scope.matrixTrans = new Transitionable([1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1]);
* ```

* ```html
* <fa-modifier fa-transform="matrixTrans.get()" fa-size="[30, 30]">
*   <fa-surface fa-background-color="'blue'"></fa-surface>
* </fa-modifier>
* ```

### Animating properties
* Remember that Famous surfaces are styled with position:absolute, and their positions are defined by matrix3d webkit transforms.  Modifiers are to be used to hold onto size, transform, origin, and opacity states, and also to be animated.
* As per vanilla Famous, you should animate properties of modifiers, such as transform, align, opacity, etc, rather than on the surface itself, as modifiers are responsible for layout and visibility.  
* ```html
*   <fa-modifier fa-rotate-z="boxA.rotate.get()">
*     <fa-surface fa-click="animateBoxA()" fa-background-color="'red'"></fa-surface>
*   </fa-modifier>
* ```
*/

angular.module('famous.angular')
  .directive('faModifier', ["$famous", "$famousDecorator", "$parse", function ($famous, $famousDecorator, $parse) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 2,
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        return {
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            var RenderNode = $famous['famous/core/RenderNode']
            var Modifier = $famous['famous/core/Modifier']
            var Transform = $famous['famous/core/Transform']

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            //TODO:  make a stand-alone window-level utility
            //       object to store stuff like this
            /* Copied from angular.js */
            var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
            var MOZ_HACK_REGEXP = /^moz([A-Z])/;
            function camelCase(name) {
              return name.
                replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
                  return offset ? letter.toUpperCase() : letter;
                }).
                replace(MOZ_HACK_REGEXP, 'Moz$1');
            }
            var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
            function directiveNormalize(name) {
              return camelCase(name.replace(PREFIX_REGEXP, ''));
            }
            /* end copy from angular.js */

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

            attrs.$observe('faTransformOrder', function(){
              var candidate = scope.$eval(attrs.faTransformOrder);
              if(candidate !== undefined) _transformFields = candidate;
            });

            var _parsedTransforms = {};
            angular.forEach(_transformFields, function(field){
              var attrName = directiveNormalize('fa-' + field);
              attrs.$observe(attrName, function(){
                _parsedTransforms[field] = $parse(attrs[attrName]);
              })
            })


            var _transformFn = angular.noop;
            attrs.$observe('faTransform', function(){
              _transformFn = $parse(attrs.faTransform);
            });
            isolate.getTransform = function() {
              //if faTransform is provided, return it
              //instead of looping through the other transforms.
              var override = _transformFn(scope);
              if(override !== undefined){
                if(override instanceof Function) return override();
                else if(override instanceof Object && override.get !== undefined) return override.get();
                else return override;
              }

              var transforms = [];
              angular.forEach(_transformFields, function(field){
                var candidate = _parsedTransforms[field] ? _parsedTransforms[field](scope) : undefined;
                if(candidate !== undefined){
                  //TODO:feat Support Transitionables
                  if(candidate instanceof Function) candidate = candidate();
                  if(candidate instanceof Array) transforms.push(Transform[field].apply(this, candidate))
                  else transforms.push(Transform[field].call(this, candidate));
                }
              });

              if(!transforms.length) return undefined;
              else if (transforms.length === 1) return transforms[0]
              else return Transform.multiply.apply(this, transforms);
            };

            var _alignFn = angular.noop;
            attrs.$observe('faAlign', function(){
              _alignFn = $parse(attrs.faAlign);
            });
            isolate.getAlign = function(){
              var ret = _alignFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else return ret;
            }

            var _opacityFn = angular.noop;
            attrs.$observe('faOpacity', function(){
              _opacityFn = $parse(attrs.faOpacity);
            });
            isolate.getOpacity = function(){
              var ret = _opacityFn(scope);
              if(ret === undefined) return 1;
              else if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else return ret;
            }

            var _sizeFn = angular.noop;
            attrs.$observe('faSize', function(){
              _sizeFn = $parse(attrs.faSize);
            });
            isolate.getSize = function(){
              var ret = _sizeFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else return ret;
            }

            var _originFn = angular.noop;
            attrs.$observe('faOrigin', function(){
              _originFn = $parse(attrs.faOrigin);
            });
            isolate.getOrigin = function(){
              var ret = _originFn(scope);
              if(ret instanceof Function) return ret();
              else if(ret instanceof Object && ret.get !== undefined) return ret.get();
              else return ret;
            }
            
            isolate.modifier = new Modifier({
              transform: isolate.getTransform,
              size: isolate.getSize,
              opacity: isolate.getOpacity,
              origin: isolate.getOrigin,
              align: isolate.getAlign
            });

            isolate.renderNode = new RenderNode().add(isolate.modifier)

            scope.$on('$destroy', function() {
              isolate.modifier.setOpacity(0);
              scope.$emit('unregisterChild', {id: scope.$id});
            });
            
            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id !== evt.currentScope.$id){
                isolate.renderNode.add(data.renderNode);
                evt.stopPropagation();
              }
            })

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);

            // Trigger a $digest loop to make sure that callbacks for the
            // $observe listeners are executed in the compilation phase.
            if(!scope.$$phase) scope.$apply();
          }
        }
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
#Examples

##ScrollView example

* In Famous, events are used to move information between widgets (such as ScrollView) and Views, and to listen to DOM events.
* To pass information between two unrelated views, or even between a nested View to its parent, use fa-pipe-to and fa-pipe-from to broadcast and receive events.
* 
* In the example below, even though a fa-view, fa-modifier, and fa-surface are all nested within a Scroll View, the events (such as touch or scroll) from its children do not propagate upwards.
* Note:  This example will not work.

```html
<fa-scroll-view>
    <fa-view ng-repeat="view in views">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'blue'"></fa-surface>
        </fa-modifier>
    </fa-view>
 </fa-scroll-view>
 ```

* With piping, all events from the element using fa-piped-from are broadcast downstream to the view piped-to if they share a reference to the same event handler on the controller.
* 
* In the example below, events from the fa-surface are piped to fa-scroll-view via fa-pipe-to and fa-pipe-from directives.
* 'eventHandler' refers to an instantiated EventHandler on the scope.  Fa-pipe-to="eventHandler" pipes the fa-surface's event handler to a source event handler, $scope.eventHandler.
* Fa-pipe-from declared on the fa-scroll-view pipes the target event handler, $scope.eventHandler, to this fa-scroll-view's event handler.  

```html
<fa-scroll-view fa-pipe-from="eventHandler">
    <fa-view ng-repeat="view in views">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'blue'"
                      fa-pipe-to="eventHandler">
          </fa-surface>
        </fa-modifier>
    </fa-view>
</fa-scroll-view>
```

```javascript
var EventHandler = $famous['famous/core/EventHandler'];
$scope.eventHandler = new EventHandler();
```

* ##Event Handlers on the Controller
* 
* In the example below, there are two views, each with one surface.  In the html, the second view has a fa-pipe-from directive with a reference to "eventHandlerB" on the controller.  
* 
* Two event handlers are instantiated on the controller.  EventHandlerA explicitly pipes to eventHandlerB using:  "eventHandlerA.pipe(eventHandlerB)".
* If this is not done, eventHandlerB will not receive any events from eventHandlerA.
* 
* Via fa-click, if the fa-surface on the first view is clicked, it calls surfaceClick(), which causes eventHandlerA to emit 'myEvent'.
* Because evenHandlerA pipes to eventHandlerB, eventHandlerB receives 'myEvent'.  
* 
* An event handler for 'myEvent' is declared for eventHandlerB, and when eventHandlerB receives a 'myEvent' event, its handler causes it to translate the fa-surface on the second view.

```html
<fa-view>
  <fa-modifier fa-size="[100, 100]">
      <fa-surface fa-background-color="'blue'" fa-click="surfaceClick()"></fa-surface>
    </fa-modifier>
</fa-view>
<fa-view fa-pipe-from="eventHandlerB">
  <fa-modifier fa-size="[100, 100]" fa-translate="redTrans.get()">
      <fa-surface fa-background-color="'red'"></fa-surface>
  </fa-modifier>
</fa-view>
```

```javascript
var eventHandlerA = new EventHandler();
var eventHandlerB = new EventHandler();
eventHandlerA.pipe(eventHandlerB);

$scope.surfaceClick = function() {
  eventHandlerA.emit('myEvent');
};

eventHandlerB.on('myEvent', function() {
  $scope.redTrans.set([0, 200, 0], {duration: 2000, curve: 'easeInOut'})
});
```

* ##Changing Pipes based on user interaction
* 
* Another feature of fa-pipe-to and fa-pipe-from is the ability to switch pipes.
* 
* Using fa-pipe-to & fa-pipe-from involves binding it to a reference of source/target event handler on the controller.
* If the event handler that fa-pipe-to/fa-pipe-to is bound to changes, the directives unpipes from that event handler, and can pipe to another event handler.
* 
* Below is an example with piping that involves switching pipes based on user interaction.
* 
* Touch events from a single directional pad conditionally affect three different Scroll Views on a page.
* Based on which checkboxes are checked, the directional pad scroll events will affect either Scroll View #1, Scroll View #2, or Scroll View #3.
* The pipes are databound using fa-pipe-to and fa-pipe-from, and they are swapped out using the controller.
* 
* 
* This directive pipes a target event handler to an element's event handler.
* There are two main fa-views: the directional pad which contains a Scroll View, and the other fa-view that contains 3 Scroll Views.
* The Scroll View of the directional pad uses fa-pipe-from to pipe events from mainPipe to the Scroll View's event handler.
* The surface within the directional pad uses fa-pipe-to to pipe fa-surface events to mainPipe.
* 
* In the second view containing 3 Scroll Views, each Scroll View pipes from $scope.emptyPipe by default, another instantiated EventHandler that has no events piped to it.  


```html
<fa-view>
  <fa-scroll-view fa-pipe-from="mainPipe">
    <fa-modifier fa-translate="[0, 0, 15]" fa-size="[320, 50]">
      <fa-view>
        <fa-modifier>
          <fa-surface fa-background-color="'orange'" fa-pipe-to="mainPipe">
            <div>Directional pad</div>
              <span ng-repeat="input in inputList">
                <label>{{input.letter}}</label>
                <input type="checkbox"
                       ng-model="input.model" 
                       name="scrollPipeTo" 
                       ng-change="checkBoxChange(input.letter, input.model)"
                       ng-true-value="true"
                       ng-false-value="false">
              </span>
          </fa-surface>
        </fa-modifier>
      </fa-view>
    </fa-modifier>
  </fa-scroll-view>
</fa-view>
<fa-view>
  <fa-modifier ng-repeat="sView in scrollViews"
               fa-translate="[100 * $index, 50, 0]">
    <fa-view>
      <fa-scroll-view fa-pipe-from="{{sView.pipe}}" fa-options="options.scrollViewTwo">
        <fa-view ng-repeat="items in list">
          <fa-modifier fa-size="[100, 100]">
              <fa-surface fa-background-color="sView.bgColor">
                Index: {{$index}}
              </fa-surface>
            </fa-modifier>
        </fa-view>
       </fa-scroll-view>   
    </fa-view>
  </fa-modifier>
</fa-view>
```html

* The directional pad has a list of input checkboxes created by an ng-repeated list from $scope.inputList.
* If a checkbox is checked, it calls checkBoxChange(), passing the letter (such as 'A') and and the model (such as 'checkBox.A') of the respective checkbox.
* If the checkbox is checked, the model (checkBox.A) is assigned the value of "true", and if it is unchecked, it is asigned the value of "false".
* 
* In the controller, $scope.checkBoxChange() changes the value of the pipe of the respective Scroll View that corresponds to the checkBox model: if the checkbox is checked, it assigns the respective Scroll View to pipe from $scope.mainPipe, and if unchecked, it will continue to pipe from $scope.emptyPipe.

```javascript
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

// 3 scrollviews
$scope.scrollViews = [{pipe: "pipes.A", bgColor: "blue"}, {pipe: "pipes.B", bgColor: "red"}, {pipe: "pipes.C", bgColor: "green"}];

// pipes that each of the 3 scroll views is binded to through fa-pipe-from
$scope.pipes = {
  A: $scope.emptyPipe,
  B: $scope.emptyPipe,
  C: $scope.emptyPipe
};

// function that is called whenever a checkbox is checked/unchecked that assigns the fa-pipe-from
$scope.checkBoxChange = function(model, value) {
  if (value !== "false") {
    $scope.pipes[model] = $scope.mainPipe;
  } else {
    $scope.pipes[model] = $scope.emptyPipe;
  };
};
```
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
                var source = isolate.renderNode || Engine;
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
        }
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
                var target = isolate.renderNode || Engine;
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
        }
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faRenderNode
 * @module famous.angular
 * @restrict EA
 * @description
 * A directive to insert a {@link https://famo.us/docs/0.1.1/core/RenderNode/ Famo.us RenderNode} that is
 * a wrapper for inserting a renderable component (like a Modifer or Surface) into the render tree.
 * It allows you to pass a reference to an arbitrary render node from your controller.
 * @usage
 * ```html
 * <fa-render-node fa-node="arbitrary render node reference">
 *     <!-- content -->
 * </fa-render-node>
 * ```
  
Fa-render-node can wrap a custom-made widget or any renderable component from Famous and allow it to be inserted in the Render Tree.  

In the example below, we instantiate a Famous View, add a Modifier to it, and add a surface to it - more in line with a "vanilla Famous" approach than the declarative approach with Famous-Angular.  

In the html view, we declare an fa-render-node with the name of our View on the scope, and it will appear on the page.

```html
<fa-render-node fa-node="masterView" id="render"></fa-render-node>
```

```javascript
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
```javascript

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

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.children = [];

            attrs.$observe('faPipeTo', function(val){
              var pipeTo = scope.$eval(val);
              if(pipeTo)
                Engine.pipe(pipeTo);
            })

            isolate.renderNode = scope.$eval(attrs.faNode);

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);

/**
 * @ngdoc directive
 * @name faScrollView
 * @module famous.angular
 * @restrict E
 * @description
 * This directive allows you to specify a {@link https://famo.us/docs/0.1.1/views/Scrollview/ famo.us Scrollview}
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

 @example

 ScrollView + Events + ng-repeat
 ---------------------------------
 In the example below, fa-scrollview displays a collection of nested fa-views generated by an ng-repeat directive. 
 In Famous, events are used to move information between widgets (such as ScrollView) and nested views.
 When a nested view needs to trigger higher-order app behavior within another view (such as a widget), the best practice is to pass data via events.

 Input events are captured on surfaces, and it is up the developer to specify where the events will broadcast and receive events by piping.
 To use a scroll view, create a Famous EventHandler on the scope, pipe the surface events to the event handler using fa-pipe-to, and then pipe that event handler to the ScrollView using fa-pipe-from.
 This will enable scrolling by connecting input events from the surfaces to the Scroll View.

* ```javascript
* var EventHandler = $famous['famous/core/EventHandler'];
* $scope.eventHandler = new EventHandler();
*
* $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
* ```

* ```html
* <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.myScrollView">
*     <fa-view ng-repeat="item in list">
*        <fa-modifier id="{{'listItem' + $index}}" fa-translate="[0, 0, 0]" fa-size="[300, 300]">
*          <fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, undefined]" fa-background-color="'red'">
*            <div>{{item.content}}</div>
*          </fa-surface>
*        </fa-modifier>
*     </fa-view> 
*  </fa-scroll-view>  
* ```

To specify (optional) configurable options for the Scroll View, pass in an object on the scope.
Notable options include clipSize, which specifies the size of the area in pixels that the ScrollView will display content in, and direction, which specifies whether the nested views will scroll horizontally or vertically (1 is vertical, 0 is horizontal).
A full list of configurable options for Scroll View may be found at https://famo.us/docs/0.2.0/views/Scrollview/.

* ```javascript
* var EventHandler = $famous['famous/core/EventHandler'];
* $scope.eventHandler = new EventHandler();
* $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
*
* $scope.options = {
*   myScrollView: {
*     clipSize: 568,
*     paginated: true,
*     speedLimit: 5,
*     direction: 1,
*   }
* };
* ```

ScrollView with explicitly created views
-----------------------------------------
In this example below, a scrollview is created with two nested fa-view's, both of which have an fa-index of 0 and 1, respectively.
Fa-index determines the order of which the surfaces appear in the sequential view.
If fa-index is declared explicitly, it will override any default order of elements declared in html.
As in the example below, the fa-view with the blue background color appears after the one with the red background because its fa-index is set to 1.
If fa-views are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.

The scrollView directive accepts another directive called fa-start-index as an attribute, and this determines which view the scrollView displays by default.
Fa-start-index will not affect the sequential order of the layout; the view with the red background will be layed out first, followed by the view with the blue background.
With this attribute set to 1, the scroll view will display the view with the index of 1, which is the view with the blue background color. 

* ```html
  <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewTwo" fa-start-index="1">
    <fa-view fa-index="1">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'blue'" fa-pipe-to="eventHandler"></fa-surface>
        </fa-modifier>
    </fa-view>
    <fa-view fa-index="0">
      <fa-modifier fa-size="[320, 320]">
          <fa-surface fa-background-color="'red'" fa-pipe-to="eventHandler"></fa-surface>
        </fa-modifier>
    </fa-view>
   </fa-scroll-view>    
* ```

* ```javascript
* var EventHandler = $famous['famous/core/EventHandler'];
* $scope.eventHandler = new EventHandler();
* $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
*
$scope.options = {
  scrollViewTwo: {
    direction: 0
  }
};
* ```

Multiple scroll views
---------------------
Combining both approaches above (a scrollview with ng-repeated views, and one with two explicitly created views), one can can nest a ScrollView within another ScrollView.
A Scroll View is a widget that displays a collection of views sequentially - it is agnostic about the views that are inside of it; it only requires that events are piped from surfaces to the ScrollView.

In the example below, the outer scrollview contains two explictly created views.  One of those views contains a scrollview with sub-views created through an ngRepeat directive.
The outer ScrollView is passed an option for its direction to be horizontal (0), and the inner ScrollView is passed an option for a vertical direction (1).

* ```html
<fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewOuter">

  <fa-view fa-index="0" id="sideBar">
    <fa-modifier fa-size="[320, 320]" id="sideBarMod">
        <fa-surface fa-background-color="'blue'" fa-pipe-to="eventHandler" fa-size="[undefined, undefined]"></fa-surface>
      </fa-modifier>
  </fa-view>

  <fa-view fa-index="1" id="main">
    <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollViewInner">
      <fa-view ng-repeat="item in list">
         <fa-modifier fa-size="[300, 300]" id="{{'item' + $index + 'Mod'}}">
           <fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, undefined]" fa-background-color="'red'">
             <div>{{item.content}}</div>
           </fa-surface>
         </fa-modifier>
      </fa-view> 
    </fa-scroll-view>  
  </fa-view>
   
 </fa-scroll-view>   
* ```

* ```javascript
* var EventHandler = $famous['famous/core/EventHandler'];
* $scope.eventHandler = new EventHandler();
* $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
*
  $scope.options = {
    scrollViewOuter: {
      direction: 0,
      paginated: true
    },
    scrollViewInner :{
      direction: 1
    }
  };
* ```

 */

angular.module('famous.angular')
  .directive('faScrollView', ['$famous', '$famousDecorator', '$timeout', function ($famous, $famousDecorator, $timeout) {
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

            var updateScrollview = function(init){
              //$timeout hack used here because the
              //updateScrollview function will get called
              //before the $index values get re-bound
              //through ng-repeat.  The result is that
              //the items get sorted here, then the indexes
              //get re-bound, and thus the results are incorrectly
              //ordered.
              $timeout(function(){
                _children.sort(function(a, b){
                  return a.index - b.index;
                }); 

                var options = {
                  array: function(_children) {
	                  var _ch = [];
	                  angular.forEach(_children, function(c, i) {
		                  _ch[i] = c.renderNode;
	                  })
	                  return _ch;
                  }(_children)
                };
                //set the first page on the scrollview if
                //specified
                if(init)
                  options.index = scope.$eval(attrs.faStartIndex);
                
                var viewSeq = new ViewSequence(options);
                isolate.renderNode.sequenceFrom(viewSeq);

              })
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateScrollview(true);
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){

	            _children = function(_children) {
		          var _ch = [];
		          angular.forEach(_children, function(c) {
			        if(c.id !== data.id) {
				      _ch.push(c);
			        }
		          });
		          return _ch;
	            }(_children);
                updateScrollview();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
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
 * @name faSequentialLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us SequentialLayout containing the 
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us faSequentialLayout's
 * constructor.  See [https://famo.us/docs/0.2.0/views/SequentialLayout/]
 *
 * @usage
 * ```html
 * <fa-sequential-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-sequential-layout>
 * ```
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

            var _updateSequentialLayout = function() {
              _children.sort(function(a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function(_children) {
                var _ch = [];
                angular.forEach(_children, function(c, i) {
                  _ch[i] = c.renderNode;
                });
                return _ch;
              }(_children));
            };

            scope.$on('registerChild', function (evt, data) {
              if (evt.targetScope.$id != scope.$id) {
                _children.push(data);
                _updateSequentialLayout();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function (evt, data) {
              if (evt.targetScope.$id != scope.$id) {
                _children = function (_children) {
                  var _ch = [];
                  angular.forEach(_children, function (c) {
                    if (c.id !== data.id) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                _updateSequentialLayout();
                evt.stopPropagation();
              }
            });

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
 * @name faSurface
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to create general Famo.us surfaces, which are the
 * leaf nodes of the scene graph.  The content inside
 * surfaces is what gets rendered to the screen.
 * This is where you can create form elements, attach
 * images, or output raw text content with one-way databinding {{}}.
 * You can include entire complex HTML snippets inside a faSurface, including
 * ngIncludes or custom (vanilla Angular) directives.
 *
 * @usage
 * ```html
 * <fa-surface>
 *   Here's some data-bound content '{{myScopeVariable}}'
 * </fa-surface>
 * ```

*@example
* ```html
*<fa-modifier fa-size="[960, undefined]">
*   <fa-surface fa-size="[undefined, undefined]">
*     <div ng-include src=" 'views/animations.html' "></div>
*   </fa-surface>
* </fa-modifier>
* ```

A simple ng-repeat of surfaces may look like this:
*@example
* ```html
<fa-modifier ng-repeat="item in list" fa-size="[100, 100]" fa-translate="[0, $index * 75, 0]">
    <fa-surface fa-size="[undefined, undefined]">
      {{item.content}}
    </fa-surface>
  </fa-modifier>
* ```

* ```javascript
$scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
* ```

*Common Problems
*---------------

Properties on surfaces vs modifiers
-----------------------------------
You may expect to animate properties such as size or origin.  However, with Famous, properties related to layout and visibility belong on the modifier, and the surface should be nested below the modifier.
While you can specify fa-size as well as some other layout/visibility properties on surfaces themselves, it is not recommended.

This is not best practice:

*@example
 * ```html
<fa-surface fa-size="[100, 100]"></fa-surface>
 * ```

Whereas this is the preferred approach: 
*@example
 * ```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-size="[undefined, undefined]">
  </fa-surface>
</fa-modifier>
 * ```

You may also omit fa-size="[undefined, undefined]" on the surface and the surface will still fill the size of the modifier, in this case, [100, 100].

In Famous' Render Tree, modifiers modify all the nodes below them.  By setting the fa-surface's fa-size to [undefined, undefined], it will inherit from the fa-modifier's fa-size of [100, 100]. 

Fa-surfaces also cannot have an fa-size/fa-rotate/etc, assigned to a function, as is in the case of modifiers, which can take number/array or a function, and sometimes a transitionable object.
For example, this will not work:
*@example
* ```html
<fa-surface fa-size="sizeForBoxFunction"></fa-surface>
* ```
* ```javascript
* $scope.sizeForBoxFunction = function() {
*      return [75, 75];
*    }
* ```

To reiterate, the best practice to set any layout/visibilty properties of a surface is to do so on a modifier that affects the surface.  Whereas a surface is for containing HTML content, whether rendered from a template, or data-bound with {{}}'s.
*<fa-modifier fa-size="[100, 100]">
*    <fa-surface fa-background-color="'red'"></fa-surface>
*  </fa-modifier>


 */



angular.module('famous.angular')
  .config(['$provide', '$animateProvider', function($provide, $animateProvider) {
    // Hook into the animation system to emit ng-class syncers to surfaces
    $provide.decorator('$animate', ['$delegate', '$$asyncCallback', '$famous', function($delegate, $$asyncCallback, $famous) {

      var Surface = $famous['famous/core/Surface'];

      /**
       * Check if the element selected has an isolate renderNode that accepts classes.
       * @param {Array} element - derived element
       * @return {boolean}
       */
      function isClassable(element) {
        return $famous.getIsolate(element.scope()).renderNode instanceof Surface;
      }

      // Fork $animateProvider methods that update class lists with ng-class
      // in the most efficient way we can. Delegate directly to irrelevant methods
      // (enter, leave, move). These method forks only get invoked when:
      // 1. The element has a directive like ng-class that is updating classes
      // 2. The element is an fa-element with an in-scope isolate
      // 3. The isolate's renderNode is some kind of Surface
      return {
        enabled: $delegate.enabled,
        enter: $delegate.enter,
        leave: $delegate.leave,
        move: $delegate.move,
        addClass: function(element, className, done) {
          $delegate.addClass(element, className, done);

          if (isClassable(element)) {
            angular.forEach(className.split(' '), function(splitClassName) {
              $famous.getIsolate(element.scope()).renderNode.addClass(splitClassName);
            });
          }
        },
        removeClass: function(element, className, done) {
          $delegate.removeClass(element, className, done);

          if (isClassable(element)) {
            angular.forEach(className.split(' '), function(splitClassName) {
              $famous.getIsolate(element.scope()).renderNode.removeClass(splitClassName);
            });
          }
        },
        setClass: function(element, add, remove, done) {
          $delegate.setClass(element, add, remove, done);

          if (isClassable(element)) {
            var surface = $famous.getIsolate(element.scope()).renderNode;
            // There isn't a good way to delegate down to Surface.setClasses
            // because Angular has already negotiated the list of items to add
            // and items to remove. Manually loop through both lists.
            angular.forEach(add.split(' '), function(className) {
              surface.addClass(className);
            });

            angular.forEach(remove.split(' '), function(className) {
              surface.removeClass(className);
            });
          }
        }
      }
    }]);
  }])
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

            var Surface = $famous['famous/core/Surface'];
            var Transform = $famous['famous/core/Transform']
            var EventHandler = $famous['famous/core/EventHandler'];
            
            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties()
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            )

            isolate.getProperties = function(){
              return {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
              };
            };

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              properties: isolate.getProperties()
            });

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }

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

            scope.$emit('registerChild', isolate);
          }
        }
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
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              var _dragging = false;

              renderNode.on("touchmove", function(data) {
                _dragging = true;
                return data;
              });

              renderNode.on("touchend", function(data) {
                if (!_dragging){
                  var fn = $parse(attrs.faTap);
                  fn(scope, {$event:data});
                  if(!scope.$$phase)
                    scope.$apply();
                }
                _dragging = false
              });
            }
          }
        }
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

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchend event firing, fa-touchend will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface; touchend fires upon release of the touch point.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchend="touchEnd($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchEndCounter = 0;
$scope.touchEnd = function($event) {
  touchEndCounter++;
  console.log($event);
  console.log("touchEnd: " + touchEndCounter);
};
qqq

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
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchend", function(data) {
                var fn = $parse(attrs.faTouchend);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });

            }
          }
        }
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

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchmove event firing, fa-touchmove will evaluate the expression bound to it.

Touchstart fires once upon first touch; touchmove fires as the touch point is moved along a touch surface, until release of the touch point.
The rate of which touchmove events fire is implementation-defined by browser and hardware.
Upon each firing, fa-touchmove evaluates the expression bound to it.

```html
<fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchmove="touchMove($event)"></fa-surface>
</fa-modifier>
```

```javascript
var touchMoveCounter = 0;
$scope.touchMove = function($event) {
  touchMoveCounter++;
  console.log($event);
  console.log("touchMove: " + touchMoveCounter);
};
```

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
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchmove", function(data) {
                var fn = $parse(attrs.faTouchmove);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
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

Note:  For testing purposes during development, enable mobile emulation: https://developer.chrome.com/devtools/docs/mobile-emulation

##Example
Upon a touchstart event firing, fa-touchstart will evaluate the expression bound to it.

Touchstart fires once when a touch point (finger) is first placed upon the touch surface.
If the touch point moves or releases touch, it will not fire a touchstart.
If the touch point is placed upon the touch surface again, it will fire another touchstart event.

```html
 <fa-modifier fa-size="[100, 100]">
  <fa-surface fa-background-color="'red'" fa-touchstart="touchStart($event)"></fa-surface>
</fa-modifier>
```
```javascript
  var touchStartCounter = 0;
  $scope.touchStart = function($event) {
    touchStartCounter++;
    console.log($event);
    console.log("touchStart: " + touchStartCounter);
  };
```
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
              var renderNode = (isolate.renderNode._eventInput || isolate.renderNode)

              renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchstart);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
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

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = $famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);
