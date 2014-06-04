'use strict';

window.famousAngularCommon = function($scope, $compile) {
  return {
    compileFaSurface: function(attr, scope) {
      return $compile('<fa-surface ' + attr + '></fa-surface>')(scope || $scope);
    },
    // faSurface must be an angular element so that .scope() can be called on it
    getSurface: function(faSurface) {
      var scope = faSurface.scope();
      var surface = scope.isolate[scope.$id].renderNode;
      return surface;
    },
    createApp: function(markup, height, scope) {
      height = height || 100;

      var app = $compile(
        '<fa-app style="height: ' + height + 'px">' +
          markup +
        '</fa-app>'
      )(scope || $scope)[0];

      document.body.appendChild(app);
      return app;
    },
    destroyApp: function(app) {
      document.body.removeChild(app);
    },
    mockEvent: function(eventData) {
      return new CustomEvent('mock', eventData || {});
    },
    getIsolateFromElement: function(elem){
      var scope = elem.scope();
      var isolate = scope.isolate[scope.$id];
      return isolate;
    }
  }
};
