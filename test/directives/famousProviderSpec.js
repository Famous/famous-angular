'use strict';

describe('$famous', function() {
  var $famousProvider, $famous;
  var $compile, $scope;

  beforeEach(module('famous.angular'));

  beforeEach(module(function(_$famousProvider_) {
    $famousProvider = _$famousProvider_;
  }));

  beforeEach(inject(function(_$famous_, _$compile_, _$rootScope_) {
    $famous = _$famous_;
    $compile = _$compile_;
    $scope = _$rootScope_;
  }));

  describe('provider', function() {
    it('will register and store famous requirejs modules', function() {
    });
  });

  it('should return a hashmap of famo.us constructor functions', function() {
    expect(typeof $famous).toBe('object');
    var EventHandler = $famous['famous/core/EventHandler'];
    expect(typeof EventHandler).toBe('function');
  });

  it('should have a method for finding famo.us objects in the DOM', function() {
    var scrollView = $compile('<fa-scroll-view id="myScrollView"></fa-scroll-view>')($scope);
    // Add the $compile'd element to body
    document.body.appendChild(scrollView[0]);
    // Search the body for the isolate scope of the selector
    var scrollViewIsolateScope = $famous.find('#myScrollView');
    expect(scrollViewIsolateScope[0].id).toBeDefined();

    // Searching for a non-existant element should return an empty array
    var searchResults = $famous.find('#doesNotExist');
    expect(searchResults).toEqual([]);
  });
});
