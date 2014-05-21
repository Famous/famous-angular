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


  it('should work as an element or an attribute', function() {
    function faAppElement() {
      $compile("<fa-app></fa-app>")($scope);
    }
    function faAppAttribute() {
      $compile("<div class='fa-app'></div>")($scope);
    }
    expect(faAppElement).not.toThrow();
    expect(faAppAttribute).not.toThrow();
  });


  it('should append a div.famous-angular-container pre-compilation', function() {
    expect(element[0].querySelector('.famous-angular-container')).toBeNull();
    element.append($compile("<fa-app></fa-app>")($scope));
    expect(element[0].querySelector('.famous-angular-container')).not.toBeNull();
  });


  it('should unregister its context when recieving a "$destroy" event', function() {
    // Not implemented yet due to a Famo.us Engine limitation
  });
  

  it('should add a node to its view when receiving a "registerChild" event', function() {
    var faApp = $compile("<fa-app><fa-scroll-view></fa-scroll-view></fa-app>")($scope);
    //var faApp = $compile("<fa-app></fa-app>")($scope);

    document.body.appendChild(faApp[0]);
    faApp.append($compile("<fa-scroll-view></fa-scrol-view>")($scope));

    //var faAppView = $famous.find('fa-app');
    //var secondScope = $scope.$new();
    //console.log(secondScope.$parent.$id);
    //secondScope.$emit('registerChild', {});
    //expect(faAppView[0]).toBeDefined();
    //faAppView[0].$emit('register', {});
  });


  it('should transclude content', function() {
    expect(element.find('span').length).toEqual(0);
    element.append($compile("<fa-app><span id='test'></span></fa-app>")($scope));
    expect(element.find('span').length).toEqual(1);
  });

});
