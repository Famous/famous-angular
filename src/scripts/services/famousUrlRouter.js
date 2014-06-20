angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var testName = '';

    this.test = test;
    function test(name) {
      testName = name;
    }

    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$log'];
    function $get($rootScope, $location, $log) {

      $famousUrlRouter.location = function(){
        $log.info('Current location', $location.path());
      };

      $famousUrlRouter.name = function(){
        $log.info(testName);
      };

      $famousUrlRouter.listen = function() {

        $rootScope.$on('$locationChangeSuccess', function(){
          $log.info('Location changed to ' + $location.path());
        });
      };

      return $famousUrlRouter;

  }
    
    

});