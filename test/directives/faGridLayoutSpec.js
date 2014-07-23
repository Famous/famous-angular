'use strict';

describe('faGridLayout', function() {
  var eventHandler, common, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();

    //HACK GridLayout to expose its enclosed "sequence" member
    $famous['famous/views/GridLayout'].prototype.getSequence = function(){
      return this.sequence || new $famous['famous/core/ViewSequence']();
    };

    common = window.famousAngularCommon($scope, $compile);
  }));


  it('should work with ng-repeated views', function() {
    var app = common.createApp(
      '<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-grid-layout>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.gridOptions = {dimensions: [2, 2]};

    var gridLayout = $famous.find('fa-grid-layout')[0].renderNode;

    // The watcher resolves view sequencing
    expect(gridLayout.getSequence.call(gridLayout)._.array.length).toBe(0);
    $scope.$apply();
    expect(gridLayout.getSequence.call(gridLayout)._.array.length).toBe(2);

    common.destroyApp(app);
  });

  it('should accept dimensions through fa-options', function(){
    pending();
  });

  it('should update dimensions through fa-options when fa-options changes', function(){
    pending();
  });

  it('should unregister children when their scopes are destroyed', function() {
    var app = common.createApp(
      '<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-grid-layout>'
    );


    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1, 2];
    $scope.gridOptions = {dimensions: [2, 2]};
    $scope.$apply();

    var gridLayout = $famous.find('fa-grid-layout')[0].renderNode;

    expect(gridLayout.getSequence.call(gridLayout)._.array.length).toBe(3);

    // Pop out the current index
    $scope.views.splice(1, 1);
    $scope.$apply();

    expect(gridLayout.getSequence.call(gridLayout)._.array.length).toBe(2);

    common.destroyApp(app);
  });
});
