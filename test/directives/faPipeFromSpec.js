'use strict';

describe('faPipeFrom', function() {
  var eventHandler, common, $compile, $scope, $rootScope, $famous;
  var listenerValue = false;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();

    common = window.famousAngularCommon($scope, $compile);
  }));

  it('should correctly pipe from an array of eventhandlers', function(){
    pending();
  });

  it('should correctly watch eventhandlers, updating piping when the eventhandlers change', function(){
    pending();
  });

  it('should correctly handle piping from modifiers (e.g. Draggable)', function(){
    pending();
  });

  it('should pipe events from a provided eventhandler to the specified target', function() {

    $scope.toEventHandler = eventHandler;

    // Inject a simple disconnected pipeline into the document body
    var pipeline = common.createApp(
      '<fa-view fa-pipe-from="fromEventHandler" id="pipe-from">' +
        '<fa-surface fa-pipe-to="toEventHandler" id="pipe-to"></fa-surface>' +
      '</fa-view>'
    );

    var toHandler   = $famous.find('#pipe-to')[0].renderNode.eventHandler;
    var fromHandler = $famous.find('#pipe-from')[0].renderNode._eventInput;

    // The view changes the listenerValue to true when it receives a testevent
    fromHandler.on('testevent', function() {
      listenerValue = true;
    });

    // The surface isn't piped up to the view
    toHandler.trigger('testevent');
    expect(listenerValue).toBe(false);

    $scope.fromEventHandler = eventHandler;
    $scope.$apply();

    // Now that we have a pipeline from the surface to the view,
    // the pipeline is connected
    toHandler.trigger('testevent');
    expect(listenerValue).toBe(true);

    // Cleanup
    common.destroyApp(pipeline);
  });
});
