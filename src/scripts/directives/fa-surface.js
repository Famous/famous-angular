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
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-size="[960, undefined]">
         <fa-surface fa-size="[undefined, undefined]">
           <div ng-include src=" 'helloWorld.html' "></div>
         </fa-surface>
       </fa-modifier>
    </fa-app>
  </file>
  <file name="helloWorld.html">
  <p>This is compiled from an external HTML fragment in helloWorld.html!</p>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ##Common Confusions
 *  ### A Surface is a leaf node
 *  An fa-surface is a leaf node; this means that there should not be Famous-Angular elements nested within an fa-surface.
 *
 *  This following example will NOT work correctly:
 *  ```html
 *  <fa-surface>
 *     <!-- the contents of a Surface must be standard HTML. -->
 *     <!-- If a Famo.us component is on a surface, it will not get rendered correctly. -->
 *     <fa-modifier>
 *       <fa-surface>This will not work correctly.</fa-surface>
 *     </fa-modifier>
 *  </fa-surface>
 * ```
 *
 It will throw this error: "Error: Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app."
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
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-surface fa-origin="[.5, 0]">This will not change the origin.</fa-surface>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
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
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SurfaceCtrl">
      <fa-modifier fa-size="sizeForBoxFunction">
        <fa-surface fa-background-color="'red'"></fa-surface>
      </fa-modifier>
    </fa-app>

    <script>
      angular.module('faSurfaceExampleApp', ['famous.angular'])
        .controller('SurfaceCtrl', ['$scope', '$famous', function($scope, $famous) {
            
            $scope.sizeForBoxFunction = function() {
               return [75, 75];
            };

        }]);
    </script>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### fa-color & fa-background-color
 * The exceptions of not setting layout/visibility properties on an `fa-surface` are `fa-color` and `fa-background-color`: these two properties are passed through the `.setProperties()` method available on Famous Surfaces.
 * Take note that they accept a string in the html view.  If you do not enclose them in quotation marks, Angular will evaluate it as an object on the scope, but surrounding it with quotation marks will specify it as a string expression.
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app>
      <fa-modifier fa-size="[200, 50]">
        <fa-surface fa-background-color="'orange'" fa-color="'#fff'">
            This text should be white on an orange background.
        </fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular']);
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  </file>
 </example>
 *
 * ### ng-class
 * Ng-Class works on `fa-surface`s:
 *
 <example module="faSurfaceExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SurfaceCtrl">
      <fa-modifier fa-size="[300, 50]">
        <fa-surface ng-class="{strike: applyStrike}">
          Check box to apply strikethrough!
          <input type="checkbox" ng-model="applyStrike"></input>
        </fa-surface>
      </fa-modifier>
    </fa-app>
  </file>
  <file name="style.css">
  fa-app {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    .strike {
      text-decoration: line-through;
    }
  </file>
  <file name="script.js">
  angular.module('faSurfaceExampleApp', ['famous.angular'])
        .controller('SurfaceCtrl', ['$scope', '$famous', function($scope, $famous) {
      }]);
  </file>
 </example>
 *
 *
 */

angular.module('famous.angular')
  .directive('faSurface', ['$famous', '$famousDecorator', '$interpolate', '$controller', '$compile', function ($famous, $famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs){
        return {
          pre: function(scope, element, attrs){

            var isolate = $famousDecorator.ensureIsolate(scope);
            // console.log("fa-surface", isolate);
            var Surface = $famous['famous/core/Surface'];
            var Transform = $famous['famous/core/Transform'];
            var EventHandler = $famous['famous/core/EventHandler'];

            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties();
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            );

            //TODO:  duplicate of fa-image-surface's _propToFaProp function.
            //       Refactor into a util object/service?
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
                "pointerEvents",
                "zIndex"
              ];
              for(var i = 0; i < properties.length; i++){
                var prop = properties[i];
                var faProp = _propToFaProp(prop);
                if(attrs[faProp]) baseProperties[prop] = scope.$eval(attrs[faProp]);
              }
              return baseProperties;
            };
            var _sizeAnimateTimeStamps = [];

            attrs.$observe('faSize',function () {
              isolate.renderNode.setSize(scope.$eval(attrs.faSize));
              _sizeAnimateTimeStamps.push(new Date());

              if(_sizeAnimateTimeStamps.length > 5) {
                if((_sizeAnimateTimeStamps[4]-_sizeAnimateTimeStamps[0]) <= 1000 ){
                  console.warn("Using fa-size on fa-surface to animate is significantly non-performant, prefer to use fa-size on an fa-modifier surrounding a fa-surface");
                }
                _sizeAnimateTimeStamps.shift();
              }
            });

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              properties: isolate.getProperties()
            });
            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            if (attrs.class) {
              isolate.renderNode.setClasses(attrs['class'].split(' '));
            }
            if(attrs.faDeploy){
              isolate.renderNode.on("deploy",function(){
                var fn = scope[attrs.faDeploy];
                if(typeof fn === 'function') {
                  fn(attrs.faDeploy)();
                }
              });
            }
            // Throw an exception if anyother famous scene graph element is added on fa-surface.
            $famousDecorator.sequenceWith(scope, function(data) {
              throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
            });
          },
          post: function(scope, element, attrs, ctrl, transclude){
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
        };
      }
    };
  }]);
