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

    it('will give a warning if trying to register a module with a key that already eists', function() {

    });
  });

  it('should return a hashmap of loaded famo.us modules', function() {
    expect(typeof $famous).toBe('object');
    expect(Object.keys($famous).length).toBeGreaterThan(0);
    var EventHandler = $famous['famous/core/EventHandler'];
    expect(typeof EventHandler).toBe('function');
  });

  describe('find', function(){
    it('should find a famo.us isolate based on a selector', function() {
      var scrollView = $compile('<fa-scroll-view id="myScrollView"></fa-scroll-view>')($scope);
      // Add the $compile'd element to body
      document.body.appendChild(scrollView[0]);
      // Search the body for the isolate scope of the selector
      var scrollViewIsolateScope = $famous.find('#myScrollView');
      expect(scrollViewIsolateScope[0].id).toBeDefined();

    });

    it('should find multiple famo.us isolates based on a selector', function() {
      var scrollView0 = $compile('<fa-scroll-view class="myScrollView"></fa-scroll-view>')($scope);
      var scrollView1 = $compile('<fa-scroll-view class="myScrollView"></fa-scroll-view>')($scope);
      // Add the $compile'd element to body
      document.body.appendChild(scrollView0[0]);
      document.body.appendChild(scrollView1[0]);
      // Search the body for the isolate scope of the selector
      var scrollViewIsolateScope = $famous.find('.myScrollView');
      expect(scrollViewIsolateScope.length).toEqual(2);

    });

    it('should return an empty array for selectors pointing to non-existent elements', function(){
      // Searching for a non-existent element should return an empty array
      var searchResults = $famous.find('#doesNotExist');
      expect(searchResults).toEqual([]);
    });
  });

  
});
