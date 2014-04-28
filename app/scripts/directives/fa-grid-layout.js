// 
// © 2014 Thomas Street LLC. All rights reserved
//



angular.module('famous.angular')
  .directive('faGridLayout', function (famous, $controller) {
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

            var GridLayout = famous["famous/views/GridLayout"];
            var ViewSequence = famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.view = new GridLayout(options);

            if (attrs.faPipeFrom) {
              (scope.$eval(attrs.faPipeFrom)).pipe(isolate.view);
            }

            var updateGridLayout = function(){
              _children.sort(function(a, b){
                return a.index - b.index;
              });
              isolate.view.sequenceFrom(_.map(_children, function(c){
                return c.view
              }));
            }

            scope.$on('registerChild', function(evt, data){
              console.log('grid receiving child', data)
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateGridLayout();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children = _.reject(_children, function(c){
                  return c.id === data.id
                });
                updateGridLayout();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = scope.isolate[scope.$id];

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.view)
            scope.$emit('registerChild', {view: isolate.view});
          }
        };
      }
    };
  });
