'use strict';

describe('faSurface', function() {
  var element, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;
    element = $compile('<div></div>')($scope);
  }));

  describe('should accept attribute', function() {
  
    it('fa-background-color', function() {
    
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

