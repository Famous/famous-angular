'use strict';

describe('faImageSurface', function() {
  var common, element, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
  }));


  it("should create an instance of Famo.us ImageSurface", function() {
      var ImageSurface = $famous['famous/surfaces/ImageSurface'];
      var faImageSurface = $compile('<fa-image-surface fa-image-url="404.png"></fa-image-surface)')($scope);
      var scope = faImageSurface.scope();
      var imageSurface = scope.isolate[scope.$id].renderNode
      expect(typeof imageSurface).toBe('object');
      expect(imageSurface instanceof ImageSurface).toBe(true);
  });

  it("should assign the ImageSurface's URL based on the fa-image-url attribute", function() {
      var ImageSurface = $famous['famous/surfaces/ImageSurface'];
      var faImageSurface = $compile('<fa-image-surface fa-image-url="404.png"></fa-image-surface)')($scope);
      var scope = faImageSurface.scope();
      var imageSurface = scope.isolate[scope.$id].renderNode
      expect(imageSurface._imageUrl).toBe('404.png');
  });

});