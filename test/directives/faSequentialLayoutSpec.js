'use strict';

describe('faSequentialLayout', function() {
  var eventHandler, common, $compile, $timeout, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$timeout_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $timeout = _$timeout_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();

    common = window.famousAngularCommon($scope, $compile);
  }));


  it('should work with ng-repeated views', function() {
    var app = common.createApp(
      '<fa-sequential-layout fa-pipe-from="eventHandler">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-sequential-layout>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.$apply();

    var sequentialLayout = $famous.find('fa-sequential-layout')[0].renderNode;

    expect(sequentialLayout._items).not.toBeNull();

    common.destroyApp(app);
  });

  it('should allow specification of a start index with fa-start-index', function() {
    //not yet implemented in lib
    pending();

    var app = common.createApp(
      '<fa-sequential-layout fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-sequential-layout>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.$apply();

    var sequentialLayout = $famous.find('fa-sequential-layout')[0].renderNode;
    expect(sequentialLayout._items.getIndex()).toBe(1);
    common.destroyApp(app);
  });

  it('should unregister children when their scopes are destroyed', function() {
    var app = common.createApp(
      '<fa-sequential-layout fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-sequential-layout>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1, 2];
    $scope.$apply();


    var sequentialLayout = $famous.find('fa-sequential-layout')[0].renderNode;

    expect(sequentialLayout._items._.array.length).toBe(3);

    // Pop out the current index
    $scope.views.splice(1, 1);
    $scope.$apply();

    expect(sequentialLayout._items._.array.length).toBe(2);

    common.destroyApp(app);
  });
});
