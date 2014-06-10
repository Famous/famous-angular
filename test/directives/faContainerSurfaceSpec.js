'use strict';

describe('faContainerSurface', function() {
  var common, element, $compile, $scope, $famous, ContainerSurface;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;
    ContainerSurface = $famous['famous/surfaces/ContainerSurface'];

    common = window.famousAngularCommon($scope, $compile);
  }));


  it("should create an instance of Famo.us ContainerSurface", function() {
      var app = common.createApp(
        '<fa-container-surface id="container-surface">' +
        '</fa-container-surface>', 100, $scope
      );

      $scope.$apply();

      var containerSurface = $famous.find('#container-surface')[0].renderNode;
      expect(typeof containerSurface).toBe('object');
      expect(containerSurface instanceof ContainerSurface).toBe(true);
      common.destroyApp(app);
  });


  it("should add child elements to the ContainerSurface's context", function() {
    var surfaceContent;

    var app = common.createApp(
      '<fa-container-surface id="container-surface">' +
        '<fa-surface>surfacecontent</fa-surface>' +
      '</fa-container-surface>', 100, $scope
    );

    $scope.$apply();

    var containerSurface = $famous.find('#container-surface')[0].renderNode;
    
    var surface = containerSurface.context._node._child._object;

    expect(/surfacecontent/.test(surface.content.innerHTML)).toEqual(true);
    common.destroyApp(app);
  });


});

