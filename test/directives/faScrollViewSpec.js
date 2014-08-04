'use strict';

describe('faScrollView', function() {
  var eventHandler, common, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();

    common = window.famousAngularCommon($scope, $compile);
  }));

  it('should implement the Scrollview event pipeline', function() {
    var app = common.createApp(
      '<fa-scroll-view fa-pipe-from="eventHandler">' +
        '<fa-view>' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-scroll-view>'
    );

    $scope.eventHandler = eventHandler;
    $scope.$apply();

    var scrollView   = $famous.find('fa-scroll-view')[0].renderNode;
    var surface = $famous.find('fa-surface')[0].renderNode;

    // We are testing the widget event pipeline, not the rendering behavior of the widget.
    // Emitting a mock mousewheel event on the surface should affect the Scrollview's private _touchCount.
    expect(scrollView._touchCount).toBe(0);
    surface.eventHandler.emit('mousewheel', common.mockEvent({count: 1}));
    expect(scrollView._touchCount).toBe(1);

    common.destroyApp(app);
  });

  it('should work with ng-repeated views', function() {
    var app = common.createApp(
      '<fa-scroll-view fa-pipe-from="eventHandler">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-scroll-view>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];

    var scrollView = $famous.find('fa-scroll-view')[0].renderNode;

    // The watcher resolves view sequencing
    expect(scrollView._node).toBeNull();
    $scope.$apply();
    expect(scrollView._node.index).toBe(0);

    common.destroyApp(app);
  });

  it('should allow specification of a start index with fa-start-index', function() {
    var app = common.createApp(
      '<fa-scroll-view fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-scroll-view>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.$apply();

    var scrollView = $famous.find('fa-scroll-view')[0].renderNode;
    expect(scrollView._node.index).toBe(1);
    common.destroyApp(app);
  });

  it('should unregister children when their scopes are destroyed', function() {
    var app = common.createApp(
      '<fa-scroll-view fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-scroll-view>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1, 2];
    $scope.$apply();

    var scrollView = $famous.find('fa-scroll-view')[0].renderNode;

    expect(scrollView._node._.array.length).toBe(3);

    // Pop out the current index
    $scope.views.splice(1, 1);
    $scope.$apply();

    expect(scrollView._node._.array.length).toBe(2);

    common.destroyApp(app);
  });
   describe("hide and show", function() {

    it("hide and show properties on the ScrollView", function() {
      var scrollView = $compile(
          '<fa-scroll-view fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-scroll-view>'
        )($scope);
      $scope.eventHandler = eventHandler;
      $scope.views = [0, 1, 2];
      $scope.$apply();

      var scope = scrollView.scope();
      var isolate = scope.isolate[scope.$id];
      
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
