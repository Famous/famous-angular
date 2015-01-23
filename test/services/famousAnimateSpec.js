'use strict';

describe('$animate', function() {
  var common, element, transition, $compile, $scope, $famous;
  var duration = 10;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    transition = new $famous['famous/transitions/Transitionable']([0]);

    function doneOrDuration(done) {
      if (typeof done === 'function') {
        done();
      } else {
        return duration;
      }
    }

    $scope.enter = function(done) {
      transition.set([10], {duration: duration});
      return doneOrDuration(done);
    };

    $scope.leave = function(done) {
      transition.set([0], {duration: duration});
      return doneOrDuration(done);
    };

    $scope.move = function(done) {
      transition.set([5], {duration: duration});
      return doneOrDuration(done);
    };

    $scope.halt = function() {
      transition.halt();
    };

    common = window.famousAngularCommon($scope, $compile);
  }));

  describe('should support the complete Angular animation pipeline with attributes', function() {
    it('uses fa-animate-enter to specify enter events', function(done) {
      var app = common.createApp(
        '<fa-modifier ng-repeat="item in items" fa-animate-enter="enter()"></fa-modifier>'
      );

      $scope.items = [1];
      $scope.$apply();

      setTimeout(function() {
        expect(transition.get()[0]).toBe(10);
        done();
      }, duration);
    });

    it('uses fa-animate-leave to specify leave events', function(done) {
      var app = common.createApp(
        '<fa-surface ng-repeat="item in items" fa-animate-leave="leave($done)"></fa-surface>'
      );

      $scope.items = [1];
      $scope.$apply();
      transition.set([10]);

      expect(transition.get()[0]).toBe(10);
      expect(angular.element(app).find('fa-surface').length).toBe(1);

      $scope.items = [];
      $scope.$apply();

      setTimeout(function() {
        expect(transition.get()[0]).toBe(0);
        expect(angular.element(app).find('fa-surface').length).toBe(0);
        done();
      }, duration);
    });

    it('uses fa-animate-move to specify move events', function(done) {
      var app = common.createApp(
        '<fa-modifier ng-repeat="item in items" fa-animate-move="move()"></fa-modifier>'
      );

      $scope.items = [1, 2];
      $scope.$apply();

      expect(transition.get()[0]).toBe(0);

      $scope.items = [2, 1];
      $scope.$apply();

      setTimeout(function() {
        expect(transition.get()[0]).toBe(5);
        done();
      }, duration);
    });

    it('uses fa-animate-halt to halt active animations', function(done) {
      var app = common.createApp(
        '<fa-modifier ng-repeat="item in items" fa-animate-enter="enter()" fa-animate-halt="halt()"></fa-modifier>'
      );

      $scope.items = [1];
      $scope.$apply();

      setTimeout(function() {
        expect(transition.isActive()).toBe(true);
        $scope.items = [];
        $scope.$apply();
        expect(transition.isActive()).toBe(false);
        done();
      }, duration / 2);

    });

    it('supports referencing the parent isolate for animation handlers in the case where a scope is already destroyed, specifically to handle cases like ng-include and ui-view', function(){
      pending();
    })
  });
});
