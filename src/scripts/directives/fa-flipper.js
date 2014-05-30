/**
 * @ngdoc directive
 * @name faFlipper
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us Flipper containing the
 * specified front and back elements. The provided `options` object
 * will pass directly through to the Famo.us Flipper's
 * constructor.  See [https://famo.us/docs/0.2.0/views/Flipper/]
 *
 * @usage
 * ```html
 * <fa-flipper fa-options="scopeOptionsObject">
 *   <!-- two render nodes -->
 * </fa-flipper>
 * ```
 */

angular.module('famous.angular')
    .directive('faFlipper', ["$famous", "$famousDecorator",
            function ($famous, $famousDecorator) {
            return {
                template: '<div></div>',
                restrict: 'E',
                transclude: true,
                scope: true,
                compile: function (tElem, tAttrs, transclude) {
                    return {
                        pre: function (scope, element, attrs) {
                            var isolate = $famousDecorator.ensureIsolate(scope);
                            var Flipper = $famous["famous/views/Flipper"];
                            var options = scope.$eval(attrs.faOptions) || {};
                            isolate.renderNode = new Flipper(options);

                            var flip = function () {
                                isolate.renderNode.flip(options);
                            };

                            var childCount = 0;
                            scope.$on('registerChild', function (evt, data) {
                                if (evt.targetScope.$id != scope.$id) {
                                    if (childCount == 0) {
                                        isolate.renderNode.setFront(data.renderNode);
                                    }
                                    if (childCount == 1) {
                                        isolate.renderNode.setBack(data.renderNode);
                                    }
                                    data.renderNode.on('click', flip);
                                    childCount += 1;
                                    evt.stopPropagation();
                                };
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