/**
 * @ngdoc directive
 * @name faOptions
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is used to specify options for all famous directives
 * @usage
 * ```html
 *<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">
 *<fa-view>
 *<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>
 *</fa-view>
 *</fa-grid-layout>
 *```
 *
 * ```javascript
 * var EventHandler = $famous['famous/core/EventHandler'];
 * $scope.eventHandler = new EventHandler();
 * $scope.gridOptions = {dimensions: [2, 2]};
 *```
 */
angular.module('famous.angular')
    .directive('faOptions', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
        return {
            restrict: 'A',
            scope: false,
            priority: -16,
            compile: function () {
                return {
                    post: function (scope, element, attrs) {
                        var isolate = $famousDecorator.ensureIsolate(scope, element);
                        scope.$watch(function () {
                            return scope.$eval(attrs.faOptions);
                        }, function () {
                            if(isolate.renderNode.setOptions){
                                isolate.renderNode.setOptions(scope.$eval(attrs.faOptions));
                            }else if(isolate.modifier && isolate.modifier.setOptions){
                                isolate.modifier.setOptions(scope.$eval(attrs.faOptions));
                            }else{
                                throw new Error("fa-options is not supported on " + element[0].tagName);
                            }
                        }, true);
                    }
                };
            }
        };
    }]);