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
 *```javascript
 * $scope.myScopeSkewVariable = [0,0,.3];
 * $scope.myScopeFunctionThatReturnsAnArray = function() {
 *   return [0.5, 0.5];
 * };
 *```
 * @example
 * ## Values that fa-modifier attributes accept
 * `Fa-modifier` properties, (such as `faRotate`, `faScale`, etc) can be bound to number/arrays, object properties defined on the scope, function references, or function expressions.
 * Some properties (`faOpacity`, `faSize`, `faOrigin`, `faAlign`) can be bound to a Transitionable object directly.  
 * 
 * ### Number/Array values
 * `Fa-modifier` properties can be bound to number/array values.
 * ```html
 *  <fa-modifier fa-origin="[.5,.5]" fa-size="[100, 100]" fa-rotate=".3">
 *    <fa-surface fa-background-color="'red'"></fa-surface>
 *  </fa-modifier>
 * ```
 * ### Object properties on the scope
 *`Fa-modifier` properties can be bound to object properties defined on the scope.
 * ```html
 *<fa-modifier fa-origin="boxObject.origin" fa-size="boxObject.size">
 *    <fa-surface fa-background-color="'red'"></fa-surface>
 *  </fa-modifier>
 * ```
 * ```javascript
 * $scope.boxObject = {
 *    origin: [.4, .4],
 *    size: [50, 50]
 * }
 * ```
 * ### Function references
 * `Fa-modifier` properties can be bound to a function reference that returns a value.
 *
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
 * ### Function expressions
 * `Fa-modifier` properties can be bound to a function expression.  `boxTransitionable` is an instantiated `Transitionable` object with the value of `[0,0,0]`.
 * The `.get()` method is available to all `Transitionable` objects, and it returns an interpolated value of a transition at calltime.
 * When `fa-translate` calls `boxTransitionable.get()`, it returns `[0,0,0]`.
 * ```html
 * <fa-modifier fa-size="[100, 100]" fa-translate="boxTransitionable.get()">
 *   <fa-surface fa-background-color="'red'" fa-click="animate()"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * var Transitionable = $famous['famous/transitions/Transitionable'];
 * $scope.boxTransitionable = new Transitionable([0, 0, 0]);
 * ```
 *
 * ### Transitionables
 * Some properties (`faOpacity`, `faSize`, `faOrigin`, `faAlign`) can be bound to a `Transitionable` object directly.
 * ```html
 * <fa-modifier fa-size="[100, 100]" fa-opacity="opacityTrans">
 *   <fa-surface fa-background-color="'orange'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * $scope.opacityTrans = new Transitionable(.25);
 * ```
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
 *
 * ## Fa-transform
 * Whenever a "transform" https://famo.us/docs/0.2.0/core/Transform property is used on a `fa-modifier`, such as `fa-translate`, `fa-scale`, `fa-origin`, etc, their values are passed through a `Transform function` which returns a 16 element transform array.
 * `Fa-transform` can be used to directly pass a 16-element transform matrix to a `fa-modifier`.
 * 
 * ### Values that fa-transform accepts
 * Passed as an array:
 * ```html
 * <fa-modifier 
 *     fa-transform="[1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1]"
 *     fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * Passed as an object on the scope:
 * 
 * ```javascript
 * $scope.matrix = [1, .3, 0, 0, -.3, 1, 0, 0, 0, 0, 1, 0, 20, 110, 0, 1];
 * ```
 * ```html
 * <fa-modifier fa-transform="matrix" fa-size="[50, 50]">
 *   <fa-surface fa-background-color="'green'"></fa-surface>
 * </fa-modifier>
 * ```
 *
 * Passed as a function reference that returns a 16-element matrix3d webkit array:
 * ```html
 * <fa-modifier fa-transform="variousTransforms" fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * var Transform = $famous['famous/core/Transform'];
 * $scope.variousTransforms = function() {
 *   var translate = Transform.translate(100, 100, 0);
 *   var skew = Transform.skew(0, 0, 0.3);
 *   return Transform.multiply(translate, skew);
 * };
 * ```
 * `Transform` is a Famous math object used to calculate transforms.  It has various methods, such as `translate`, `rotate`, and `skew` that returns a 16-element matrix array.  `Transform.multiply` multiplies two or more Transform matrix types to return a final Transform 16-element matrix array, and this is what is passed into `fa-transform`.
 *
 * ###Fa-transform overrides other transform attributes
 * `Fa-transform` will override all other transform attributes on the `fa-modifier` it is used on:
 * ```html
 * <fa-modifier fa-transform="skewFunc" fa-translate="[100, 100, 0]" fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * $scope.skewFunc = function() {
 *   return Transform.skew(0, 0, 0.3);
 * };
 * ```
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
 * ```html
 * <fa-modifier fa-transform-order="['translate', 'rotateZ']" fa-rotate-z="0.3" fa-translate="[100, 0, 0]" fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * 
 * <fa-modifier fa-transform-order="['rotateZ', 'translate']" fa-rotate-z="0.3" fa-translate="[100, 0, 0]" fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'blue'"></fa-surface>
 * </fa-modifier>
 * ```
 * ### Nesting Modifiers
 * You can also specify the order of transforms by nesting Modifiers.  In the example below, each Mdifier has one Transform property (e.g. translate, rotate, skew, scale, etc).  Each Famous modifier affects all child nodes below it on the Render Tree. 
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
