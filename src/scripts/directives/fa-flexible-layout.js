angular.module('famous.angular')
  .directive('faFlexibleLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var FlexibleLayout = $famous["famous/views/FlexibleLayout"];
            var ViewSequence = $famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new FlexibleLayout(options);

            var updateFlexibleLayout = function () {
              _children.sort(function (a, b) {
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(function (_children) {
                var _ch = [];
                angular.forEach(_children, function (c, i) {
                  _ch[i] = c.renderNode;
                });
                return _ch;
              }(_children));
            };

            scope.$on('registerChild', function (evt, data) {
              if (evt.targetScope.$id !== scope.$id) {
                _children.push(data);
                updateFlexibleLayout();
                evt.stopPropagation();
              }
            });

            scope.$on('unregisterChild', function (evt, data) {
              if (evt.targetScope.$id !== scope.$id) {
                _children = function (_children) {
                  var _ch = [];
                  angular.forEach(_children, function (c) {
                    if (c.id !== data.id) {
                      _ch.push(c);
                    }
                  });
                  return _ch;
                }(_children);
                updateFlexibleLayout();
                evt.stopPropagation();
              }
            });

          },
          post: function (scope, element, attrs) {
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
