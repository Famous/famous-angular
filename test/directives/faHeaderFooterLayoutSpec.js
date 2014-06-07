'use strict';

describe('faHeaderFooterLayout', function() {
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


  it('should work with ng-repeated rendernodes', function() {
    var app = common.createApp(
      '<fa-header-footer-layout>' +
        '<fa-surface ng-repeat="view in views" fa-size="[undefined, 100]">{{view}}</fa-surface>' +
      '</fa-header-footer-layout>'
    );

    $scope.views = ["header", "content", "footer"];
    $scope.$apply();

    var headerFooterLayout = $famous.find('fa-header-footer-layout')[0].renderNode;

    expect(/.*header.*/.test(headerFooterLayout.header._child._object.content.innerHTML)).toBe(true);
    expect(/.*content.*/.test(headerFooterLayout.content._child._object.content.innerHTML)).toBe(true);
    expect(/.*footer.*/.test(headerFooterLayout.footer._child._object.content.innerHTML)).toBe(true);

    common.destroyApp(app);
  });

  it('should throw an exception if four children are added', function() {
    var app = common.createApp(
      '<fa-header-footer-layout>' +
        '<fa-surface ng-repeat="view in views" fa-size="[undefined, 100]">{{view}}</fa-surface>' +
      '</fa-header-footer-layout>'
    );

    $scope.views = ["header", "content", "footer", "invalid"];
    expect(function(){$scope.$apply();}).toThrow();

    common.destroyApp(app);
  });


  it('should unregister children when their scopes are destroyed', function() {
    //Not yet implemented in lib
    pending();

  });
});
