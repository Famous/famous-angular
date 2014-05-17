/**
 * @ngdoc directive
 * @name faGridLayout
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive will create a Famo.us GridLayout containing the 
 * specified child elements. The provided `options` object
 * will pass directly through to the Famo.us GridLayout's
 * constructor.  See [https://famo.us/docs/0.1.1/views/GridLayout/]
 *
 * @usage
 * ```html
 * <fa-grid-layout fa-options="scopeOptionsObject">
 *   <!-- zero or more render nodes -->
 * </fa-grid-layout>
 * ```
 */

angular.module('famous.angular')
  .directive('faGridLayout', function (famous, famousDecorator, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var GridLayout = famous["famous/views/GridLayout"];
            var ViewSequence = famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new GridLayout(options);

            var updateGridLayout = function(){
              _children.sort(function(a, b){
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(_children.map(function(c){
                return c.renderNode
              }));
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateGridLayout();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
	            var _c = [];
	            angular.forEach(_children, function(c) {
		          if(c.id !== data.id) {
			        _c.push(c);
		          }
	            });
                _children = _c;
                updateGridLayout();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  });
