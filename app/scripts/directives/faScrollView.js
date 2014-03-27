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
            console.log("scroll view pre");

            var ScrollView = famous["famous/views/scrollview"];
            var ViewSequence = famous['famous/core/viewsequence'];
            var Surface = famous['famous/core/surface'];

            var _children = [];

            scope.view = new ScrollView({
              itemSpacing: 10
            });

            window.Engine.pipe(scope.view);

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                console.log("scroll view registered", data);
                _children.push(data.view);
                scope.view.sequenceFrom(_children);
                evt.stopPropagation();
              };
            });
            scope._modifier = {};
            scope.modifier = function(){
              return scope._modifier;
            };
          },
          post: function(scope, element, attrs){
            if(scope.faController)
              $controller(scope.faController, {'$scope': scope})

            console.log("scroll view post");

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.view, mod: scope.modifier});
          }
        };
      },
      scope: { 
        "faController": '@'
      }
    };
  });
