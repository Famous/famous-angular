angular.module('famous.angular')
.directive('faRouter', ["$famous", "$famousDecorator", "$famousState", "$compile", "$controller", "$parse",
 function ($famous, $famousDecorator, $famousState, $compile, $controller, $parse) {
  return {
    scope: true,
    transclude: 'true',
    restrict: 'ECA',
    compile: function(element , attrs, transclude ) {
          var parent;
          var initial = element.html();

      return   function($scope , element, attrs) {

          var isolate = $famousDecorator.ensureIsolate($scope);
          var View = $famous['famous/core/View'];
          var RenderNode = $famous['famous/core/RenderNode'];
          var Modifier = $famous['famuos/core/Modifier'];
          var anchorNode = new View();
          isolate.renderNode = anchorNode;
          var previousNode = new RenderNode();
          var currentNode = new RenderNode();

          anchorNode.add(previousNode);
          anchorNode.add(currentNode);

          var currentScope , currentEl, locals;

          isolate.renderNode = isolate.renderNode || anchorNode; 
          isolate.states = isolate.states || {}; 
          isolate.currentState = isolate.currentState || 'root';
          
             
          function updateView(evt, data) {

            if(evt.targetScope.$id !== $scope.$id) {
              var inTransitionFromFn, outTransitionToFn, inTransitionFromFnStr, outTransitionToFnStr;
              var previousView = isolate.states[isolate.fromState];
              var currentView = isolate.states[isolate.currentState] ;
              currentView.isolate = data;

              currentNode.set(currentView.isolate.renderNode);
              if(currentView.inTransitionFrom) {
                if(angular.isString(currentView.inTransitionFrom)) {
                  inTransitionFromFnStr = currentView.inTransitionFrom;
                }
                else if(angular.isObject(currentView.inTransitionFrom)) {
                  inTransitionFromFnStr = currentView.inTransitionFrom[isolate.fromState]?
                                             currentView.inTransitionFrom[isolate.fromState] :
                                             currentView.inTransitionFrom['default']? 
                                             currentView.inTransitionFrom['default'] :
                                             "";
                                             
                }
                if(!!inTransitionFromFnStr) {
                  inTransitionFromFn = $parse(inTransitionFromFnStr);
                  inTransitionFromFn(currentView.$scope, {$callback : function() {
                    console.log('show completed');
                  }});
                }
              }
              
              if(previousView && previousView.isolate.renderNode && previousView.outTransitionTo) {
                previousNode.set(previousView.isolate.renderNode);
                if(angular.isString(previousView.outTransitionTo)) {
                   outTransitionToFnStr = previousView.outTransitionTo;
                }else if(angular.isObject(previousView.outTransitionTo)) {
                  outTransitionToFnStr = previousView.outTransitionTo[isolate.currentState]?
                                             previousView.outTransitionTo[isolate.currentState] :
                                             previousView.outTransitionTo['default']? 
                                             previousView.outTransitionTo['default'] :
                                             "";
                }
                if(!!outTransitionToFnStr) {
                  outTransitionToFn = $parse(outTransitionToFnStr);
                  outTransitionToFn(previousView.$scope, { $callback : function() {
                    previousNode.set(new RenderNode());
                    console.log('hide completed');
                  }});
                }

              }

              evt.stopPropagation();
            }
               
          }
          function createView() {
            if( isolate.currentState === $famousState.current) return;
            
            locals =   isolate.states[$famousState.current] || $famousState.$current;
            currentEl = locals.$template;
            isolate.fromState = isolate.currentState;
            isolate.currentState = $famousState.current;
            if(element[0].children[0]){
              element[0].children[0].remove();
            }

            if(isolate.states[isolate.currentState] && isolate.states[isolate.currentState].isolate) {
              currentScope = isolate.states[isolate.currentState].$scope;
              element.append(isolate.states[isolate.currentState].element);
              currentScope.$emit('registerChild',isolate.states[isolate.currentState].isolate);
            }else {

              element.html(currentEl);
              currentScope =  $scope.$new();
              var link  = $compile(element.contents());
              locals.$scope =  currentScope;
              isolate.states[$famousState.current] = locals;
              if(locals.controller){
                var controller = $controller(locals.controller, locals);
                if($famousState.$current.controllerAs){
                  currentScope[$famousState.$current.controllerAs] = controller;
                }
                
                angular.element(currentEl).data('$ngControllerController',controller);   
              }

              link(currentScope);
               isolate.states[$famousState.current].element = angular.element(element[0].children[0]);
            }

            currentScope.$emit('$viewContentLoaded');

          }
          
          $scope.$on('registerChild', updateView);
          $scope.$on('$stateChangeSuccess', createView);
         

          $scope.$emit('registerChild', isolate);
        };
      }
    
    };
}]);
