/**
 * @ngdoc directive
 * @name faDeck
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us Deck containing the
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us faDeck's
 * constructor.  See [https://famo.us/docs/views/Deck]
 *
 * @usage
 * ```html
 * <fa-sequential-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-sequential-layout>
 * ```
 * @example
 * `Fa-sequential-layout` is a Famous View that arranges a collection of renderables sequentially in a specified direction.  Pass options (such as `direction`) by binding an object with the property to `fa-options`.
 *
 * In the example below, an ng-repeat is used on an `fa-view` and the elements nested below it.  The size of each `fa-surface` is `[undefined, 100]`, specifying that the width will fill the parent container, and the height will be 100 pixels.
 *
 * There are no positioning properties (such as `fa-translate`) specified on the `fa-modifier`, but these `fa-surface`s will translate automatically in the specified direction as not to overlap each other.
 *
 <example module="faSequentialExampleApp">
  <file name="index.html">
  <fa-app ng-controller="SequentialCtrl">
      <fa-sequential-layout fa-options="sequentialOptions">
       <fa-view ng-repeat="view in sequence">
         <fa-modifier fa-size="[undefined, 100]">
           <fa-surface fa-background-color="view.bgColor"></fa-surface>
         </fa-modifier>
       </fa-view>
      </fa-sequential-layout>
    </fa-app>

    <script>
      angular.module('faSequentialExampleApp', ['famous.angular'])
          .controller('SequentialCtrl', ['$scope', '$famous', function($scope, $famous) {

            $scope.sequentialOptions = {
              direction: 1, // vertical = 1 (default), horizontal = 0
            };

            $scope.sequence = [{bgColor: "orange"}, {bgColor: "red"}, {bgColor: "green"}, {bgColor: "yellow"}];

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
 */

angular.module('famous.angular')
  .directive('faDeck', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        window.$f = $famous;
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var Deck = $famous["famous/views/Deck"];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};

            isolate.renderNode = new Deck(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var _updateDeck = function() {
              _children.sort(function(a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function(_children) {
                var _ch = [];
                angular.forEach(_children, function(c, i) {
                  _ch[i] = c.renderGate;
                });
                return _ch;
              }(_children));
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                _updateDeck();
              },
              function(childScopeId) {
                _children = function (_children) {
                  var _ch = [];
                  angular.forEach(_children, function (c) {
                    if (c.id !== childScopeId) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                _updateDeck();
              }
            );

          },
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);
            var deckOpen = scope.$eval(attrs.faOpen);

            scope.$watch(function(){
              return scope.$eval(attrs.faOpen);
            }, function () {
              deckOpen = scope.$eval(attrs.faOpen);
              (scope.$eval(deckOpen)
                || attrs.faOpen == "true"
                || deckOpen === true
                || scope[attrs.faOpen] === true) ? isolate.renderNode.open() : isolate.renderNode.close();
            });

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
