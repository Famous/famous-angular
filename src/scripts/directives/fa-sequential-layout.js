/**
 * @ngdoc directive
 * @name faSequentialLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us SequentialLayout containing the 
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us faSequentialLayout's
 * constructor.  See [https://famo.us/docs/0.2.0/views/SequentialLayout/]
 *
 * @usage
 * ```html
 * <fa-sequential-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-sequential-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faSequentialLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
      return {
          template: '<div></div>',
          restrict: 'E',
          transclude: true,
          scope: true,
          compile: function (tElem, tAttrs, transclude) {
              return {
                  pre: function (scope, element, attrs) {
                      var isolate = $famousDecorator.ensureIsolate(scope);

                      var SequentialLayout = $famous["famous/views/SequentialLayout"];

                      var _children = [];

                      var options = scope.$eval(attrs.faOptions) || {};

                      isolate.renderNode = new SequentialLayout(options);

                      var updateSequentialLayout = function() {
                          _children.sort(function(a, b) {
                              return a.index - b.index;
                          });
                          isolate.renderNode.sequenceFrom(function(_children) {
                              var _ch = [];
                              angular.forEach(_children, function(c, i) {
                                  _ch[i] = c.renderNode;
                              });
                              return _ch;
                          }(_children));
                      };

                      scope.$on('registerChild', function (evt, data) {
                          if (evt.targetScope.$id != scope.$id) {
                              _children.push(data);
                              updateSequentialLayout();
                              evt.stopPropagation();
                          };
                      });

                      scope.$on('unregisterChild', function (evt, data) {
                          if (evt.targetScope.$id != scope.$id) {
                              _children = function (_children) {
                                  var _ch = [];
                                  angular.forEach(_children, function (c) {
                                      if (c.id !== data.id) {
                                          _ch.push(c);
                                      }
                                  });
                                  return _ch;
                              }(_children);
                              updateSequentialLayout();
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
