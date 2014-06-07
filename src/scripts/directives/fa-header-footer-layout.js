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
 *   <!-- header rendernode -->
 *   <!-- content rendernode -->
 *   <!-- footer rendernode -->
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

            var _numberOfChildren = 0;
            scope.$on('registerChild', function (evt, data) {
              if (evt.targetScope.$id != scope.$id) {
                _numberOfChildren++;
                if(_numberOfChildren === 1){
                  isolate.renderNode.header.add(data.renderNode);
                }else if(_numberOfChildren === 2){
                  isolate.renderNode.content.add(data.renderNode);
                }else if(_numberOfChildren === 3){
                  isolate.renderNode.footer.add(data.renderNode);
                }else{
                  throw "fa-header-footer-layout can accept no more than 3 children"
                }
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function (evt, data) {
              //TODO:  support removing children
              throw "unimplemented: fa-header-footer-layout does not support removing children"
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
