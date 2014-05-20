'use strict';

describe('test', function() {

  beforeEach(function() {
    module('famous.angular');
    var injector = angular.injector(['ng', 'famous.angular']);
    console.log(injector);
    var $famous = injector.get('$famous');
    var $scope = injector.get('$scope');
    console.log($famous);
  });

  //beforeEach(inject(function($controller, $famous){ 
  //}));

  it('should test', function() {
  
  });


  //it('should be true', function() {
    //setTimeout(function (){
      //inject(function($famous) {
        //console.log($famous);
      
        ////expect(true).toEqual(true);
        //expect(false).toEqual(true);
      //});
    //}, 1000);
  //});

});
