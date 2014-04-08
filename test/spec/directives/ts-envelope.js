'use strict';

describe('Directive: tsEnvelope', function () {

  // load the directive's module
  beforeEach(module('integrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ts-envelope></ts-envelope>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tsEnvelope directive');
  }));
});
