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

    //getRenderNode = function(faModifier) {
      //var scope = faModifier.scope();
      //var modifier = scope.isolate[scope.$id].renderNode;
      //return modifier;
    //};
  }));


  it("should create an instance of Famo.us Modifier", function() {
      //var Modifier = $famous['famous/core/Modifier'];
      //var faModifier = compileFaModifier('fa-translate-x="300"');
      //var modifier = getModifier(faModifier);
      ////expect(typeof modifier).toBe('object');
      //expect(modifier instanceof Modifier).toBe(true);
  });

  iit("should create an instance of Famo.us Modifier", function() {
      var faModifier = compileFaModifier('fa-opacity="0.5"');
      var modifier = getModifier(faModifier);
      var args = $famous['famous/core/Modifier'].calls.count();
      console.log(args);
      //expect(args.opacity()).toEqual(0.5);
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
    it('fa-rotate - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-rotate-z="-0.785"');
      var modifier = getModifier(faModifier);
      //console.log(modifier);
      //expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-rotate-x - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-rotate-y - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-rotate-x - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
    });

    it('fa-scale - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300, 300]"');
      var modifier = getModifier(faModifier);
      expect(modifier.getSize()).toEqual([300, 300]);
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

    it('fa-opacity - to set the size of the modifier', function() {
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

    //it("fa-background-color - to set the modifier's background color", function() {
    //// Have to escape the third level of quotes for string literals
      //var faModifier = compileFaModifier('fa-background-color="\'#97DED\'"');
      //var modifier = getModifier(faModifier);
      //var properties = modifier.getProperties();
      //expect(properties.backgroundColor).toEqual("#97DED");
    //});

    //it("fa-color - to set the modifier's color", function() {
      //var faModifier = compileFaModifier('fa-color="\'red\'"');
      //var modifier = getModifier(faModifier);
      //var properties = modifier.getProperties();
      //expect(properties.color).toEqual("red");
    //});

    //it("class - to pass classes to the modifier div", function() {
      //var faModifier = compileFaModifier('class="test-class"');
      //var modifier = getModifier(faModifier);
      //expect(modifier.classList).toEqual(["test-class"]);
    //});
  });
});

