'use strict';

angular.module('integrationApp')
  .directive('tsEnvelope', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the tsEnvelope directive');
      }
    };
  });
