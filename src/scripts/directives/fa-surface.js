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
                "color",
                "zIndex"
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

            //TODO:  on this and all other render-node-wrapping fa-directives,
            //       expose an actual RenderNode in isolate.renderNode and
            //       use that RenderNode's .set() function to add/remove content
            //       from the scene graph.  This will probably be instead of
            //       using RenderControllers.
            $famousDecorator.registerChild(scope, element, isolate, function() {
              // TODO: hook into RenderController and hide this render node
            });
          }
        }
      }
    };
  }]);
