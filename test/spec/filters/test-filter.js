'use strict';

describe('Filter: testFilter', function () {

  // load the filter's module
  beforeEach(module('integrationApp'));

  // initialize a new instance of the filter before each test
  var testFilter;
  beforeEach(inject(function ($filter) {
    testFilter = $filter('testFilter');
  }));

  it('should return the input prefixed with "testFilter filter:"', function () {
    var text = 'angularjs';
    expect(testFilter(text)).toBe('testFilter filter: ' + text);
  });

});
