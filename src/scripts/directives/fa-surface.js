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
 *  ```html
 * <fa-modifier fa-size="[960, undefined]">
 *    <fa-surface fa-size="[undefined, undefined]">
 *      <div ng-include src=" 'views/animations.html' "></div>
 *    </fa-surface>
 *  </fa-modifier>
 *  ```
 * 
 * A simple ng-repeat of surfaces can be implemented like this:
 * ```html
 * <fa-modifier ng-repeat="item in list" fa-size="[100, 100]" fa-translate="[0, $index * 75, 0]">
 *     <fa-surface fa-size="[undefined, undefined]">
 *       {{item.content}}
 *     </fa-surface>
 * </fa-modifier>
 * ```
 * 
 * ```javascript
 * $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
 * ```
 * 
 * ##Common Confusions
 * ### Properties on surfaces vs modifiers
 * With Famous, properties related to layout and visibility belong on a Modifier.  A Surface should be added below a Modifier on the Render Tree, as Modifiers affect everything below them.
 *
 * You may be tempted to set the `fa-origin` or another layout property on an fa-surface, and discover that it does not work:
 * ```html
 * <fa-surface fa-origin="[.5, 0]">This will not change the origin.</fa-surface>
 * ```
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
 * To reiterate, the best practice to animate or set any layout/visibilty properties of a surface is to do so on a modifier that affects the Surface.  The purpose of a Surface is to contain HTML content, whether rendered from a template, or data-bound with {{}}'s.
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 *
 * ### fa-color & fa-background-color
 * The exceptions are `fa-color` and `fa-background-color`: these two properties are passed through the `.setProperties()` method available on Famous Surfaces.
 * Take note that they accept a string in the html view.  If you do not enclose them in quotation marks, Angular will evaluate it as an object on the scope, but surrounding it with quotation marks will specify it as a string expression.
 * ```html
 * <fa-modifier fa-size="[200, 50]">
 *   <fa-surface fa-background-color="'orange'" fa-color="'#fff'">
 *       This text should be white.
 *   </fa-surface>
 * </fa-modifier>
 * ```
 *
 * ### ng-class
 * Ng-Class works on `fa-surface`s:
 * ```html
 * <fa-modifier fa-size="[150, 50]">
 *   <fa-surface fa-background-color="'blue'" ng-class="{strike: applyStrike}">
 *     Strikethrough!
 *     <input type="checkbox" ng-model="applyStrike"></input>
 *   </fa-surface>
 * </fa-modifier>
 * ```
 * ```css
 * .strike {
 *   text-decoration: line-through;
 * }
 * ```
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
