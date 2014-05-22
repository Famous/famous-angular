'use strict';

describe('faSurface', function() {
  var element, $compile, $scope, $famous;
  var compileFaSurface, getSurface;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    compileFaSurface = function(attr) {
      return $compile('<fa-surface ' + attr + '></fa-surface>')($scope);
    };

    // faSurface must be an angular element so that .scope() can be called on it
    getSurface = function(faSurface) {
      var scope = faSurface.scope();
      var surface = scope.isolate[scope.$id].renderNode;
      return surface;
    };
  }));

  ddescribe('should accept attribute', function() {
     
    it('fa-size', function() {
      //var faSurface = $compile('<fa-surface fa-size="[300,300]"></fa-surface>')($scope);
      var faSurface = compileFaSurface('fa-size="[300, 300]"');
      var surface = getSurface(faSurface);
      expect(surface.getSize()).toEqual([300, 300]);
    });

  
    it("fa-background-color to set the surface's color", function() {
    // Have to escape the third level of quotes for string literals
      var faSurface = compileFaSurface('fa-background-color="\'#97DED\'"');
      var surface = getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.backgroundColor).toEqual("#97DED");
    });

    it('fa-color', function() {
      var faSurface = compileFaSurface('fa-color="\'red\'"');
      var surface = getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.color).toEqual("red");
    });

    iit('fa-origin', function() {
      var faSurface = compileFaSurface('fa-origin="\'[0.5, 1]\'"');
      var surface = getSurface(faSurface);
      var properties = surface.getProperties();
      //console.log(pr);
      //expect(properties.color).toEqual("red");
    });

    it('fa-translate', function() {
    
    });

    it('fa-rotate-z', function() {
    
    });
  
    it('fa-skew', function() {
    
    });


    it('fa-class', function() {
    
    });
  });



});

