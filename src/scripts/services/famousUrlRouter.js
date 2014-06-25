
angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var rules = {}; // {url: stateName}
    var defaultState;


    this.when = when;
    function when(url, stateName){
      if ( !angular.isDefined(url) || !angular.isDefined(stateName) ) {
        throw new Error('URL and state name required to define URL route');
      }
      if ( !validUrl(url) ) { throw new Error('When defining routes, must specify a valid url'); }
      rules[url] = stateName;
    }

    this.otherwise = otherwise;
    function otherwise(state) {
      if ( !angular.isString(state) || state.indexOf('@') >= 0)  {
        throw new Error('Default state must have a valid name');
      }
      defaultState = state;
    }


    function validUrl(url) {
      // FIX: Currently allows for repeated slashes so long as they do not occur at the beginning of the string.
      var regex = /^\/(?!\/)[a-zA-Z\d_\-\/(?!\/)]*$/;   
      return ( angular.isString(url) && !!regex.exec(url) );
    }



    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$famousState'];
    function $get($rootScope, $location, $famousState) {



      $famousUrlRouter.listen = function() {
        var listener = $rootScope.$on('$locationChangeSuccess', $famousUrlRouter.update);
        return listener;
      };

      $famousUrlRouter.update = function () {   
        var location = $location.path();
        var reload = currentPath === location? true : false;
        if ( rules[location] ) { 
          $famousState.go(rules[location], reload);
          currentPath = location;
        } else {
          $location.path(defaultState);
          $famousState.go(defaultState);
          currentPath = $location.path(); // TODO: Find a better way to accomplish this
        }  
      };

      function registerExternalUrls() {
        var states = $famousState.getStates();
        angular.forEach(states, function(state, name) {
          if ( !!state.url && !rules[state.url] ) { when(state.url, name); }
        });
      }



      registerExternalUrls();
      setInitialLocation();
      $famousUrlRouter.listen();
      $famousUrlRouter.update();
      
      return $famousUrlRouter;
    }
});    
  