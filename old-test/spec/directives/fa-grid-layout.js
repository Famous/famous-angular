'use strict';

describe('Directive: faGridView', function () {

  // load the directive's module
  beforeEach(module('integrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fa-grid-view></fa-grid-view>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faGridView directive');
  }));
});
