'use strict';

ddescribe('$faModifier', function() {
  var element, $compile, $scope, $famous;
  var TransformSpy;
  var compileFaModifier, getModifier, getIsolate, callGetTransform;

  // Set up spies to replace the famo.us Transform module, so we can ensure
  // that the right args are being passed to the Transform functions
  beforeEach(module('famous.angular', function($provide, _$famousProvider_) {
    // Set mockFamous as an instance of default $famous service
    var mockFamous = _$famousProvider_.$get();
    TransformSpy = jasmine.createSpyObj('TransformSpy', [
      "aboutOrigin",
      "perspective",
      "rotate",
      "rotateAxis",
      "rotateX",
      "rotateY",
      "rotateZ",
      "scale",
      "skew",
      "translate"
    ]);
    // Replace the Transform module with a spy
    mockFamous['famous/core/Transform'] = TransformSpy;
    $provide.value('$famous', mockFamous);
  }));

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


  ddescribe("should accept attributes of", function() {
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
        _state: 3,
        get: function() { return this._state; }
      };
      spyOn(mockTransitionable, 'get');
      $scope.mockTransitionable = mockTransitionable;
      var faModifier = compileFaModifier('fa-transform="mockTransitionable"');
      callGetTransform(faModifier);

      // The transitionable's get should be called when calling getTransform()
      expect(mockTransitionable.get).toHaveBeenCalled();
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


  xdescribe('should accept attribute', function() {

    it('fa-opacity - to set the opacity of the modifier', function() {
      var faModifier = compileFaModifier('fa-opacity="0.5"');
      var modifier = getModifier(faModifier);
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];
      expect(args.opacity()).toEqual(0.5);
    });


    it('fa-rotate - to set the [X, Y, Z] rotate of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotate');

      var faModifier = compileFaModifier('fa-rotate="[0, 0.5, -0.5]"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotate).toHaveBeenCalledWith(0, 0.5, -0.5);
    });


    it('fa-rotate-x - to set the rotate X of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotateX');

      var faModifier = compileFaModifier('fa-rotate-x="-0.785"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotateX).toHaveBeenCalledWith(-0.785);
    });

    it('fa-rotate-y - to set the rotate Y of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'rotateY');

      var faModifier = compileFaModifier('fa-rotate-y="-0.785"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.rotateY).toHaveBeenCalledWith(-0.785);
    });

    it('fa-scale - to set the scale of the modifier', function() {
      var Transform = $famous['famous/core/Transform'];
      spyOn(Transform, 'scale');

      var faModifier = compileFaModifier('fa-scale="[0, 0.5, 1]"');
      var args = $famous['famous/core/Modifier'].calls.mostRecent().args[0];

      // Modifier.transform() is not called until the render loop, so execute
      // it directly
      args.transform();

      expect(Transform.scale).toHaveBeenCalledWith(0, 0.5, 1);
    });

    it('fa-skew - to set the skew of the modifier', function() {
    });

    it('fa-transform - to set the transform of the modifier', function() {
    });

    it('fa-size - to set the size of the modifier', function() {
    });

    it('fa-origin - to set the origin of the modifier', function() {
    });
  });
});

