'use strict';

describe('$famous', function() {
  var $compile, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$famous_, _$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

});
