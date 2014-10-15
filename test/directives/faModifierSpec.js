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


  // Can't seem to get the $scope's isolate.  Disable for now
  xit("should listen to 'registerChild' events from nested fa- directives, and add their data to fa-modifier's renderNode", function() {
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
  
    Transform attributes
  
  ********************************************************************/

  describe('should accept Transform attributes', function() {

    // generateTransformTests() should be called before the actual execution of
    // Jasmine, in order for the it() blocks to be created and ran in time.
    //
    // Ensure that the Famo.us Transform methods are called with the arguments
    // we expect.
    function generateTransformTests(attr, method, acceptableValues, expectedOutput) {

      // All values need to be strings that can $parse'd by Angular
      var values = {
        numbers: expectedOutput + '',
        arrays: '[' + expectedOutput + ']',
        functions: 'fn',
        expressions: 'fn()',
        transitionables: 'transitionable'
      };

      for (var valueType in values) {
        // If the valueType is one of the acceptableValues to test
        if (acceptableValues.indexOf(valueType) !== -1) {
          // Generate new spec.  Use closure to ensure that the current loop value
          // is passed to the it() block
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
          }(valueType));
        }
      }
    };

    describe('fa-rotate should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0, 0.5, -0.5];
        };
        $scope.transitionable = {
          get: function() { return [0, 0.5, -0.5]; }
        }
      });
      generateTransformTests(
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
      generateTransformTests(
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
      generateTransformTests(
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
      generateTransformTests(
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
      generateTransformTests(
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
      generateTransformTests(
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
      generateTransformTests(
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

  });


  /********************************************************************
  
    General modifier attributes
  
  ********************************************************************/

  describe('should accept main Modifier attributes', function() {

    // Generate tests that ensure that the Modifier constructor is called with
    // the arguments we expect.
    function generateModifierTests(attr, method, acceptableValues, expectedOutput) {

      // All values need to be strings that can $parse'd by Angular
      var values = {
        numbers: expectedOutput + '',
        arrays: '[' + expectedOutput + ']',
        functions: 'fn',
        expressions: 'fn()',
        transitionables: 'transitionable'
      };

      for (var valueType in values) {
        // If the valueType is one of the acceptableValues to test
        if (acceptableValues.indexOf(valueType) !== -1) {
          // Generate specs.  Use closure to ensure that the current loop value
          // is passed to the it() block
          it(valueType, function(type) {
            return function() {
              var value = values[type];
              var faModifier = compileFaModifier(attr + '="' + value + '"');
              var args = ModifierSpy.calls.mostRecent().args[0];
              expect(args[method]()).toEqual(expectedOutput);
            };
          }(valueType));
        }
      }
    };
  

    describe('fa-size should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [300, 200];
        };
        $scope.transitionable = {
          get: function() { return [300, 200]; }
        }
      });
      generateModifierTests(
        // Attribute
        'fa-size',
        // Modifier method expected to be called
        'size',
        // Acceptable values
        ['arrays', 'functions', 'expressions', 'transitionables'],
        // Expected output
        [300, 200]
      );
    });


    describe('fa-proportions should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [.25, .75];
        };
        $scope.transitionable = {
          get: function() { return [.25, .75]; }
        }
      });
      generateModifierTests(
        // Attribute
        'fa-proportions',
        // Modifier method expected to be called
        'proportions',
        // Acceptable values
        ['arrays', 'functions', 'expressions', 'transitionables'],
        // Expected output
        [.25, .75]
      );
    });


    describe('fa-opacity should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [300, 200];
        };
        $scope.transitionable = {
          get: function() { return [300, 200]; }
        }
      });
      generateModifierTests(
        // Attribute
        'fa-opacity',
        // Modifier method expected to be called
        'opacity',
        // Acceptable values
        ['arrays', 'functions', 'expressions', 'transitionables'],
        // Expected output
        [300, 200]
      );
    });


    describe('fa-origin should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0.5, 0.3];
        };
        $scope.transitionable = {
          get: function() { return [0.5, 0.3]; }
        }
      });
      generateModifierTests(
        // Attribute
        'fa-origin',
        // Modifier method expected to be called
        'origin',
        // Acceptable values
        ['arrays', 'functions', 'expressions', 'transitionables'],
        // Expected output
        [0.5, 0.3]
      );
    });


    describe('fa-align should accept', function() {
      beforeEach(function() {
        $scope.fn = function() {
          return [0.5, 0.5];
        };
        $scope.transitionable = {
          get: function() { return [0.5, 0.5]; }
        }
      });
      generateModifierTests(
        // Attribute
        'fa-align',
        // Modifier method expected to be called
        'align',
        // Acceptable values
        ['arrays', 'functions', 'expressions', 'transitionables'],
        // Expected output
        [0.5, 0.5]
      );
    });

  });

});
