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
 *  ### A Surface is a leaf node
 *  An fa-surface is a leaf node; this means that there should not be Famous-Angular elements nested within an fa-surface.
 *
 *  This followin will NOT work correctly:
 *  ```html
 *  <fa-surface>
 *     <!-- the contents of a Surface must be standard HTML, so Famo.us components will not get rendered correctly. -->
 *     <fa-modifier>
 *       <fa-surface></fa-surface>
 *     </fa-modifier>
 *  </fa-surface>
 * ```
 *
 *  The purpose of an fa-surface is to contain viewable HTML content:
 * ```html
 *  <fa-surface>
 *     <!-- content -->
 *     <!-- databound content with curly braces -->
 *     <!-- no other Famous renderable nodes allowed inside a Surface-->
 *  </fa-surface>
 *  ```
 *
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
 * To reiterate, the best practice to animate or set any layout/visibilty properties of a surface is to do so on a modifier that affects the Surface.  The purpose of a Surface is to contain HTML content, whether rendered from a template, or data-bound.
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 *
 * ### fa-color & fa-background-color
 * The exceptions of not setting layout/visibility properties on an `fa-surface` are `fa-color` and `fa-background-color`: these two properties are passed through the `.setProperties()` method available on Famous Surfaces.
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
    $provide.decorator('$animate', ['$delegate', '$rootScope', '$famous', '$parse',
                            function($delegate,   $rootScope,   $famous,   $parse) {

      var Surface = $famous['famous/core/Surface'];
      var Timer   = $famous['famous/utilities/Timer'];

      var FA_ANIMATION_ACTIVE = '$$faAnimationActive';

      /**
       * Check if the element selected has an isolate renderNode that accepts classes.
       * @param {Array} element - derived element
       * @return {boolean}
       */
      function isClassable(element) {
        var isolate = $famous.getIsolate(element.scope());
        return isolate && isolate.renderNode instanceof Surface;
      }

      /**
       * Pass through $animate methods that are strictly class based.
       * These will work on Surfaces, and will be ignored elsewhere.
       * ngAnimate has a complex API for determining when an animation should be
       * considered "enabled" which we do not need.
       */
      var animationHandlers = {
        enabled: $delegate.enabled
      };

      angular.forEach(['addClass', 'removeClass'], function(classManipulator) {
        // Stash the original class manipulator so we can apply it later
        var originalManipulator = angular.element.prototype[classManipulator];

        /**
         * Fork the angular.element.prototype class manipulator to delegate class changes
         * down to any transcluded Surfaces created by Famo.us/Angular.
         * @param  {String} className - the class to be added or removed
         * @return {void}
         */
        angular.element.prototype[classManipulator] = function(className) {
          originalManipulator.apply(this, arguments);

          // If and only if the current element represents a Famo.us Surface, pass through
          // the addClass and removeClass methods to the underlying renderNode.
          if (isClassable(this)) {
            $famous.getIsolate(this.scope()).renderNode[classManipulator](className);
          }
        };

        /**
         * Core Angular animation events will add and remove classes (such as ng-hide)
         * to affect the display of elements using $animate.addClass. Because Famo.us
         * Surfaces make use of classes, we should pass all class-based modifications
         * directively to their Surfaces whenever possible.
         */
        animationHandlers[classManipulator] = function(element, className, done) {
          $delegate[classManipulator](element, className, done);

          if (isClassable(element)) {
            var surface = $famous.getIsolate(element.scope()).renderNode;
            angular.forEach(className.split(' '), function(splitClassName) {
              surface[classManipulator](splitClassName);
            });
          }
         };
      });

      // There isn't a good way to delegate down to Surface.setClasses
      // because Angular has already negotiated the list of items to add
      // and items to remove. Manually loop through both lists.
      animationHandlers.setClass = function(element, add, remove, done) {
        $delegate.setClass(element, add, remove, done);

        if (isClassable(element)) {
          var surface = $famous.getIsolate(element.scope()).renderNode;
          angular.forEach(add.split(' '), function(className) {
            surface.addClass(className);
          });

          angular.forEach(remove.split(' '), function(className) {
            surface.removeClass(className);
          });
        }
      };

      /**
       * $animate.enter, $animate.leave, and $animate.move events
       * can trigger Famo.us animations with the `fa-animate-enter`,
       * `fa-animate-move`, and `fa-animate-leave` attributes.
       * If defined, each of these properties should evaluate to expressions
       * that equal the duration of their animations in milliseconds.
       *
       * Explicitly declaring the duration of all animations ensures
       * Famo.us will know how long to wait before considering the animation
       * complete and allow Angular to continue manipulating elements and classes.
       */
      angular.forEach(['enter', 'leave', 'move'], function(operation) {
        animationHandlers[operation] = function(element) {
          var self = this;
          var selfArgs = arguments;
          var delegateFirst = (operation === 'enter');

          if (delegateFirst === true) {
            $delegate[operation].apply(this, arguments);
          }

          // Detect if an animation is currently running
          if (element.data(FA_ANIMATION_ACTIVE) === true) {
            $parse(element.attr('fa-animate-halt'))(element.scope());
          }

          // Indicate an animation is currently running
          element.data(FA_ANIMATION_ACTIVE, true);

          var callback = function() {
            // Indicate an animation is no longer running
            element.data(FA_ANIMATION_ACTIVE, false);
            if (delegateFirst === false) {
              $delegate[operation].apply(self, selfArgs);
            }
          };

          $rootScope.$$postDigest(function() {
            var animationDuration = $parse(element.attr('fa-animate-' + operation))(element.scope());
            if (typeof animationDuration === 'number') {
              Timer.setTimeout(callback, animationDuration);
            } else {
              callback();
            }
          });
        };
      });

      return animationHandlers;
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


            var _propToFaProp = function(prop){
              return "fa" + prop.charAt(0).toUpperCase() + prop.slice(1);
            };

            isolate.getProperties = function(){
              var baseProperties = scope.$eval(attrs.faProperties) || {};
              //TODO:  instead of a 'whitelist' like this, consider looping
              //       through all of the members of attrs that aren't 'fa-size'
              //       or 'fa-properties' ('blacklist') and considering each of
              //       them to be CSS properties.
              //       Alternatively, don't support fa-css-properties on
              //       the directive, in favor of requiring them to be passed in
              //       by fa-properties
              var properties = [
                "backgroundColor",
                "margin",
                "padding",
                "color"
              ];
              for(var i = 0; i < properties.length; i++){
                var prop = properties[i];
                var faProp = _propToFaProp(prop);
                if(attrs[faProp]) baseProperties[prop] = scope.$eval(attrs[faProp]);
              }
              return baseProperties;
            };

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              properties: isolate.getProperties()
            });

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }

            scope.$on('$destroy', function() {
              //TODO:  hook into RenderController and hide this render node
              //       This whole function (scope.$on...) can probably
              //       be handled by the $famousDecorator
              scope.$emit('unregisterChild', {id: scope.$id});
            });

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
