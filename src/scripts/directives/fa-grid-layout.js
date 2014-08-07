/**
 * @ngdoc directive
 * @name faGridLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us GridLayout containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us GridLayout's
 * constructor.  See [https://famo.us/docs/views/GridLayout]
 *
 * @usage
 * ```html
 * <fa-grid-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-grid-layout>
 * ```
 * @example
 * A Famous Grid Layout divides a context into evenly-sized grid cells.  Pass an option such as `dimension` by binding an object with the property to `fa-options`.
 *
 * In the example below, `fa-options` references `myGridLayoutOptions` on the scope.
 *
 * ```javascript
 * $scope.myGridLayoutOptions = {
 *    dimensions: [2,2], // specifies number of columns and rows
 * };
 * ```
 *
 * In the example below, `fa-size` is specified as `[100, 100]`, so each `fa-surface` will have these dimensions.
 * ```html
 * <fa-grid-layout fa-options="myGridLayoutOptions">
 *    <fa-modifier ng-repeat="grid in grids"
 *                 fa-size="[100, 100]">
 *      <fa-surface fa-background-color="grid.bgColor"></fa-surface>
 *    </fa-modifier>
 * </fa-grid-layout>
 * ```
 * ```javascript
 * $scope.grids = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];
 * ```
 *
 * If `fa-size` is not specified, as in this example below, the fa-surface's will collectively fill the height and width of its parent modifier/context.
 *
 * ```html
 * <fa-grid-layout fa-options="myGridLayoutOptions">
 *    <fa-surface ng-repeat="grid in grids" fa-background-color="grid.bgColor"></fa-surface>
 * </fa-grid-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faGridLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        return  {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var GridLayout = $famous["famous/views/GridLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new GridLayout(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();
            //watch options and update when changed
            scope.$watch(function(){
              return scope.$eval(attrs.faOptions);
            }, function(newVal, oldVal){
              isolate.renderNode.setOptions(newVal);
            }, true);

            var updateGridLayout = function () {
              scope.$$postDigest(function(){
                _children.sort(function (a, b) {
                  return a.index - b.index;
                });
                isolate.renderNode.sequenceFrom(function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c, i) {
                    _ch[i] = c.renderGate;
                  });
                  return _ch;
                }(_children));
              });
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateGridLayout();
              },
              function(childScopeId) {
                _children = function(_children) {
                  var _ch = [];
                  angular.forEach(_children, function(c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateGridLayout();
              },
              updateGridLayout
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
