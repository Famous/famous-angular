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
 * @param {Transform} faTransform - Manually created Famo.us Transform object (an array) that can be passed to the modifier
 * @param {Number|Function} faOpacity  -  Number or function returning a number to which this Modifier's opacity should be bound
 * @param {Array|Function} faSize  -  Array of numbers (e.g. [100, 500] for the x- and y-sizes) or function returning an array of numbers to which this Modifier's size should be bound
 * @param {Array|Function} faOrigin  -  Array of numbers (e.g. [.5, 0] for the x- and y-origins) or function returning an array of numbers to which this Modifier's origin should be bound
 * @description
 * This directive creates a Famo.us Modifier that will affect all children render nodes.  Its properties can be bound
 * to numbers (including using Angular's data-binding, though this is discouraged for performance reasons)
 * or to functions that return numbers.  The latter is  preferred, because the reference to the function is passed
 * directly on to Famo.us, where only the reference to that function needs to be
 * watched by Angular instead of needing to $watch the values returned by the function.
 * @usage
 * ```html
 * <fa-modifier fa-opacity=".25" fa-skew="myScopeSkewVariable" fa-translate="[25, 50, 2]" fa-scale="myScopeFunctionThatReturnsAnArray">
 *   <!-- Child elements of this fa-modifier will be affected by the values above -->
 *   <fa-surface>I'm translucent, skewed, rotated, and translated</fa-surface>
 * </fa-modifier>
 * ```
 */

angular.module('famous.angular')
  .directive('faModifier', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
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

            //TODO:  refactor to remove the need for scope.$eval's on every property on every frame.
            //Instead, $scope.$watch the necessary values, and update a private reference, which
            //will be returned by the getTransform function.  Should further decouple Angular
            //digest overhead from Famo.us rendering performance.
            isolate.getTransform = function() {
              //var transforms = [Transform.translate(0, 0, 0)];
              var transforms = [];
              if (attrs.faTranslate) {
                var values = scope.$eval(attrs.faTranslate).map(get)
                transforms.push(Transform.translate.apply(this, values));
              }

              if(attrs.faRotate){
                var values = scope.$eval(attrs.faRotate).map(get)
                transforms.push(Transform.rotate.apply(this, values));
              }
              //only apply faRotateX, etc. if faRotate is not defined
              if (attrs.faRotateX){
                transforms.push(
                  Transform.rotateX(
                    get(
                      scope.$eval(attrs.faRotateX)
                    )
                  )
                );
              }
              if (attrs.faRotateY) {
                transforms.push(
                  Transform.rotateY(
                    get(
                      scope.$eval(attrs.faRotateY)
                    )
                  )
                );
              }
              if (attrs.faRotateZ) {
                transforms.push(
                  Transform.rotateZ(
                    get(
                      scope.$eval(attrs.faRotateZ)
                    )
                  )
                );
              }

              if (attrs.faScale){
                var values = scope.$eval(attrs.faScale).map(get)
                transforms.push(Transform.scale.apply(this, values));
              }

              
              if (attrs.faSkew) {
                var values = scope.$eval(attrs.faSkew).map(get)
                transforms.push(Transform.skew.apply(this, values));
              }

              if(!transforms.length)
                return undefined;
              else if (transforms.length === 1)
                return transforms[0]
              else
                return Transform.multiply.apply(this, transforms);
            };

            isolate.getOpacity = function(){
              if (attrs.faOpacity)
                return get(scope.$eval(attrs.faOpacity));
              return 1;
            }

            
            isolate.modifier = new Modifier({
              transform: isolate.getTransform,
              size: scope.$eval(attrs.faSize),
              opacity: isolate.getOpacity,
              origin: scope.$eval(attrs.faOrigin)
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
          }
        }
      }
    };
  }]);
