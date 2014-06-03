'use strict';

describe('faPipeTo', function() {
  var common, element, $compile, $scope, $famous;
  var listenerValue = false;
  var eventHandler  = null;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();
    eventHandler.on('start', function() { listenerValue = 'started'; });
    eventHandler.on('update', function() { listenerValue = 'updated'; });
    eventHandler.on('end', function() { listenerValue = 'ended'; });

    common = window.famousAngularCommon($scope, $compile);
  }));

  it('should not fail or update on an undefined eventhandler', function() {
    var faSurface = common.compileFaSurface('fa-pipe-to="foobar"');
    expect(listenerValue).toBe(false);
  });

  it('should correctly pipe to an array of target eventhandlers', function(){
    pending();
  });

  it('should correctly watch eventhandlers, updating piping when the eventhandlers change', function(){
    pending();
  });

  it('should trigger events on a defined event listener', function() {
    var faSurface = common.compileFaSurface('fa-pipe-to="eventHandler"');
    var surface   = common.getSurface(faSurface);
    faSurface.scope().eventHandler = eventHandler;
    faSurface.scope().$apply();

    surface.eventHandler.trigger('start');
    expect(listenerValue).toBe('started');

    surface.eventHandler.trigger('update');
    expect(listenerValue).toBe('updated');

    surface.eventHandler.trigger('end');
    expect(listenerValue).toBe('ended');
  });
 });
