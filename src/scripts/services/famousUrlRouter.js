
angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var rules = {}; // {url: stateName}
    var defaultState;










    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$famousState'];
    function $get($rootScope, $location, $famousState) {


      
      return $famousUrlRouter;
    }
});    
  