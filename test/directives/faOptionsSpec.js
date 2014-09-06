'use strict';

describe('faOotions', function() {
    var eventHandler, common, $compile, $scope, $famous;

    beforeEach(module('famous.angular'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$famous_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $famous = _$famous_;

        eventHandler = new $famous['famous/core/EventHandler']();

        $famous['famous/views/GridLayout'].prototype.getSequence = function(){
            return this.sequence || new $famous['famous/core/ViewSequence']();
        };

        common = window.famousAngularCommon($scope, $compile);
    }));

    it('should update options', function() {

        var app = common.createApp(
                '<fa-grid-layout fa-options="gridOptions" fa-pipe-from="eventHandler">' +
                '<fa-view>' +
                '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
                '</fa-view>' +
                '</fa-grid-layout>'
        );


        $scope.eventHandler = eventHandler;
        $scope.gridOptions = {dimensions: [2, 2]};
        $scope.$apply();

        var gridLayout = $famous.find('fa-grid-layout')[0].renderNode;

        expect(gridLayout.options.dimensions[0]).toBe(2);

        $scope.gridOptions = {dimensions: [4, 4]};

        $scope.$apply();
        expect(gridLayout.options.dimensions[0]).toBe(4);

        common.destroyApp(app);

    });
});
