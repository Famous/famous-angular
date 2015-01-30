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
 *     compile: function(tElement, tAttrs) {
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
      compile: function (tElement, tAttrs) {
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
