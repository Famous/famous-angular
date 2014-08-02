'use strict';

describe('faFlipper', function() {
  var common, element, $compile, $scope, $famous, Flipper, Surface, View;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
    Flipper = $famous['famous/views/Flipper'];
    Surface = $famous['famous/core/Surface'];
    View = $famous['famous/core/View'];
  }));

  it("should create an instance of Famo.us Flipper", function() {
    var faFlipper = $compile('<fa-flipper></fa-flipper>')($scope);
    var flipper = common.getIsolateFromElement(faFlipper).renderNode;
    expect(typeof flipper).toBe('object');
    expect(flipper instanceof Flipper).toBe(true);
  });

  it("should set its children the the front and back properties of the Flipper", function() {
    var surfaceContent;
    $scope.$on('registerChild', function(event, isolate) {
      surfaceContent = angular.element(isolate.renderNode.content)[0];
    });
    var faFlipper = $compile('<fa-flipper><fa-surface></fa-surface><fa-view></fa-view></fa-flipper>')($scope);
    var flipper = common.getIsolateFromElement(faFlipper).renderNode;
    expect(flipper.frontNode._object instanceof Surface).toBe(true);
    expect(flipper.backNode._object instanceof View).toBe(true);

  });

  it("should throw an exception if more than two child elements are added", function(){
    expect(function(){
      var faFlipper = $compile('<fa-flipper><fa-surface></fa-surface><fa-view></fa-view><fa-view></fa-view></fa-flipper>')($scope);
    }).toThrow();
  });
  describe("hide and show", function() {

    it("hide and show properties on the Flipper", function() {
       var faFlipper = $compile('<fa-flipper><fa-surface></fa-surface><fa-view></fa-view></fa-flipper>')($scope);
      var scope = faFlipper.scope();
      var isolate = faFlipper.scope().isolate[scope.$id];
      
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
      isolate.hide()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.emptyNode).toEqual(true);

      isolate.show()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
    });
  });

});

