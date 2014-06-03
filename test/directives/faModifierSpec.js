'use strict';

ddescribe('$faModifier', function() {
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


  /********************************************************************
  
    Test Generation
    ---------------

    generateTests() should be called before the actual execution of Jasmine,
    in order for the it() blocks to be created and ran in time.

    These tests check which values the attribute will accept.  All attributes
    will be $parse'd.
  
  ********************************************************************/

    function generateTests(attr, method, acceptableValues, expectedOutput) {

      // All values need to be strings that can $parse'd by Angular
      var values = {
        numbers: expectedOutput + '',
        arrays: '[' + expectedOutput + ']',
        functions: 'fn',
        expressions: 'fn()',
        transitionables: 'transitionable'
      };

      // Generate tests.  Use closures to ensure that the current loop value
      // is passed to the it() block
      for (var valueType in values) {
        // If the valueType is one of the acceptableValues to test
        if (acceptableValues.indexOf(valueType) !== -1) {
          // Generate a new spec
          it(valueType, function(type) {
            return function() {
              var value = values[type];
              var faModifier = compileFaModifier(attr + '="' + value + '"');
              callGetTransform(faModifier);
              // Check the arguments that are passed to the Transform module
              var expectation = expect(TransformSpy[method]);
              // If the expectedOutput is an array, we must convert the array
              // into individual arguments to match the expected arguments
              if (expectedOutput instanceof Array) {
                expectation.toHaveBeenCalledWith.apply(expectation, expectedOutput);
              // if the expectedOutput is a number, just check that it matches
              } else if (typeof expectedOutput === 'number') {
                expectation.toHaveBeenCalledWith(expectedOutput);
              }
            };
          // Immediately invoke the function passing in the loop's current
          // var value
          }(valueType));
        }
      }
    };



  /********************************************************************
  
    Transform properties
  
  ********************************************************************/

  describe('should accept Transform attributes', function() {

    describe('fa-rotate should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0, 0.5, -0.5];
        };
        $scope.transitionable = {
          get: function() { return [0, 0.5, -0.5]; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate',
        // Transform method expected to be called
        'rotate',
        // Acceptable values
        ['arrays', 'functions', 'expressions'],
        // Expected output
        [0, 0.5, -0.5]
      );
    });

    describe('fa-rotate-x should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return 0.5;
        };
        $scope.transitionable = {
          get: function() { return 0.5; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-x',
        // Transform method expected to be called
        'rotateX',
        // Acceptable values
        ['numbers', 'functions', 'expressions'],
        // Expected output
        0.5
      );
    });

    describe('fa-rotate-y should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return 0.5;
        };
        $scope.transitionable = {
          get: function() { return 0.5; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-y',
        // Transform method expected to be called
        'rotateY',
        // Acceptable values
        ['numbers', 'functions', 'expressions'],
        // Expected output
        0.5
      );
    });

    describe('fa-rotate-z should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return -0.785;
        };
        $scope.transitionable = {
          get: function() { return -0.785; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-z',
        // Transform method expected to be called
        'rotateZ',
        // Acceptable values
        ['numbers', 'functions', 'expressions'],
        // Expected output
        -0.785 
      );
    });

    describe('fa-scale should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0, 0.5, 1];
        };
        $scope.transitionable = {
          get: function() { return [0, 0.5, 1]; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-z',
        // Transform method expected to be called
        'rotateZ',
        // Acceptable values
        ['arrays', 'functions', 'expressions'],
        // Expected output
        [0, 0.5, 1] 
      );
    });

    describe('fa-skew should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return -0.2;
        };
        $scope.transitionable = {
          get: function() { return -0.2; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-z',
        // Transform method expected to be called
        'rotateZ',
        // Acceptable values
        ['arrays', 'functions', 'expressions'],
        // Expected output
        -0.2
      );
    });

    describe('fa-transform should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0, 1, 0, 1];
        };
        $scope.transitionable = {
          get: function() { return [0, 1, 0, 1]; }
        }
      });
      generateTests(
        // Attribute
        'fa-rotate-z',
        // Transform method expected to be called
        'rotateZ',
        // Acceptable values
        ['arrays', 'functions', 'expressions'],
        // Expected output
        [0, 1, 0, 1] 
      );


      it('directly set the transform matrix', function() {
        $scope.matrix = [0, 1, 2, 3];
        var faModifier = compileFaModifier('fa-transform="matrix"');
        var args = ModifierSpy.calls.mostRecent().args[0];
        expect(args.transform()).toEqual($scope.matrix);
      });

      it('override any existing transform attributes', function() {
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


  /********************************************************************
  
    General modifier properties
  
  ********************************************************************/

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


});

