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

 The order of transforms matter
 ------------------------------
 * You can specify the order of transforms by nesting modifiers.  For instance, if you translate an element and then rotate it, the result will be different than if you had rotated it and then translated it. 

 * ```html
 * <fa-modifier fa-translate="[100, 100]">
 *    <fa-modifier fa-rotate-z=".6" fa-size="[100, 100]">
 *      <fa-surface fa-background-color="red">translate --> rotate</fa-surface>
 *    </fa-modifier>
 * </fa-modifier>
 *
 *  <fa-modifier fa-rotate-z=".6">
 *    <fa-modifier fa-translate="[100, 100]" fa-size="[100, 100]">
 *      <fa-surface class="red"></fa-surface>
 *    </fa-modifier>
 *  </fa-modifier>
 * ```

Values for fa-modifier attributes
---------------------------------
Fa-modifier properties, (such as faRotate, faScale, etc) can be bound to number/arrays, object properties defined on the scope, or function references.

Number/Array values
-------------------
* @example
* fa-modifier properties can be bound to number/array values.
* html:
* ```html
*  <fa-modifier fa-origin="[.5,.5]" fa-size="[100, 100]" fa-rotate=".3">
*    <fa-surface fa-background-color="'red'"></fa-surface>
*  </fa-modifier>
 * ```

Object properties on the scope
------------------------------
 * @example
 *fa-modifier properties can be bound to object properties defined on the scope.
 * html:
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

Functions
---------
* @example
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

Animating properties
--------------------
* @example
* Remember that Famous surfaces are styled with position:absolute, and their positions are defined by matrix3d webkit transforms.  Modifiers are to be used to hold onto size, transform, origin, and opacity states, and also to be animated.
* As per vanilla Famous, you should animate properties of modifiers, such as transform, align, opacity, etc, rather than on the surface itself, as modifiers are responsible for layout and visibility.  
* ```html
*   <fa-modifier fa-rotate-z="boxA.rotate.get()">
*     <fa-surface fa-click="animateBoxA()" fa-background-color="'red'"></fa-surface>
*   </fa-modifier>
* ```

* @TODO You can also specify the order of transforms using faTransformOrder.
* @TODO fa-transform
* @TODO show that modifiers can modify modifiers below them, and all of this multiplies.  
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
