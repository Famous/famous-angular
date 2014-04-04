'use strict';

describe('Directive: faAnimation', function () {

  // load the directive's module
  beforeEach(module('integrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fa-animation></fa-animation>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faAnimation directive');
  }));
});
