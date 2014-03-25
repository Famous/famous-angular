'use strict';

angular.module('integrationApp')
  .directive('faView', ["famous", function (famous) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        console.log('compiling app');
        return {
          pre: function(scope, element, attrs){
            var View = famous['famous/core/view'];
            //TODO:  add custom classes from attrs (or just pass through all attrs?) to
            //       the container element.

            function FaView(){
              View.apply(this, arguments);
            }

            FaView.prototype = Object.create(View.prototype);
            FaView.prototype.constructor = FaView;

            scope.view = new FaView();
            scope.context.add(scope.view);

            scope.$on('registerChild', function(evt, data){
              if(data.mod && data.view){
                scope.view._add(data.mod).add(data.view);
              }else if(data.view){
                scope.view._add(data.view);
              }
              evt.stopPropagation();
            })
          },
          post: function(scope, element, attrs){
            scope.$emit('registerChild', {view: scope.surface, mod: scope.modifier});
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
          }
        }
      }
    };
  }]);
