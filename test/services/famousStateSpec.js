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

  describe('$famousState', function() {
    describe('$includes', function() {
      it('should check whether a state is registered', function() {
        $famousStateProvider.state({
          name: 'test',
          url: '/test',
          template: '<div></div>',
          inTransitionFrom: { a: 'a' },
          outTransitionTo: { a: 'a' }
        });
        expect($famousState.includes('test')).toBe(true);
        expect($famousState.includes('nonexistant')).toBe(false);
      });
    });

    describe('go', function() {
      beforeEach(function() {
        $famousStateProvider
        .state({
          name: 'test1',
          url: '/test1',
          template: '<div></div>',
          inTransitionFrom: { test2: 'test2' },
          outTransitionTo: { test2: 'test2' }
        })
        .state({
          name: 'test2',
          url: '/test2',
          template: '<div></div>',
          inTransitionFrom: { test1: 'test1' },
          outTransitionTo: { test1: 'test1' }
        });
      });

      it('should go to a new state', function() {
        $famousState.go('test1');
        expect($famousState.current).toBe('test1');
        $famousState.go('test2');
        expect($famousState.current).toBe('test2');
      });

      it('should stay on the same state when passed the current state\'s name', function() {
        $famousState.go('test1');
        expect($famousState.current).toBe('test1');
        $famousState.go('test1');
        expect($famousState.current).toBe('test1');
      });

      xit('should broadcast a $stateNotFound event when passed an invalid state name', function() {
        $famousState.go('test1');
        expect($famousState.current).toBe('test1');
        $famousState.go('somethingNonExistantOrInvalid');
        // TODO: some async listener
      });
    });
  });
});
