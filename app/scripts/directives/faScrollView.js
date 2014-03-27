'use strict';

angular.module('integrationApp')
  .directive('faScrollView', function (famous) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element, attrs) {
      },
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){

            var ScrollView = famous["famous/views/scrollview"];
            var ViewSequence = famous['famous/core/viewsequence'];
            var Surface = famous['famous/core/surface'];

            var surfaces = new ViewSequence();

            for(var i = 0; i < 50; i++) {
                surfaces.push(new Surface({content: 'Item ' + i, size:[100, 20]}));
            }

            var _children = [];

            console.log("surfaces", surfaces)

            scope.view = new ScrollView({
              itemSpacing: 1 
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
            scope.modifier = {};
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: scope.view, mod: scope.modifier});
          }
        };
      },
      scope: {}
    };
  });
