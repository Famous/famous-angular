'use strict';

describe('faDeck', function() {
  var eventHandler, common, $compile, $timeout, $scope, $famous;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$compile_, _$timeout_, _$rootScope_, _$famous_) {
    $compile = _$compile_;
    $timeout = _$timeout_;
    $scope = _$rootScope_.$new();
    $famous = _$famous_;

    eventHandler = new $famous['famous/core/EventHandler']();

    common = window.famousAngularCommon($scope, $compile);
  }));


  it('should work with ng-repeated views', function() {
    var app = common.createApp(
      '<fa-deck fa-pipe-from="eventHandler">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-deck>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.$apply();

    var deck = $famous.find('fa-deck')[0].renderNode;

    expect(deck._items).not.toBeNull();

    common.destroyApp(app);
  });

  it('should allow specification of a start index with fa-start-index', function() {
    //not yet implemented in lib
    pending();

    var app = common.createApp(
      '<fa-deck fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-deck>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1];
    $scope.$apply();

    var deck = $famous.find('fa-deck')[0].renderNode;
    expect(deck._items.getIndex()).toBe(1);
    common.destroyApp(app);
  });

  it('should unregister children when their scopes are destroyed', function() {
    var app = common.createApp(
      '<fa-deck fa-pipe-from="eventHandler" fa-start-index="1">' +
        '<fa-view ng-repeat="view in views">' +
          '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
        '</fa-view>' +
      '</fa-deck>'
    );

    $scope.eventHandler = eventHandler;
    $scope.views = [0, 1, 2];
    $scope.$apply();


    var deck = $famous.find('fa-deck')[0].renderNode;

    expect(deck._items._.array.length).toBe(3);

    // Pop out the current index
    $scope.views.splice(1, 1);
    $scope.$apply();

    expect(deck._items._.array.length).toBe(2);

    common.destroyApp(app);
  });
  describe("hide and show", function() {

    it("hide and show properties on the Deck", function() {
      var deck = $compile(
          '<fa-deck fa-pipe-from="eventHandler" fa-start-index="1">' +
            '<fa-view ng-repeat="view in views">' +
              '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
            '</fa-view>' +
          '</fa-deck>'
        )($scope);
      $scope.eventHandler = eventHandler;
      $scope.views = [0, 1, 2];
      $scope.$apply();

      var scope = deck.scope();
      var isolate = scope.isolate[scope.$id];

      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
      isolate.hide()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.emptyNode).toEqual(true);

      isolate.show()
      $scope.$apply();
      expect(isolate.renderGate._object === isolate.renderNode).toEqual(true);
    });
  });

  describe("open and close Deck", function(){

    describe("open", function(){
      it("using a direct value - fa-open=\"true\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="true">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(true);

        common.destroyApp(app);
      });

      it("using the return value of a function - fa-open=\"open()\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="open()">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.open = function(){
          return true;
        }
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(true);

        common.destroyApp(app);
      });

      it("using a function name - fa-open=\"openFunc\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="openFunc">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.openFunc = function(){
          return true;
        }
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(true);

        common.destroyApp(app);
      });

      it("using a $scope variable - fa-open=\"openVal\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="openVal">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.openVal = true;
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(true);

        common.destroyApp(app);
      });
    });

    describe("close", function(){
      it("using a direct value - fa-open=\"false\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="false">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(false);

        common.destroyApp(app);
      });

      it("using the return value of a function - fa-open=\"open()\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="open()">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.open = function(){
          return false;
        }
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(false);

        common.destroyApp(app);
      });

      it("using a function name - fa-open=\"openFunc\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="openFunc">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.openFunc = function(){
          return false;
        }
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(false);

        common.destroyApp(app);
      });

      it("using a $scope variable - fa-open=\"openVal\"", function() {
        var app = common.createApp(
            '<fa-deck fa-pipe-from="eventHandler" fa-open="openVal">' +
              '<fa-view ng-repeat="view in views">' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
              '</fa-view>' +
            '</fa-deck>'
          );
        $scope.views = [0, 1, 2];
        $scope.openVal = false;
        $scope.$apply();

        var deck = $famous.find('fa-deck')[0].renderNode;

        expect(deck.isOpen()).toEqual(false);

        common.destroyApp(app);
      });
    });
  });
});
