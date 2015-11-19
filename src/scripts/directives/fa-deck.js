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
 * <fa-deck fa-options="scopeOptionsObject" fa-open="scopeOpenVariable">
 *   <!-- zero or more render nodes -->
 * </fa-deck>
 * ```
 * @example
 * `Fa-deck` is a Famous SequentialLayout View that can be opened and closed with a transition.  Pass options (such as `direction` and `transition`) by binding an object with the property to `fa-options`.
 *
 * In the example below, an `fa-surface` and an `fa-view` are added to the deck. ng-repeat is used on an `fa-view` and the elements nested below it.  The size of each `fa-surface` is `[250, 50]`.
 *
 * The modifier applied to the `fa-deck` positions it 0.5 across in the X direction and 0.25 down in the Y direction.
 *
 * A clickHandler() is bound to ng-click on the first surface, which toggles the `fa-deck` open and close actions.
 *
 <example module="faSequentialExampleApp">
  <file name="index.html">
  <fa-app ng-controller="DeckCtrl">
    <fa-modifier fa-origin="[0.5, 0]" fa-align="[0.5, 0.25]">
      <fa-deck fa-options="deckOptions" fa-open="deckOpen">
        <fa-modifier fa-size="[250, 50]">
          <fa-surface ng-click="clickHandler()" fa-properties="firstSurfaceProperties">Click Me</fa-surface>
        </fa-modifier>
          <fa-view ng-repeat="item in sequence">
            <fa-modifier fa-size="[250, 50]">
              <fa-surface fa-background-color="item.bgColor">{{ $index }}</fa-surface>
            </fa-modifier>
          </fa-view>
      </fa-deck>
    </fa-modifier>
  </fa-app>

  <script>
    angular.module('faDeckExampleApp', ['famous.angular'])
        .controller('DeckCtrl', ['$scope', '$famous', function($scope, $famous) {
          $scope.deckOpen = false;

          $scope.clickHandler = function() {
            $scope.deckOpen = !$scope.deckOpen;
          };

          $scope.deckOptions = {
            direction: 1, // vertical = 1 (default), horizontal = 0
            itemSpacing: 0,
            transition: {duration: 200, curve: 'easeInOut'},
          };

          $scope.firstSurfaceProperties = {
            color: 'blue',
            backgroundColor: 'white',
            border: '1px solid black',
            textAlign: 'center'
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
