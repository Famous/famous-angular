'use strict';

describe('Directive: faController', function () {

  // load the directive's module
  beforeEach(module('integrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fa-controller></fa-controller>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faController directive');
  }));
});
