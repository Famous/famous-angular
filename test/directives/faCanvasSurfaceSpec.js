'use strict';

describe('faCanvasSurface', function() {
  var common, element, $compile, $scope, $famous, CanvasSurface;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
    CanvasSurface = $famous['famous/surfaces/CanvasSurface'];
  }));

  it("should create an instance of Famo.us CanvasSurface", function() {
    var faCanvasSurface = $compile('<fa-canvas-surface></fa-canvas-surface>')($scope);
    var canvasSurface = common.getIsolateFromElement(faCanvasSurface).renderNode;
    expect(typeof canvasSurface).toBe('object');
    expect(canvasSurface instanceof CanvasSurface).toBe(true);
  });


  it("should throw an exception if any child content is added", function(){
    pending();
    expect(function(){
      var faCanvasSurface = $compile('<fa-canvas-surface>illegal content</fa-canvas-surface>')($scope);
    }).toThrow();
  });

});

