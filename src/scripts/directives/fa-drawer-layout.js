/**
 * @ngdoc directive
 * @name faDrawerLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us DrawerLayout containing
 * a Content and a Drawer based on the order of its child elements.
 *  See [https://famo.us/docs/views/DrawerLayout]
 *
 * @usage
 * ```html
 * <fa-drawer-layout>
 *   <!-- content rendernode -->
 *   <!-- drawer rendernode -->
 * </fa-drawer-layout>
 * ```
 * @example
 * `fa-drawer-layout` is a View that arranges two renderables into a drawer area with a defined size and a content area that fills up the remaining space.
 *
 * To use it, declare it in the html and nest 2 renderables.
 * 
 *
 */

angular.module('famous.angular')
  .directive('faDrawerLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs) {
        return {
          pre: function (scope, element, attrs) {
            var DrawerLayout = $famous["famous/views/DrawerLayout"];
            var isolate = $famousDecorator.ensureIsolate(scope);

            var options = scope.$eval(attrs.faOptions) || {};

            if (!options.drawerLength) {
              options.drawerLength = scope.$eval(attrs.faDrawerLength);
            }

            if (!options.side) {
              options.side = scope.$eval(attrs.faSide);
            }
            switch (options.side) {
              case 'left':
                options.side = DrawerLayout.SIDES.LEFT;
                break;
              case 'top':
                options.side = DrawerLayout.SIDES.TOP;
                break;
              case 'right':
                options.side = DrawerLayout.SIDES.RIGHT;
                break;
              case 'bottom':
                options.side = DrawerLayout.SIDES.BOTTOM;
                break;
            }

            isolate.renderNode = new DrawerLayout(options);
            $famousDecorator.addRole('renderable', isolate);
            isolate.show();

            isolate.toggle = function (overrideOptions) {
              isolate.renderNode.toggle(overrideOptions || scope.$eval(attrs.faOptions));
            };

            isolate.open = function (overrideOptions) {
              isolate.renderNode.open(overrideOptions || scope.$eval(attrs.faOptions));
            };

            isolate.close = function (overrideOptions) {
              isolate.renderNode.close(overrideOptions || scope.$eval(attrs.faOptions));
            };

            var _numberOfChildren = 0;

            $famousDecorator.sequenceWith(
              scope,
              function addChild(data) {
                _numberOfChildren++;

                if (_numberOfChildren === 1) {
                  isolate.renderNode.content.add(data.renderGate);
                } else if (_numberOfChildren === 2){
                  isolate.renderNode.drawer.add(data.renderGate);
                } else {
                  throw new Error('fa-drawer-layout can accept no more than 2 children');
                }
              },
              function removeChild(childScopeId) {
                if (_numberOfChildren === 1) {
                  isolate.renderNode.content.set({});
                } else if (_numberOfChildren === 2) {
                  isolate.renderNode.drawer.set({});
                }

                _numberOfChildren--;
              }
            );
          },
          post: function (scope, element, attrs, ctrl, transclude) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            $famousDecorator.registerChild(scope, element, isolate);
          }
        };
      }
    };
  }]);
