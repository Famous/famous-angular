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
    }
  }
};
