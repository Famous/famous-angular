/**
 * @ngdoc directive
 * @name faFlexibleLayout
 * @module famous.angular
 * @restrict E
 * @description
 * This directive will create a Famo.us FlexibleLayout that
 * sequences from children passed in the provided `options` object,
 * which passes directly through to the Famo.us FlexibleLayout's
 * constructor. See [https://famo.us/docs/views/FlexibleLayout]
 *
 * @usage
 * ```html
 * <fa-flexible-layout fa-options="scopeOptionsObject">
 * </fa-flexible-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faFlexibleLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var FlexibleLayout = $famous["famous/views/FlexibleLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];
            var RenderNode = $famous['famous/core/RenderNode'];


            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};

            isolate.renderNode = new FlexibleLayout(options);

            $famousDecorator.addRole('renderable',isolate);
            isolate.show();

            var updateFlexibleLayout = function () {
              _children.sort(function (a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function (_children) {
                var _ch = [];
                angular.forEach(_children, function (c, i) {
                  _ch[i] = c.renderGate;
                });
                return _ch;
              }(_children));
            };

            $famousDecorator.sequenceWith(
              scope,
              function(data) {
                _children.push(data);
                updateFlexibleLayout();
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
                updateFlexibleLayout();
              }
            );

          },
          post: function (scope, element, attrs, ctrl, transclude) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            transclude(scope, function (clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  }]);
