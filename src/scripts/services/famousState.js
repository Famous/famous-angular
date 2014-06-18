

angular.module('famous.angular')

  .provider('$famousState', function() {
    
    var states = {};
    var queue = {};
    var $famousState;
    var root;

   


    root = {
      name : '',
      url: '^',
      parent: null,
      views: null,
      template: null,
      contoller: null,
      locals: null
    };
    
    this.$get = $get;
    $get.$inject = ['$rootScope','$http', '$location', '$q', '$famousTemplate'];
    function $get($rootScope, $http, $location, $q, $famousTemplate) {




      return $famousState;
    }   
});