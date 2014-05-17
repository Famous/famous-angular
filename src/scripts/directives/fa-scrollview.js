



angular.module('famous.angular')
  .directive('faScrollView', function (famous, famousDecorator, $timeout, $controller) {
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

            var updateScrollview = function(init){
              //$timeout hack used here because the
              //updateScrollview function will get called
              //before the $index values get re-bound
              //through ng-repeat.  The result is that
              //the items get sorted here, then the indexes
              //get re-bound, and thus the results are incorrectly
              //ordered.
              $timeout(function(){
                _children.sort(function(a, b){
                  return a.index - b.index;
                }); 

                var options = {
                  array: _children.map(function(c){ return c.renderNode })
                };
                //set the first page on the scrollview if
                //specified
                if(init)
                  options.index = scope.$eval(attrs.faStartIndex);
                
                var viewSeq = new ViewSequence(options);
                isolate.renderNode.sequenceFrom(viewSeq);

              })
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
	            var _c = [];
	            angular.forEach(_children, function(c) {
		          if(c.id !== data.id) {
			        _c.push(c);
		          }
	            });
	            _children = _c;
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

            scope.$emit('registerChild', isolate);

          }
        };
      }
    };
  });
