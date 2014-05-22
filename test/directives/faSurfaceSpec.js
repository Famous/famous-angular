'use strict';

describe('faSurface', function() {
  var element, $compile, $scope, $famous;
  var compileFaSurface, getSurfaceProperties;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    compileFaSurface = function(attr) {
      return $compile('<fa-surface ' + attr + '></fa-surface>')($scope);
    };

    // faSurface must be an angular element so that .scope() can be called on it
    getSurfaceProperties = function(faSurface) {
      var scope = faSurface.scope();
      var surface = scope.isolate[scope.$id].renderNode;
      return surface.getProperties();
    };
  }));

  ddescribe('should accept attribute', function() {
  
    it("fa-background-color to set the surface's color", function() {
    // Have to escape the third level of quotes for string literals
      var faSurface = compileFaSurface("fa-background-color='\"#97DED\"'");
      var properties = getSurfaceProperties(faSurface);
      expect(properties.backgroundColor).toBeDefined();
      expect(properties.backgroundColor).toEqual("#97DED");
    });

    it('fa-color', function() {
    
    });

    it('fa-origin', function() {
    
    });

    it('fa-translate', function() {
    
    });

    it('fa-rotate-z', function() {
    
    });
  
    it('fa-skew', function() {
    
    });

    it('fa-size', function() {
    
    });

    it('fa-class', function() {
    
    });
  });



});

