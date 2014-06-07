/**
 * @ngdoc directive
 * @name faHeaderFooterLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us HeaderFooterLayout containing
 * a Header, Content, and Footer based on the order of its child elements.
 *  See [https://famo.us/docs/0.2.0/views/HeaderFooterLayout/]
 *
 * @usage
 * ```html
 * <fa-header-footer-layout>
 *   <!-- zero or more render nodes -->
 * </fa-header-footer-layout>
 * ```
 */


angular.module('famous.angular')
  .directive('faHeaderFooterLayout', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function (tElem, tAttrs, transclude) {
        var HeaderFooterLayout = $famous["famous/views/HeaderFooterLayout"];
        var RenderNode = $famous["famous/core/RenderNode"];
        return {
          pre: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope);

            var _header = new RenderNode();
            var _content = new RenderNode();
            var _footer = new RenderNode();

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new HeaderFooterLayout(options);

            var _updateHeaderFooterLayout = function() {
              isolate.renderNode.header = _header;
              isolate.renderNode.content = _content;
              isolate.renderNode.footer = _footer;
            };

            var _numberOfChildren = 0;
            scope.$on('registerChild', function (evt, data) {
              if (evt.targetScope.$id != scope.$id) {
                if(_numberOfChildren < 3){
                  _numberOfChildren++;
                  if(_numberOfChildren == 1){
                    isolate.renderNode.header = data;
                  }else if(_numberOfChildren == 2){
                    isolate.renderNode.content = data;
                  }else if(_numberOfChildren == 3){
                    isolate.renderNode.footer = data;
                  }else{
                    throw "fa-header-footer-layout can accept no more than 3 children"
                  }
                }
              };
            });

            scope.$on('unregisterChild', function (evt, data) {
              //TODO:  support removing children
              throw "unsupported: fa-header-footer-layout does not support removing children"
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
