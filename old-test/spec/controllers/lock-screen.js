'use strict';

describe('Controller: LockScreenCtrl', function () {

  // load the controller's module
  beforeEach(module('integrationApp'));

  var LockScreenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LockScreenCtrl = $controller('LockScreenCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
