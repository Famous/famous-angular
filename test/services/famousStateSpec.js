'use strict';

describe('$famousState', function() {
  var $famousStateProvider, $famousState;
  var $famous, $compile, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(module(function(_$famousStateProvider_) {
    $famousStateProvider = _$famousStateProvider_;
  }));

  beforeEach(inject(function(_$famousState_, _$famous_, _$compile_, _$rootScope_) {
    $famousState = _$famousState_;
    $famous = _$famous_;
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('$famousStateProvider', function() {
    describe('state', function() {
      it('should add a state via state(name, definition)', function() {
        $famousStateProvider.state('stateName', {});
        expect($famousState.includes('stateName')).toBe(true);
        // expect($famousState.includes('stateName')).toBe(false);
      });

      it('should add a state via state(definition)', function() {
        $famousStateProvider.state({name: 'stateName'});
        expect($famousState.includes('stateName')).toBe(true);
      });
    });

    describe('defineState', function() {
      it('should throw an error given a name that is undefined', function() {
        expect(function() {
          $famousStateProvider.state({ /* name is not defined */ });
        }).toThrow();
      });

      it('should throw an error given a name that is not a string', function() {
        expect(function() {
          $famousStateProvider.state({ name: 12345 });
        }).toThrow();
      });

      it('should throw an error given a name that starts with an @ symbol', function() {
        expect(function() {
          $famousStateProvider.state({ name: '@somethingInvalid' });
        }).toThrow();
      });

      it('should throw an error given a name that is already defined', function() {
        $famousStateProvider.state({ name: 'something' });
        expect(function() {
          $famousStateProvider.state({ name: 'something' });
        }).toThrow();
      });
    });

    describe('buildState', function() {
      it('should throw an error given a url that is undefined', function() {
        expect(function() {
          $famousStateProvider.state({
            name: 'test',
            url: 12345
          });
        }).toThrow();
      });

      it('should throw an error given template that ends in something besides \'.html\'', function() {
        expect(function() {
          $famousStateProvider.state({
            name: 'test',
            url: '/test',
            templateUrl: 'doesntHaveExtension'
          });
        }).toThrow();
      });

      // TODO: implement test
      it('should throw an error given template that does not contain valid HTML', function() {
        expect(function() {
          $famousStateProvider.state({
            name: 'test',
            url: '/test',
            templateUrl: 'test.html'
          });
        }).toThrow();
      });
    });

    describe('queueState', function() {}); // deferred until childviews are implemented

    describe('updateQueue', function() {}); // deferred until childviews are implemented
  });
});
