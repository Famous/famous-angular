'use strict';

angular.module('integrationApp')
  .directive('faApp', ["famous", function (famous) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        element.append('<div class="fa-famous-container"></div>');
        var famousContainer = $(element.find('.fa-famous-container'))[0];
        var Engine = famous['famous/core/Engine'];
        scope.context = Engine.createContext(famousContainer);
      }
    };
  }]);
