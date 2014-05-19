'use strict';

describe('Controller: FaTimbreCtrl', function () {

  // load the controller's module
  beforeEach(module('integrationApp'));

  var FaTimbreCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FaTimbreCtrl = $controller('FaTimbreCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
