angular.module('famous.angular')
  .directive('faRouter', ["$famous", "$famousDecorator", "$famousState", "$compile", "$controller", "$parse",
   function ($famous, $famousDecorator, $famousState, $compile, $controller, $parse) {
            
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
                  if(previousView.outTransitionTo) {
                    var outTransitionToFn = $parse(previousView.outTransitionTo);
                    outTransitionTo(previousView.$scope, {$callback : function(){
                      isolate.renderNode.hide( {duration:0} ,function() {
                        console.log('hide completed');
                      });
                    }})
                  }
                  else {
                    isolate.renderNode.hide( null ,function() {
                      console.log('hide completed without transtions');
                    });
                  }
                  
                }

                isolate.renderNode.show(currentView.renderNode, {duration:0},function () {

                  if(currentView.inTransitionFrom){
                    console.log(currentView.inTransitionFrom);
                    var inTransitionFrom = $parse(currentView.inTransitionFrom);
                    inTransitionFrom(currentView.$scope, {$callback : function() {
                      console.log('show completed');
                    }});
                  }
                  else {
                    console.log('show completed without transtions');

                  }
                 
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

              currentEl = "<fa-view>" + $famousState.$template +"</fa-view>";
              element.html(currentEl);
              if (currentScope) {
                currentScope.$destroy();
                currentScope = null;
              }
              console.log("local scope :",locals.$scope, currentEl);
             
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