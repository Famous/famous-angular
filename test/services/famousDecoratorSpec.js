'use strict';

describe('$famousDecorator', function() {
  var $famousDecorator;
  var $compile, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$famousDecorator_, _$compile_, _$rootScope_) {
    $famousDecorator = _$famousDecorator_;
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));


  describe('addRole', function() {
    it('should assign a role to a specific scope', function() {
    });
  });


  describe('ensureIsolate', function() {

    describe('should return', function() {
      it("an isolate scope with the passed-in scope's $id.", function() {
        var isolate = $famousDecorator.ensureIsolate($scope);
        expect(isolate).toBeDefined();
        expect(isolate.id).toEqual($scope.$id);
      });

      it('an existing isolate property, if scope.isolate already exists', function() {
        $scope.isolate = {};
        $scope.isolate[$scope.$id] = { id: $scope.$id };
        var isolate = $famousDecorator.ensureIsolate($scope);
        expect(isolate).toBeDefined();
        expect(isolate).toEqual($scope.isolate[$scope.$id]);
      });

      it('an isolate scope with an $index property, if the $scope is being used with ng-repeat.', function() {
      });
    });


    describe('should take a scope', function() {
      it('and ensure there is a scope.isolate property.', function() {
        var $scopeId = $scope.$id;
        
        var isolate = $famousDecorator.ensureIsolate($scope);
        expect(isolate.id).toBeDefined();
        expect(isolate.id).toEqual($scopeId);
      });

      it('and create a new scope.isolate, if scope.isolate does not already exist', function() {
        //console.log($scope.$eval("index"));
        var isolate = $famousDecorator.ensureIsolate($scope);
        //expect(isolate.isolate).toBeDefined();
      });

      it('and not change scope.isolate, if scope.isolate already exists', function() {
        $scope.isolate = {};
        $scope.isolate[$scope.$id] = { id: $scope.$id };
        // Make a deep copy of the current $scope.isolate
        var originalIsolate = angular.copy($scope.isolate);
        $famousDecorator.ensureIsolate($scope);
        expect($scope.isolate).toEqual(originalIsolate);
      });

    });

  });

});
