'use strict';

describe('faDrawerLayout', function () {
  var common, element, $compile, $scope, $famous, DrawerLayout, Surface, View;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
    DrawerLayout = $famous['famous/views/DrawerLayout'];
    Surface = $famous['famous/core/Surface'];
    View = $famous['famous/core/View'];
  }));

  it("should create an instance of Famo.us DrawerLayout", function () {
    var faDrawerLayout = $compile('<fa-drawer-layout></fa-drawer-layout>')($scope);
    var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

    expect(typeof drawerLayout).toBe('object');
    expect(drawerLayout instanceof DrawerLayout).toBe(true);
  });

  it("should set its children as the content and drawer properties of the DrawerLayout", function () {
    var surfaceContent;
    $scope.$on('registerChild', function(event, isolate) {
      surfaceContent = angular.element(isolate.renderNode.content)[0];
    });
    var faDrawerLayout = $compile('<fa-drawer-layout><fa-surface></fa-surface><fa-view></fa-view></fa-drawer-layout>')($scope);
    var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

    expect(drawerLayout.content._child._object instanceof Surface).toBe(true);
    expect(drawerLayout.drawer._child._object instanceof View).toBe(true);

  });

  it("should throw an exception if more than two child elements are added", function () {
    expect(function () {
      var faDrawerLayout = $compile('<fa-drawer-layout><fa-surface></fa-surface><fa-view></fa-view><fa-view></fa-view></fa-drawer-layout>')($scope);
    }).toThrow();
  });

  describe("hide and show", function () {
    it("hide and show properties on the DrawerLayout", function () {
      var faDrawerLayout = $compile('<fa-drawer-layout><fa-surface></fa-surface><fa-view></fa-view></fa-drawer-layout>')($scope);
      var scope = faDrawerLayout.scope();
      var isolate = faDrawerLayout.scope().isolate[scope.$id];
      
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
      isolate.hide()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.emptyNode).toEqual(true);

      isolate.show()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
    });
  });

  it("should unregister a child when it is destroyed", function () {
    var faDrawerLayout = $compile('<fa-drawer-layout><fa-surface></fa-surface><fa-surface class="destroy-me"></fa-surface></fa-drawer-layout>')($scope);
    var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;
    var children = common.getIsolateFromElement(faDrawerLayout).children;
    var destroyMe = faDrawerLayout[0].querySelectorAll('.destroy-me');

    expect(drawerLayout.drawer._child).not.toBe(null);
    angular.element(destroyMe[0]).remove();
    expect(drawerLayout.drawer._child).toBe(null);
  });

  describe('should accept attribute', function () {
    it('fa-drawer-length - to set the size of the concealed drawer', function () {
      var faDrawerLayout = $compile('<fa-drawer-layout fa-drawer-length="240"><fa-surface></fa-surface><fa-surface></fa-surface></fa-drawer-layout>')($scope);
      var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

      expect(drawerLayout.options.drawerLength).toEqual(240);
    });

    describe('fa-side - to set the position of the concealed drawer', function () {
      it('\'left\' - aligns to the LEFT side', function () {
        var faDrawerLayout = $compile('<fa-drawer-layout fa-side="\'left\'"><fa-surface></fa-surface><fa-surface></fa-surface></fa-drawer-layout>')($scope);
        var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

        expect(drawerLayout.options.side).toEqual(DrawerLayout.SIDES.LEFT);
      });

      it('\'top\' - aligns to the TOP side', function () {
        var faDrawerLayout = $compile('<fa-drawer-layout fa-side="\'top\'"><fa-surface></fa-surface><fa-surface></fa-surface></fa-drawer-layout>')($scope);
        var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

        expect(drawerLayout.options.side).toEqual(DrawerLayout.SIDES.TOP);
      });

      it('\'right\' - aligns to the RIGHT side', function () {
        var faDrawerLayout = $compile('<fa-drawer-layout fa-side="\'right\'"><fa-surface></fa-surface><fa-surface></fa-surface></fa-drawer-layout>')($scope);
        var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

        expect(drawerLayout.options.side).toEqual(DrawerLayout.SIDES.RIGHT);
      });

      it('\'bottom\' - aligns to the BOTTOM side', function () {
        var faDrawerLayout = $compile('<fa-drawer-layout fa-side="\'bottom\'"><fa-surface></fa-surface><fa-surface></fa-surface></fa-drawer-layout>')($scope);
        var drawerLayout = common.getIsolateFromElement(faDrawerLayout).renderNode;

        expect(drawerLayout.options.side).toEqual(DrawerLayout.SIDES.BOTTOM);
      });
    });
  });
});
