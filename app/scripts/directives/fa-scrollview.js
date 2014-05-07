



angular.module('famous.angular')
  .directive('faScrollView', function (famous, famousDecorator, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var ScrollView = famous["famous/views/Scrollview"];
            var ViewSequence = famous['famous/core/ViewSequence'];
            var Surface = famous['famous/core/Surface'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ScrollView(options);

            if (attrs.faPipeFrom) {
              (scope.$eval(attrs.faPipeFrom)).pipe(isolate.renderNode);
            }


            var updateScrollview = function(init){
              _children.sort(function(a, b){
                return a.index - b.index;
              });

              var options = {
                array: _.map(_children, function(c){ return c.renderNode }) 
              };
              if(init){
                options.index = scope.$eval(attrs.faStartIndex);
              }
              var viewSeq = new ViewSequence(options);
              isolate.renderNode.sequenceFrom(viewSeq);
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateScrollview(true);
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
            var isolate = famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.renderNode)
            scope.$emit('registerChild', {renderNode: isolate.renderNode});

          }
        };
      }
    };
  });
