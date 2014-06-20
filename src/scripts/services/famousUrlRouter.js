
angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var rules = {}; // {url: stateName}
    var defaultState;




    this.otherwise = otherwise;
    function otherwise(state) {
      if ( !angular.isString(state) || state.indexOf('@') >= 0)  {
        throw new Error('Default state must have a valid name');
      }
      defaultState = state;
    }





    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$famousState'];
    function $get($rootScope, $location, $famousState) {


      
      return $famousUrlRouter;
    }
});    
  