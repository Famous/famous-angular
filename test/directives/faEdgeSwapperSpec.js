'use strict';

describe('faEdgeSwapper', function() {
  var common, element, $compile, $scope, $famous, EdgeSwapper, Surface, View;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
    EdgeSwapper = $famous['famous/views/EdgeSwapper'];
    Surface = $famous['famous/core/Surface'];
    View = $famous['famous/core/View'];
  }));

  it("should create an instance of Famo.us EdgeSwapper on top of an ng-include", function() {
    var faEdgeSwapper = $compile('<ng-include fa-edge-swapper></ng-include>')($scope);
    var edgeSwapper = common.getIsolateFromElement(faEdgeSwapper).renderNode;
    expect(typeof edgeSwapper).toBe('object');
    expect(edgeSwapper instanceof EdgeSwapper).toBe(true);
  });


  it("should create a $$animateEnterHandler function on its isolate", function() {
    var faEdgeSwapper = $compile('<ng-include fa-edge-swapper></ng-include>')($scope);
    var edgeSwapper = common.getIsolateFromElement(faEdgeSwapper);
    expect(edgeSwapper.$$animateEnterHandler instanceof Function).toBe(true);
  });

  it("should create a $$animateLeaveHandler function on its isolate", function() {
    var faEdgeSwapper = $compile('<ng-include fa-edge-swapper></ng-include>')($scope);
    var edgeSwapper = common.getIsolateFromElement(faEdgeSwapper);
    expect(edgeSwapper.$$animateLeaveHandler instanceof Function).toBe(true);
  });

  it("should should have both animate handler functions fire when its ng-include changes its src", function() {
    pending();
    //may need to muck with templateCache in order to change ng-include's src
  });

});

