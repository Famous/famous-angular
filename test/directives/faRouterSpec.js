'use strict';

describe('faRouter', function() {

  var common, $famous, $famousDecorator, $famousState, $compile, $controller, $parse, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$famous_, _$famousDecorator_, _$famousState_, _$compile_, _$controller_, _$parse_, _$rootScope_) {
    $famous          = _$famous_;
    $famousDecorator = _$famousDecorator_;
    $famousState     = _$famousState_;
    $compile         = _$compile_;
    $controller      = _$controller_;
    $parse           = _$parse_;

    $scope = _$rootScope_.$new();
    common = window.famousAngularCommon($scope, $compile);
  }));

  it('should be a stub', function() {
    var app = common.createApp('<fa-router></fa-router>');
    expect(app).not.toBeNull();
  });
});