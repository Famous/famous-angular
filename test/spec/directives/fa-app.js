'use strict';

describe('Directive: faApp', function () {

  // load the directive's module
  beforeEach(module('integrationApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fa-app></fa-app>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the faApp directive');
  }));
});
