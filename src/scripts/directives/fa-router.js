angular.module('famous.angular')
  .directive('faRouter', ["$famous", "$famousDecorator","$famousState","$compile", "$controller", 
   function ($famous, $famousDecorator,$famousState ,$compile, $controller) {
            
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-router"></div>',
      restrict: 'EA',
      compile: function(element , attrs, transclude ) {
            console.log("fa-router compile");
            var initial          = element.html();
            // var currentScope;


        return {
          pre : function($scope , element, attrs ) {
            var isolate = $famousDecorator.ensureIsolate($scope);
            var RenderController = $famous['famous/views/RenderController'];
            var renderController = new RenderController();
            // console.log(isolate);
            
            if(!isolate.renderNode) { 
              isolate.renderNode = renderController;
            }

            if(!isolate.states) { isolate.states = {}; }
            if( !isolate.currentState) { isolate.currentState = 'root'; }
            
            function updateView (evt, data) {

              if(evt.targetScope.$id !== $scope.$id){

                var previousView = isolate.states[isolate.fromState];
                var currentView = isolate.states[isolate.currentState] ;
                
                currentView.renderNode =  data.renderNode;
                if(previousView && previousView.renderNode){
                  isolate.renderNode.hide(previousView.renderNode, previousView.outTransition(),function() {
                    // 
                  });
                }
                console.log(currentView);
                isolate.renderNode.show(currentView.renderNode, currentView.inTransition() );
                evt.stopPropagation();
              }
                 
            }
            $scope.$on('registerChild', updateView);


          },
          post : function($scope , element, attrs) {

            var isolate = $famousDecorator.ensureIsolate($scope);
            var currentScope;
            // console.log("post = ",isolate);
            $scope.$on('$stateChangeSuccess', createView);
            
            function createView() {
              console.log("createView :", $famousState.current,$famousState.$current);
              if( isolate.currentState === $famousState.current) return;
              var locals =   $famousState.$current;


              isolate.fromState = isolate.currentState;
              isolate.states[$famousState.current] = locals;
              isolate.currentState = $famousState.current;

              var currentEl = angular.element("<fa-view>" + $famousState.$template.data +"</fa-view>");
              // element.append(currentEl);

              currentScope = $scope.$new();
              $compile(currentEl)(currentScope);
              if(locals.controller){
                locals.$scope = currentScope;
                var controller = $controller(locals.controller, locals);
                if($famousState.$current.controllerAs){
                  currentScope[$famousState.$current.controllerAs] = controller;
                }
                currentEl.children().data('$ngControllerController',controller);                
              }
              currentScope.$emit('$viewContentLoaded');

            }


            $scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  }]);