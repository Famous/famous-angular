angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    //every time a state is registered, the url needs to be registered with famousUrlRouter
    //on location change, the URL router can check to see whether or not the specified location is
    //registered.  If so, signal state.go;  
    //Also when state.go is triggered, the urlRouter needs to be notified so that it can update the location

    var $famousUrlRouter = {};
    var registeredUrls = {}; //{ {name: url}, {name: url} }
    var rules = {}; // {url: stateName}
    var defaultState;

    // URLs and corresponding states do not need to be manually registered using UrlRouter
    // famousStateProvider will automatically register states
    // only otherwise should be specifically configured
    this.when = when;
    function when(url, stateName){
      if ( !angular.isDefined(url) || !angular.isDefined(stateName) ) {
        throw new Error('URL and state name required to define URL route');
      }
      if ( !validUrl(url) ) { throw new Error('When defining routes, must specify a valid url'); }
      rules[url] = stateName;
    }

    // for any unmatched url, return to state
    this.otherwise = otherwise;
    function otherwise(state) {
      if ( !angular.isString(state) || state.indexOf('@') >= 0)  {
        throw new Error('Default state must have a valid name');
      }
      defaultState = state;
    }

    this.registerUrl = registerUrl;
    function registerUrl(url, stateName) { 
      if ( !validUrl(url) ) { throw new Error('url for ' + stateName + ' must be valid'); }
      registeredUrls[stateName] = url;
      when(url, stateName);
    };

    function validUrl(url) {
      // Simple regex check that ensures the url starts with '/' and contains only letters, numbers, /, or _ 
      // FIX: Currently allows for repeated slashes so long as they do not occur at the beginning of the string.
      var regex = /^\/(?!\/)[a-zA-Z\d_\/(?!\/)]*$/;   
      return ( angular.isString(url) && !!regex.exec(url) );
    }


    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$log'];
    function $get($rootScope, $location, $log) {

      // returns the current location
      $famousUrlRouter.location = function(){
        return $location.path();
      };

      $famousUrlRouter.listen = function() {

        $rootScope.$on('$locationChangeSuccess', function(){
          $log.info('Location changed to ' + $location.path());
        });
      };

      function listen() {
        var listener = $rootScope.$on('$locationChangeSuccess', update);
        return listener;
      }

      function update() {   
        var location = $location.path();
        if ( rules[location] ) { 
          $famousState.go(rules[location]);
        } else {
          $famousState.go(defaultState);
        }  
      }

      return {

        listen: function(){
          return listen();
        },

        update: return update()
      }

      return $famousUrlRouter;
  }
    
});