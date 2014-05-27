'use strict';

describe('$faModifier', function() {
  var element, $compile, $scope, $famous;
  var TransformSpy, ModifierSpy;
  var compileFaModifier, getModifier, getIsolate, callGetTransform;

  // Set up spies to replace the famo.us Transform module, so we can ensure
  // that the right args are being passed to the Transform functions
  beforeEach(module('famous.angular', function($provide, _$famousProvider_) {
    // Set mockFamous as an instance of default $famous service
    var mockFamous = _$famousProvider_.$get();
    var methods = [
      'aboutOrigin',
      'perspective',
      'rotate',
      'rotateAxis',
      'rotateX',
      'rotateY',
      'rotateZ',
      'scale',
      'skew',
      'translate',
      'multiply'
    ];

    TransformSpy = mockFamous['famous/core/Transform'];

    // Spy on all the methods of Transform
    for (var i = 0; i < methods.length; i++) {
      spyOn(TransformSpy, methods[i]).and.callThrough();
    }

    ModifierSpy = jasmine.createSpy('Modifier');
    mockFamous['famous/core/Modifier'] = ModifierSpy;

    $provide.value('$famous', mockFamous);
  }));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    compileFaModifier = function(attr) {
      return $compile('<fa-modifier ' + attr + '></fa-modifier>')($scope);
    };

    // faModifier must be an angular element so that .scope() can be called on it
    getModifier = function(faModifier) {
      var scope = faModifier.scope();
      var modifier = scope.isolate[scope.$id].modifier;
      return modifier;
    };

    getIsolate = function(faModifier) {
      var scope = faModifier.scope();
      return scope.isolate[scope.$id];
    };

    // getTransform is usually only called in the render loop, but invoke it
    // so that the Transform object calls its functions like rotateX, translate
    callGetTransform = function(faModifier) {
      var scope = faModifier.scope();
      var isolate = scope.isolate[scope.$id];
      isolate.getTransform();
    };
  }));



  it("should create an instance of Famo.us Modifier", function() {
    var Modifier = $famous['famous/core/Modifier'];
    var faModifier = compileFaModifier('fa-translate-x="300"');
    var modifier = getModifier(faModifier);
    expect(modifier instanceof Modifier).toBe(true);
  });


  describe("should accept attributes of", function() {
    it("numbers", function() {
      var faModifier = compileFaModifier('fa-rotate-x="0.5"');
      callGetTransform(faModifier);
      expect(TransformSpy['rotateX']).toHaveBeenCalledWith(0.5);
    });

    it("function references", function() {
      $scope.getRotateX = function() { return 0.5; };
      var faModifier = compileFaModifier('fa-rotate-x="getRotateX"');
      callGetTransform(faModifier);
      expect(TransformSpy['rotateX']).toHaveBeenCalledWith(0.5);
    });

    it("expressions", function() {
      $scope.getRotateX = function() { return 0.5; };
      var faModifier = compileFaModifier('fa-rotate-x="getRotateX() + 0.25"');
      callGetTransform(faModifier);
      expect(TransformSpy['rotateX']).toHaveBeenCalledWith(0.75);
    });

    it("arrays with expressions inside", function() {
      $scope.getRotateX = function() { return 0.5; };
      var faModifier = compileFaModifier('fa-rotate="[getRotateX() + 0.25, 0.5, 1]"');
      callGetTransform(faModifier);
      expect(TransformSpy['rotate']).toHaveBeenCalledWith(0.75, 0.5, 1);

    });

    it("transitionable objects", function() {
      var mockTransitionable = {
        _state: [0, 0, 1, 1],
        get: function() { return this._state; }
      };
      spyOn(mockTransitionable, 'get');
      $scope.mockTransitionable = mockTransitionable;
      var faModifier = compileFaModifier('fa-transform="mockTransitionable"');
      callGetTransform(faModifier);

      // The transitionable's get should be called when calling getTransform()
      expect(mockTransitionable.get).toHaveBeenCalled();
    });


    // Currently Transform attributes do not support transitionables
    it("transitionable objects for Transform attributes", function() {
      var mockTransitionable = {
        _state: [30, 20, 1],
        get: function() { return this._state; }
      };
      spyOn(mockTransitionable, 'get');
      $scope.mockTransitionable = mockTransitionable;
      var faModifier = compileFaModifier('fa-translate="mockTransitionable"');
      callGetTransform(faModifier);

      // The transitionable's get should be called when calling getTransform()
      expect(mockTransitionable.get).toHaveBeenCalled();
    });

  });


  ddescribe('should accept Transform attributes', function() {

    describe('fa-rotate should accept', function() {

      var acceptableValues = {
        arrays: '[0, 0.5, -0.5]',
        functions: 'fn',
        expressions: 'fn()',
        transitionables: 'transitionable'
      };

      beforeEach(function() {
        $scope.fn = function() {
          return [0, 0.5, -0.5];
        };
        $scope.transitionable = {
          get: function() { return [0, 0.5, -0.5]; }
        }
      });

      for (var type in acceptableValues) {
        it(type, function(types) {
          return function() {
            var value = acceptableValues[types];
            var faModifier = compileFaModifier('fa-rotate="' + value + '"');
            //console.log(types, value);
            //console.log(faModifier);
            callGetTransform(faModifier);
            expect(TransformSpy.rotate).toHaveBeenCalledWith(0, 0.5, -0.5);
          };
        }(type));
      }

    });

    it('fa-rotate-x - to set the rotate X of the modifier', function() {
      var faModifier = compileFaModifier('fa-rotate-x="-0.785"');
      callGetTransform(faModifier);
      expect(TransformSpy.rotateX).toHaveBeenCalledWith(-0.785);
    });

    it('fa-rotate-y - to set the rotate Y of the modifier', function() {
      var faModifier = compileFaModifier('fa-rotate-y="-0.785"');
      callGetTransform(faModifier);
      expect(TransformSpy.rotateY).toHaveBeenCalledWith(-0.785);
    });

    it('fa-rotate-z - to set the rotate Y of the modifier', function() {
      var faModifier = compileFaModifier('fa-rotate-z="-0.785"');
      callGetTransform(faModifier);
      expect(TransformSpy.rotateZ).toHaveBeenCalledWith(-0.785);
    });

    it('fa-scale - to set the scale of the modifier', function() {
      var faModifier = compileFaModifier('fa-scale="[0, 0.5, 1]"');
      callGetTransform(faModifier);
      expect(TransformSpy.scale).toHaveBeenCalledWith(0, 0.5, 1);
    });

    it('fa-skew - to set the skew of the modifier', function() {
      var faModifier = compileFaModifier('fa-skew="-0.2"');
      callGetTransform(faModifier);
      expect(TransformSpy.skew).toHaveBeenCalledWith(-0.2);
    });

    describe('fa-transform', function() {
      it('to directly set the transform matrix', function() {
        $scope.matrix = [0, 1, 2, 3];
        var faModifier = compileFaModifier('fa-transform="matrix"');
        var args = ModifierSpy.calls.mostRecent().args[0];
        expect(args.transform()).toEqual($scope.matrix);
      });

      it('to override any existing transform attributes', function() {
        $scope.matrix = [0, 1, 2, 3];
        // Add additional transform attribute that should be ignored
        var faModifier = compileFaModifier('fa-transform="matrix" fa-rotate="[0.5, 0.25, 0]"');
        var args = ModifierSpy.calls.mostRecent().args[0];
        expect(args.transform()).toEqual($scope.matrix);
      });
    });

    describe('fa-transform-order', function() {

      it('to control the transformation order', function() {
        $scope.order = ['translate', 'rotateZ'];
        var faModifier = compileFaModifier('fa-transform-order="order" fa-rotate-z="0.5" fa-translate="[30, 50, 1]"');
        var args = ModifierSpy.calls.mostRecent().args[0];
        var transformResult = TransformSpy['translate'].apply(this, [30, 50, 1]);
        args.transform();

        var firstArgument = TransformSpy.multiply.calls.first().args[0];
        expect(firstArgument).toEqual(transformResult);
      });
    });

      it('if missing, will result in the transforms being in alphabetical order', function() {
        $scope.order = ['translate', 'rotateZ'];
        var faModifier = compileFaModifier('fa-rotate-z="0.5" fa-translate="[30, 50, 1]"');
        var args = ModifierSpy.calls.mostRecent().args[0];
        var transformResult = TransformSpy['translate'].apply(this, [30, 50, 1]);
        args.transform();

        var firstArgument = TransformSpy.multiply.calls.first().args[0];
        expect(firstArgument).not.toEqual(transformResult);
      });

  });

  describe('should accept main Modifier attributes', function() {
  
    it('fa-opacity - to set the opacity of the modifier', function() {
      var faModifier = compileFaModifier('fa-opacity="0.5"');
      var args = ModifierSpy.calls.mostRecent().args[0];
      expect(args.opacity()).toEqual(0.5);
    });

    it('fa-size - to set the size of the modifier', function() {
      var faModifier = compileFaModifier('fa-size="[300,200]"');
      var args = ModifierSpy.calls.mostRecent().args[0];
      expect(args.size()).toEqual([300, 200]);
    });

    it('fa-origin - to set the origin of the modifier', function() {
      var faModifier = compileFaModifier('fa-origin="[0.5,0.5]"');
      var args = ModifierSpy.calls.mostRecent().args[0];
      expect(args.origin()).toEqual([0.5, 0.5]);
    });

    it('fa-align - to set the align of the modifier', function() {
      var faModifier = compileFaModifier('fa-align="[0.5,0.5]"');
      var args = ModifierSpy.calls.mostRecent().args[0];
      expect(args.align()).toEqual([0.5, 0.5]);
    });

  });


  it("should listen to 'registerChild' events from nested fa- directives, and add their data to fa-modifier's renderNode", function() {
    var RenderNode = $famous['famous/core/RenderNode'];
    var isolate;
    var modifierContent;
    $scope.$on('registerChild', function(event, data) {
      isolate = data;
    });
    var faModifier = $compile('<fa-modifier><fa-surface></fa-surface></fa-modifier>')($scope);
    //var children = faModifier[0].firstChild;
    expect(isolate.renderNode instanceof RenderNode).toBe(true);
  });

});

