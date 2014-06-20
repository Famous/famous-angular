angular.module('famous.angular')
  .directive('faRouter', ["$famous", "$famousDecorator","$famousState","$compile", "$controller", 
   function ($famous, $famousDecorator,$famousState ,$compile, $controller) {
            
    return {
      scope: true,
      transclude: 'true',
      template: '<div class="fa-router"></div>',
      restrict: 'EA',
      compile: function(element , attrs, transclude ) {
            var parent;
            var initial = element.html();

        return {
          pre : function($scope , element, attrs ) {
            var isolate = $famousDecorator.ensureIsolate($scope);
            var RenderController = $famous['famous/views/RenderController'];
            var renderController = new RenderController();
           
            
             isolate.renderNode = isolate.renderNode || renderController; 
             isolate.states = isolate.states || {}; 
             isolate.currentState = isolate.currentState || 'root';
            
            function updateView (evt, data) {
              console.log(data);

              if(evt.targetScope.$id !== $scope.$id){

                var previousView = isolate.states[isolate.fromState];
                var currentView = isolate.states[isolate.currentState] ;
                console.log('state ',isolate.currentState,'currentView :',currentView);
                currentView.renderNode =  data.renderNode;
                if(previousView && previousView.renderNode){

                  
                  if(previousView.outTransitions ){
                    if(previousView.outTransitionTo.outTransformFrom) {
                      isolate.renderNode.outTransformFrom(previousView.outTransitions.outTransformFrom);
                    }
                    if( previousView.outTransitions.outOpacityFrom) {
                      isolate.renderNode.outOpacityFrom(previousView.outTransitions.outOpacityFrom);
                    }
                    if( previousView.outTransitions.outOriginFrom) {
                     isolate.renderNode.outOriginFrom(previousView.outTransitions.outOriginFrom);
                    }
                  }
                  isolate.renderNode.hide(previousView.outTransitionFrom.transitions,function() {
                    console.log('hide completed');
                  });
                }
                   if(currentView.inTransitions ){
                    if(currentView.inTransitions.inTransformTo) {
                      isolate.renderNode.inTransformFrom(currentView.inTransitions.inTransformTo);
                    }
                    if( currentView.inTransitions.inOpacityTo) {
                      isolate.renderNode.inOpacityFrom(currentView.inTransitions.inOpacityTo);
                    }
                    if( currentView.inTransitions.inOriginTo) {
                     isolate.renderNode.inOriginFrom(currentView.inTransitions.inOriginTo);
                    }
                  }
                isolate.renderNode.show(currentView.renderNode, currentView.inTransistionsFrom.transitions,function () {
                  console.log('show completed');
                });
                evt.stopPropagation();
              }
                 
            }
            $scope.$on('registerChild', updateView);


          },
          post : function($scope , element, attrs) {

            

            var isolate = $famousDecorator.ensureIsolate($scope);
            var currentScope , currentEl , previousEL, locals,flipperScope;
            console.log("post = ",isolate);
            $scope.$on('$stateChangeSuccess', createView);
              
            function createView() {
              if( isolate.currentState === $famousState.current) return;
              
              locals =   isolate.states[$famousState.current] || $famousState.$current;

              currentEl = "<fa-view>" + $famousState.$template.data +"</fa-view>";
              element.html(currentEl);
              if (currentScope) {
                currentScope.$destroy();
                currentScope = null;
              }
              console.log("local scope :",locals.$scope, $famousState.current);
             
              currentScope =  $scope.$new();
              isolate.fromState = isolate.currentState;
              isolate.currentState = $famousState.current;
              console.log(currentScope);

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

              currentScope.$emit('$viewContentLoaded');

            }


            $scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  }]);