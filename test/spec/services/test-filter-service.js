'use strict';

describe('Service: testFilterService', function () {

  // load the service's module
  beforeEach(module('integrationApp'));

  // instantiate service
  var testFilterService;
  beforeEach(inject(function (_testFilterService_) {
    testFilterService = _testFilterService_;
  }));

  it('should do something', function () {
    expect(!!testFilterService).toBe(true);
  });

});
