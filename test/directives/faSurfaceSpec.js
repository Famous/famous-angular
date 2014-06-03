'use strict';

describe('faSurface', function() {
  var common, element, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    common = window.famousAngularCommon($scope, $compile);
  }));


  it("should create an instance of Famo.us Surface", function() {
      var Surface = $famous['famous/core/Surface'];
      var faSurface = common.compileFaSurface('fa-size="[300, 300]"');
      var surface = common.getSurface(faSurface);
      expect(typeof surface).toBe('object');
      expect(surface instanceof Surface).toBe(true);
  });


  it("should set it's children as the content for the created surface", function() {
    var surfaceContent;
    $scope.$on('registerChild', function(event, isolate) {
      surfaceContent = angular.element(isolate.renderNode.content)[0];
    });
    var faSurface = $compile('<fa-surface><span></span></fa-surface>')($scope);
    var children = faSurface[0].firstChild;
    expect(surfaceContent).toEqual(children);
  });


  describe('should accept attribute', function() {

    it('fa-size - to set the size of the surface', function() {
      var faSurface = common.compileFaSurface('fa-size="[300, 300]"');
      var surface = common.getSurface(faSurface);
      expect(surface.getSize()).toEqual([300, 300]);
    });


    it("fa-background-color - to set the surface's background color", function() {
      // Have to escape the third level of quotes for string literals
      var faSurface = common.compileFaSurface('fa-background-color="\'#97DED\'"');
      var surface = common.getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.backgroundColor).toEqual("#97DED");
    });

    it("fa-color - to set the surface's color", function() {
      var faSurface = common.compileFaSurface('fa-color="\'red\'"');
      var surface = common.getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.color).toEqual("red");
    });

    it("class - to pass classes to the surface div", function() {
      var faSurface = common.compileFaSurface('class="test-class"');
      var surface = common.getSurface(faSurface);
      expect(surface.classList).toEqual(["test-class"]);
    });

    describe("ng-class is fully supported on surfaces", function() {
      it("adds a single class", function() {
        var faSurface = common.compileFaSurface('ng-class="className"');
        var surface   = common.getSurface(faSurface);

        $scope.className = 'added-class';
        $scope.$apply();

        expect(surface.classList).toEqual(['added-class']);
      });

      it("removes a single class", function() {
        var faSurface = common.compileFaSurface('ng-class="className"');
        var surface   = common.getSurface(faSurface);

        $scope.className = 'added-class';
        $scope.$apply();

        expect(surface.classList).toEqual(['added-class']);

        $scope.className = '';
        $scope.$apply();

        expect(surface.classList).toEqual([]);
      });

      it("adds and removes classes in a single step", function() {
        var faSurface = common.compileFaSurface('ng-class="{class1: val1, class2: val2}"');
        var surface   = common.getSurface(faSurface);

        $scope.val1 = true;
        $scope.val2 = false;
        $scope.$apply();

        expect(surface.classList).toEqual(['class1']);

        $scope.val1 = false;
        $scope.val2 = true;
        $scope.$apply();

        expect(surface.classList).toEqual(['class2']);
      });

      it("is compatible with existing classes", function() {
        var faSurface = common.compileFaSurface('class="existing-class" ng-class="className"');
        var surface   = common.getSurface(faSurface);

        $scope.className = 'added-class';
        $scope.$apply();

        expect(surface.classList).toEqual(['existing-class', 'added-class']);
      });
    });
  });
});

