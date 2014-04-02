'use strict';

angular.module('integrationApp')
  .directive('faScrollView', function (famous, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      priority: 100,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){

            var ScrollView = famous["famous/views/ScrollView"];
            var ViewSequence = famous['famous/core/ViewSequence'];
            var Surface = famous['famous/core/Surface'];

            var _children = [];

            scope.view = new ScrollView({
              itemSpacing: 100
            });

            if (scope["faPipeFrom"]) {
              scope["faPipeFrom"].pipe(scope.view);
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data.view);
                scope.view.sequenceFrom(_children);
                evt.stopPropagation();
              };
            });

          },
          post: function(scope, element, attrs){
            if(scope.faController)
              $controller(scope.faController, {'$scope': scope})


            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.view, mod: scope.modifier});
          }
        };
      },
      scope: { 
        "faController": '@',
        "faPipeFrom": '='
      }
    };
  });
