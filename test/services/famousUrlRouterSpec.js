'use strict';

describe('$famousUrlRouter', function() {
  var $famousUrlRouterProvider, $famousUrlRouter;
  var $famous, $compile, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(module(function(_$famousUrlRouterProvider_) {
    $famousUrlRouterProvider = _$famousUrlRouterProvider_;
  }));

  beforeEach(inject(function(_$famousUrlRouter_, _$famous_, _$compile_, _$rootScope_) {
    $famousUrlRouter = _$famousUrlRouter_;
    $famous = _$famous_;
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('$famousUrlRouterProvider', function() {
    describe('when', function() {
      // ...
    });

    describe('otherwise', function() {
      // ...
    });
  });
    
  describe('$famousUrlRouter', function() {
    describe('listen', function() {
      it('should return a listener on \'$locationChangeSuccess\'', function() {
        // ...
      });
    });

    describe('update', function() {
      it('should initiate a transition to the correstponding state', function() {
        // ...
      });
    });
  });
});