'use strict';

describe('$famous', function() {
  var $famousProvider, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(module(function(_$famousProvider_) {
    $famousProvider = _$famousProvider_;
  }));

  beforeEach(inject(function(_$famous_) {
    $famous = _$famous_;
  }));

  describe('provider', function() {
    it('will register and store famous requirejs modules', function() {
    });
  });

});
