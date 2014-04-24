// 
// © 2014 Thomas Street LLC. All rights reserved
//



angular.module('famous.angular')
  .directive('faScrollView', function (famous, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            scope.isolate = scope.isolate || {};
            scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};
            var isolate = scope.isolate[scope.$id];

            var ScrollView = famous["famous/views/ScrollView"];
            var ViewSequence = famous['famous/core/ViewSequence'];
            var Surface = famous['famous/core/Surface'];

            var _children = [];

            isolate.view = new ScrollView({
              itemSpacing: 10
            });

            if (attrs.faPipeFrom) {
              (scope.$eval(attrs.faPipeFrom)).pipe(isolate.view);
            }

            var updateScrollview = function(){
              _children.sort(function(a, b){
                return a.index - b.index;
              });
              isolate.view.sequenceFrom(_.map(_children, function(c){
                return c.view
              }));
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateScrollview();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children = _.reject(_children, function(c){
                  return c.id === data.id
                });
                updateScrollview();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });
            scope.$emit('registerChild', {view: isolate.view, mod: isolate.modifier});
          }
        };
      }
    };
  });
