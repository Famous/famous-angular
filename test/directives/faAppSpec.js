'use strict';
describe('faApp', function() {
  var element, $compile, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;
    element = $compile('<div></div>')($scope);
  }));


  it('should append a div.famous-angular-container pre-compilation', function() {
    expect(element[0].querySelector('.famous-angular-container')).toBeNull();
    element.append($compile("<fa-app></fa-app>")($scope));
    expect(element[0].querySelector('.famous-angular-container')).not.toBeNull();
  });


  it('should work as an element', function() {
    element.append($compile("<fa-app></fa-app>")($scope));
    expect(element[0].querySelector('.famous-angular-container')).not.toBeNull();
  });


  it('should work as an attirbute', function() {
    element.append($compile("<div fa-app></div>")($scope));
    expect(element[0].querySelector('.famous-angular-container')).not.toBeNull();
  });


  it('should unregister its context when recieving a "$destroy" event', function() {
    // Not implemented yet due to a Famo.us Engine limitation
  });
  

  it('should add a node to its view when receiving a "registerChild" event', function() {
    var faApp = $compile("<fa-app></fa-app>")($scope);
    document.body.appendChild(faApp[0]);
    // Get fa-app's newly created scope
    var faAppScope = angular.element(document.querySelector('fa-app')).scope();

    // Spy on isolate.view.add();
    var isolateView = faAppScope.isolate[faAppScope.$id].view;
    spyOn(isolateView, 'add');

    // Create a child scope of that, so that we can emit events up to fa-app
    var secondScope = faAppScope.$new();
    var mockData = { renderNode: 1 };

    secondScope.$emit('registerChild', mockData);
    expect(isolateView.add).toHaveBeenCalled();
  });


  it('should transclude content', function() {
    expect(element.find('span').length).toEqual(0);
    element.append($compile("<fa-app><span id='test'></span></fa-app>")($scope));
    expect(element.find('span').length).toEqual(1);
  });

});
