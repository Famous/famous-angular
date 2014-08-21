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
 * ```html
 * <fa-app style="width: 320px; height: 568px;">
 *   <fa-modifier>
 *     <fa-surface>This will be shown on screen.</fa-surface>
 *   </fa-modifier>
 *   <div>This will not appear on screen because it is not inside an fa-surface.</div>
 * </fa-app>
 * ```
 * ## Common Qustions
 * ### Multiple fa-app's
 * Nesting an `fa-app` within another `fa-app` is possible, and the use case of this approach would be for css content overflow.
 *
 * In the example below, there is an `fa-surface` with an `fa-app` nested inside.  Normally, an `fa-surface` should not nest another Famous element within it because it is a leaf node that has the purpose of being a container for html content.  The exception is nesting an `fa-app` within an `fa-surface`, which creates another Famous context, in which Famous elements can be nested inside.   
 * 
 * ```html
 * <fa-app style="width: 500px; height: 500px;">
 *   <fa-surface>
 *     <fa-app style="width: 200px; height: 200px;">
 *       <fa-image-surface 
 *          fa-image-url="https://famo.us/assets/images/famous_logo_white.svg" 
 *          fa-size="[400, 400]">
 *       </fa-image-surface>
 *     </fa-app>
 *   </fa-surface>
 * </fa-app>
 * ```
 * 
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
      template: '<div style= "display: none;" ><div></div></div>'+
                '<div fa-resize-listener class="famous-angular-clipping-container" >'+
                  '<div class="famous-angular-container"></div>'+
                '</div>',
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

            isolate.context = Engine.createContext(element[0].querySelector('.famous-angular-container'));
            window.context = isolate.context;
           
            scope.__resizeDisable = !!scope.$eval(attrs.faAutoResizeDisable) ;
            
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
 * @name faAutoResizeEnable
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is an internal directive to add resize event listener on the famous-angular-container. The resize event listener can be disabled 
 * by adding an fa-auto-resize-disbale attribute on fa-app. This resize event listener concept is adapted from 
 * http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/ 
 */
angular.module('famous.angular')
 .directive('faResizeListener',function ($parse) {
 return  { 
    restrict: 'A',
    scope: false,
    compile: function (tElement, tAttrs, transclude) {      
      return {

        pre: function (scope, element, attrs) {
          
          if(element[0].className !== 'famous-angular-clipping-container' || scope.__resizeDisable) return;
          var faContainer = element[0];
          var requestFrame = (function() {
            var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
                function(fn){ return window.setTimeout(fn, 20); };
            return function(fn){ return raf(fn); };
          })();
          
          var cancelFrame = (function() {
            var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
                   window.clearTimeout;
            return function(id){ return cancel(id); };
          })();

          function resetTriggers(element){
            var triggers = element.__resizeTriggers__,
              expand = triggers.firstElementChild,
              contract = triggers.lastElementChild,
              expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + 'px';
            expandChild.style.height = expand.offsetHeight + 1 + 'px';
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
          }

          function checkTriggers(element){
            return element.offsetWidth !== element.__resizeLast__.width ||
               element.offsetHeight !== element.__resizeLast__.height;
          }
          function scrollListener(event){

            resetTriggers(faContainer);
            if (faContainer.__resizeRAF__) cancelFrame(faContainer.__resizeRAF__);
            faContainer.__resizeRAF__ = requestFrame(function(){
              if (checkTriggers(faContainer)) { 
                faContainer.__resizeLast__.width = faContainer.offsetWidth;
                faContainer.__resizeLast__.height = faContainer.offsetHeight;
                var isolate = scope.isolate[scope.$id];
                isolate.context.setSize([element.width(),element.height()]);
                console.log(isolate.context.getSize());
              }
            });
          }

          if(!scope.__resizeDisable) {
            if(!element.__resizeTriggers__) {
              if(getComputedStyle(faContainer).position === 'static' ) faContainer.style.position = 'relative';
              faContainer.__resizeLast__ = {};
              (faContainer.__resizeTriggers__  = document.createElement('div')).className = 'resize-triggers';
              faContainer.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
                                   '<div class="contract-trigger"></div>';
              faContainer.appendChild(faContainer.__resizeTriggers__);
              resetTriggers(faContainer);
              faContainer.addEventListener('scroll', scrollListener, true);
            }
          }
        }
      };
    }
  };
 });
