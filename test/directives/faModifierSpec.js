'use strict';

describe('$faModifier', function() {
  var element, $compile, $scope, $famous;
  var compileFaModifier, getModifier;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    spyOn($famous, 'famous/core/Modifier');

    compileFaModifier = function(attr) {
      return $compile('<fa-modifier ' + attr + '></fa-modifier>')($scope);
    };

    // faModifier must be an angular element so that .scope() can be called on it
    getModifier = function(faModifier) {
      var scope = faModifier.scope();
      var modifier = scope.isolate[scope.$id].modifier;
      return modifier;
    };
  }));


  it("should accept functions for the attribute values", function() {
    $scope.translateValue = function() {
      return 300;
    };
    var faModifier = compileFaModifier('fa-rotate-x="300"');
    var modifier = getModifier(faModifier);
    var args = $famous['famous/core/Modifier'].calls.mostRecent().args;
  });


  it("should create an instance of Famo.us Modifier", function() {
    var Modifier = $famous['famous/core/Modifier'];
    var faModifier = compileFaModifier('fa-translate-x="300"');
    var modifier = getModifier(faModifier);
    expect(modifier instanceof Modifier).toBe(true);
  });


  it("should set it's children as the content for the created modifier", function() {
    var modifierContent;
    $scope.$on('registerChild', function(event, isolate) {
      modifierContent = angular.element(isolate.renderNode.content)[0];
    });
    var faModifier = $compile('<fa-modifier><span></span></fa-modifier>')($scope);
    var children = faModifier[0].firstChild;
    expect(modifierContent).toEqual(children);
  });


  describe('should accept attribute', function() {

    it('fa-opacity - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-opacity="0.5"');
      var modifier = getModifier(faModifier);
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];
      expect(args.opacity()).toEqual(0.5);
    });


    it('fa-rotate - to set the size of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotate');

      var faModifier = compileFaModifier('fa-rotate="[0, 0.5, -0.5]"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotate).toHaveBeenCalledWith(0, 0.5, -0.5);
    });


    it('fa-rotate-x - to set the size of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotateX');

      var faModifier = compileFaModifier('fa-rotate-x="-0.785"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotateX).toHaveBeenCalledWith(-0.785);
    });

    it('fa-rotate-y - to set the size of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotateY');

      var faModifier = compileFaModifier('fa-rotate-y="-0.785"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotateY).toHaveBeenCalledWith(-0.785);
    });

    iit('fa-scale - to set the size of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'scale');

      var faModifier = compileFaModifier('fa-scale="[0, 0.5, 1]"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.scale).toHaveBeenCalledWith(0, 0.5, 1);
    });

    it('fa-skew - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-transform - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-size - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-origin - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });
  });
});

