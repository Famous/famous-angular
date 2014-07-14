/**
 * @ngdoc directive
 * @name faRouter
 * @module famous.angular
 * @restrict ECA
 * @description
 * This directive is used to...
 *
 * @usage
 * ```html
 * <fa-app>
 *   <fa-router></fa-router>
 * </fa-app>
 * ```
 *
 * @example
 * An `fa-router` relies on its config for defined transitions which looks something like this:
 * 
 * ```javascript
 * angular.module('integrationApp', ['famous.angular'])
 *
 * .config(function($famousStateProvider, $famousUrlRouterProvider) {
 *   $famousUrlRouterProvider.otherwise('flipper');
 *   $famousStateProvider
 *   .state('flipper', {
 *     url: '/flipper',
 *     templateUrl: 'views/flipper.html',
 *     controller: 'FlipperCtrl',
 *     inTransitionFrom: 'inTransitionFunction',
 *     outTransitionTo: 'outTransitionFunction'
 *   })
 *   .state('untidy1', {
 *     url: '/untidy1',
 *     templateUrl: 'views/untidy1.html',
 *     controller: 'UntidyCtrl1',
 *     inTransitionFrom: {
 *       untidy2: 'from.untidy2',
 *       untidy1menu: 'from.untidymenu',
 *       default: 'from.default'
 *     },
 *     outTransitionTo: {
 *       untidy2: 'to.untidy2',
 *       untidy1menu: 'to.untidymenu',
 *       default: 'to.default'
 *     }
 *   })
 *   .state('untidy2', {
 *     url: '/untidy2',
 *     templateUrl: 'views/untidy2.html',
 *     controller: 'UntidyCtrl2',
 *     inTransitionFrom: {
 *       untidy1: 'from.untidy1',
 *       default: 'from.default'
 *     },
 *     outTransitionTo: {
 *       untidy1: 'to.untidy1',
 *       default: 'to.default'
 *     }
 *   })
 *   .state('untidy1menu', {
 *     url: '/untidy1/menu',
 *     templateUrl: 'views/untidymenu.html',
 *     controller: 'UntidyMenuCtrl',
 *     inTransitionFrom: {
 *       untidy1: 'from.untidy1',
 *       default: 'from.default'
 *     },
 *     outTransitionTo: {
 *       untidy1: 'to.untidy1',
 *       default: 'to.default'
 *     }
 *   });
 * ```
 */

angular.module('famous.angular')
  .directive('faRouter', ['$famous', '$famousDecorator', '$famousState', '$compile', '$controller', '$parse', function($famous, $famousDecorator, $famousState, $compile, $controller, $parse) {
    return {
      scope: true,
      transclude: true,
      restrict: 'ECA',
      compile: function(element, attrs, transclude) {
        var parent;
        var initial = element.html();

        return function($scope, element, attrs) {
            var View       = $famous['famous/core/View'];
            var RenderNode = $famous['famous/core/RenderNode'];
            var Modifier   = $famous['famuos/core/Modifier'];
            
            var isolate = $famousDecorator.ensureIsolate($scope);
            var anchorNode = new View();
            isolate.renderNode = anchorNode;

            var previousNode = new RenderNode();
            var currentNode = new RenderNode();

            anchorNode.add(previousNode);
            anchorNode.add(currentNode);

            var currentScope, currentEl, locals;

            isolate.renderNode = isolate.renderNode || anchorNode;
            isolate.states = isolate.states || {};
            isolate.currentState = isolate.currentState || 'root';
               
            function updateView(evt, data) {
              if(evt.targetScope.$id !== $scope.$id) {
                var inTransitionFromFn, outTransitionToFn, inTransitionFromFnStr, outTransitionToFnStr;
                var previousView = isolate.states[isolate.fromState];
                var currentView = isolate.states[isolate.currentState];

                currentView.isolate = data;
                currentNode.set(currentView.isolate.renderNode);

                if(currentView.inTransitionFrom) {
                  if(angular.isString(currentView.inTransitionFrom)) {
                    inTransitionFromFnStr = currentView.inTransitionFrom;
                  } else if(angular.isObject(currentView.inTransitionFrom)) {
                    if(currentView.inTransitionFrom[isolate.fromState]) {
                      inTransitionFromFnStr = currentView.inTransitionFrom[isolate.fromState];
                    } else if(currentView.inTransitionFrom['default']){
                      inTransitionFromFnStr = currentView.inTransitionFrom['default'];
                    } else {
                      inTransitionFromFnStr = '';
                    }
                  }
                  if(!!inTransitionFromFnStr) {
                    inTransitionFromFn = $parse(inTransitionFromFnStr);
                    inTransitionFromFn(currentView.$scope, {
                      $callback: function() {
                        console.log('show completed');
                      }
                    });
                  }
                }
                
                if(previousView && previousView.isolate.renderNode && previousView.outTransitionTo) {
                  previousNode.set(previousView.isolate.renderNode);
                  if(angular.isString(previousView.outTransitionTo)) {
                     outTransitionToFnStr = previousView.outTransitionTo;
                  } else if(angular.isObject(previousView.outTransitionTo)) {
                    if(previousView.outTransitionTo[isolate.currentState]) {
                      outTransitionToFnStr = previousView.outTransitionTo[isolate.currentState];
                    } else if(previousView.outTransitionTo['default']) {
                      outTransitionToFnStr = previousView.outTransitionTo['default'];
                    } else {
                      outTransitionToFnStr = '';
                    }
                  }
                  if(!!outTransitionToFnStr) {
                    outTransitionToFn = $parse(outTransitionToFnStr);
                    outTransitionToFn(previousView.$scope, {
                      $callback: function() {
                        previousNode.set(new RenderNode());
                        console.log('hide completed');
                      }
                    });
                  }
                }

                evt.stopPropagation();
              }
            }

            function createView() {
              if(isolate.currentState === $famousState.current) return;
              
              locals = isolate.states[$famousState.current] || $famousState.$current;
              currentEl = locals.$template;
              isolate.fromState = isolate.currentState;
              isolate.currentState = $famousState.current;

              if(element[0].children[0]) {
                element[0].children[0].remove();
              }

              if(isolate.states[isolate.currentState] && isolate.states[isolate.currentState].isolate) {
                currentScope = isolate.states[isolate.currentState].$scope;
                element.append(isolate.states[isolate.currentState].element);
                currentScope.$emit('registerChild', isolate.states[isolate.currentState].isolate);
              } else {
                element.html(currentEl);
                currentScope = $scope.$new();

                var link = $compile(element.contents());

                locals.$scope = currentScope;
                isolate.states[$famousState.current] = locals;

                if(locals.controller) {
                  var controller = $controller(locals.controller, locals);
                  if($famousState.$current.controllerAs) {
                    currentScope[$famousState.$current.controllerAs] = controller;
                  }
                  
                  angular.element(currentEl).data('$ngControllerController', controller);   
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

