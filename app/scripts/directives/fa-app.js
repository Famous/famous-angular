'use strict';

angular.module('integrationApp')
  .directive('faApp', ["famous", function (famous) {
    return {
      template: '<div style="display: none;" ng-transclude></div>',
      transclude: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        console.log('compiling app');
        return {
          pre: function(scope, element, attrs){
            var View = famous['famous/core/view'];
            console.log('app pre');
            console.log('app post');
            element.append('<div class="famous-angular-container" style="height: 400px;"></div>');
            var famousContainer = $(element.find('.famous-angular-container'))[0];
            var Engine = famous['famous/core/engine'];
            scope.context = Engine.createContext(famousContainer);

            function AppView(){
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            scope.view = new AppView();
            scope.context.add(scope.view);
          },
          post: function(scope, element, attrs){
            
          }
        }
      }
    };
  }]);
