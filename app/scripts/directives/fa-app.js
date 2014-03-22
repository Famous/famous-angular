'use strict';

angular.module('integrationApp')
  .directive('faApp', ["famous", function (famous) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.append('<div class="famous-angular-container"></div>');
        var famousContainer = $(element.find('.famous-angular-container'))[0];
        var Engine = famous['famous/core/engine'];

        function AppView(){

        }

        AppView.prototype = Object.create(famous['famous/core/view'].prototype);
        AppView.prototype.constructor = AppView;

        scope.view = AppView;
        scope.context = Engine.createContext(famousContainer);
      }
    };
  }]);
