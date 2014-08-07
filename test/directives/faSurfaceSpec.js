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

    it("fa-properties - to accept a hash of css properties", function() {
      var faSurface = common.compileFaSurface('fa-properties="{color: \'red\', backgroundColor: \'blanchedalmond\'}"');
      var surface = common.getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.color).toEqual("red");
      expect(properties.backgroundColor).toEqual("blanchedalmond");
    });

    it("fa-properties plus explicit properties, handling overrides correctly", function() {
      var faSurface = common.compileFaSurface('fa-color="\'orange\'" fa-properties="{color: \'red\', backgroundColor: \'blanchedalmond\'}"');
      var surface = common.getSurface(faSurface);
      var properties = surface.getProperties();
      expect(properties.color).toEqual("orange");
      expect(properties.backgroundColor).toEqual("blanchedalmond");
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

      it("supports adding and removing multiple classes", function() {
        var faSurface = common.compileFaSurface('ng-class="{class1: class1, class2: class2, class3: class3}"');
        var surface   = common.getSurface(faSurface);

        $scope.class1 = true;
        $scope.class2 = true;
        $scope.class3 = true;
        $scope.$apply();

        expect(surface.classList).toEqual(['class1', 'class2', 'class3']);

        $scope.class1 = true;
        $scope.class2 = false;
        $scope.class3 = false;
        $scope.$apply();

        expect(surface.classList).toEqual(['class1']);

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

    it("passes direct class addition and removal from the element down to the Surface", function() {
      var faSurface = common.compileFaSurface();
      var surface   = common.getSurface(faSurface);

      faSurface.addClass('added-class');
      expect(surface.classList).toEqual(['added-class']);
    });

    it("delegates core $animate class juggling events to the Surface", function() {
      var Surface = $famous['famous/core/Surface'];
      var RenderNode = $famous['famous/core/RenderNode'];
      var faSurface = common.compileFaSurface('ng-hide="hideIt"');
      var scope = faSurface.scope();
      var isolate = faSurface.scope().isolate[scope.$id];

      $scope.hideIt = false;
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);

      $scope.hideIt = true;
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.emptyNode).toEqual(true);
    });
  });
  describe("hide and show", function() {

    it("hide and show properties on the Surface", function() {
      var faSurface = common.compileFaSurface();
      var scope = faSurface.scope();
      var isolate = faSurface.scope().isolate[scope.$id];
      
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

