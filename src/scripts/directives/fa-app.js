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
 * Declaring multiple fa-app's within a page is permitted, but each new one incurs a penalty to performance, and `fa-app`'s should definitely not be declared within an ng-repeat.
 * 
 * ### Fa-app must be declared with a height & width
 * The element fa-app is declared within must have a height and width styling, declared inline or as a css declaration in an external stylesheet.
 * ```html
 * <fa-app style="width: 320px; height: 568px;">
 *    <!-- other fa- scene graph components -->
 * </fa-app>
 * ```
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
