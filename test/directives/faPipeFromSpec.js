'use strict';

describe('faPipeFrom', function() {
  var common, element, $compile, $scope, $rootScope, $famous;
  var listenerValue     = false;
  var eventHandler      = null;
  var otherEventHandler = null;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();
    eventHandler.on('start', function() { listenerValue = 'started'; });

    otherEventHandler = new $famous['famous/core/EventHandler']();
    otherEventHandler.on('end', function() { listenerValue = 'ended'; });
    otherEventHandler.on('update', function() { listenerValue = 'updated'; });

    eventHandler.pipe(otherEventHandler);

    common = window.famousAngularCommon($scope, $compile);
  }));

  it('should not fail or update on an undefined event listener', function() {
    var faSurface = common.compileFaSurface('fa-pipe-from="foobar"');
    expect(listenerValue).toBe(false);
  });

  it('should undo the work of fa-pipe-to', function() {
    var faSurface = common.compileFaSurface('fa-pipe-to="eventHandler" fa-pipe-from="otherEventHandler"');
    var surface   = common.getSurface(faSurface);
    var scope     = faSurface.scope();
    scope.eventHandler = scope.otherEventHandler = eventHandler;
    scope.$apply();

    // Current pipeline: surface.eventHandler => eventHandler => otherEventHandler...
    // ...otherEventHandler events are emitted upward via eventHandler
    surface.eventHandler.trigger('end');
    expect(listenerValue).toBe('ended');

    // eventHandler's are emitted directly
    surface.eventHandler.trigger('start');
    expect(listenerValue).toBe('started');

    // Change the binding for fa-pipe-from to otherEventHandler
    scope.otherEventHandler = otherEventHandler;
    scope.$apply();

    // Current pipeline: surface.eventHandler => otherEventHandler...
    // otherEventHandler events are now emitted directly
    surface.eventHandler.trigger('end');
    expect(listenerValue).toBe('ended');

    // eventHandler is no longer in the pipeline, so its events are no longer emitted upward...
    surface.eventHandler.trigger('start');
    expect(listenerValue).toBe('ended');

    // ...even though the original event pipeline is intact
    eventHandler.trigger('update');
    expect(listenerValue).toBe('updated');
  });
 });
