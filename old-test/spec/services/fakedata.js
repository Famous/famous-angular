'use strict';

describe('Service: Fakedata', function () {

  // load the service's module
  beforeEach(module('integrationApp'));

  // instantiate service
  var Fakedata;
  beforeEach(inject(function (_Fakedata_) {
    Fakedata = _Fakedata_;
  }));

  it('should do something', function () {
    expect(!!Fakedata).toBe(true);
  });

});
