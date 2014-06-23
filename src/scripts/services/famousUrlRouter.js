angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var registeredUrls = {}; //{ {name: url}, {name: url} }
    var rules = {}; // {url: stateName}
    var defaultState;

    /**
     * Defines the routes during the configuration (.config) stage of the provider
     * @param {String} url The relative path for the state
     * @param {String} stateName The name of the state that corresponds to the url
     */
    this.when = when;
    function when(url, stateName){
      if ( !angular.isDefined(url) || !angular.isDefined(stateName) ) {
        throw new Error('URL and state name required to define URL route');
      }
      if ( !validUrl(url) ) { throw new Error('When defining routes, must specify a valid url'); }
      rules[url] = stateName;
    }

    /**
     * Defines the default route during the configuration stage of the provider.  If a URL route
     * is triggered, but is not defined, the application will redirect to the default route.
     * @param {String} state The name of the state that corresponds to the url
     */
    this.otherwise = otherwise;
    function otherwise(state) {
      if ( !angular.isString(state) || state.indexOf('@') >= 0)  {
        throw new Error('Default state must have a valid name');
      }
      defaultState = state;
    }

    /**
     * Stores a url and it's associated state, assuming the url is valid 
     * @param {String} url The relative path for the state
     * @param {String} stateName The name of the state that corresponds to the url
     */
    // this.registerUrl = registerUrl;
    // function registerUrl(url, stateName) { 
    //   if ( !validUrl(url) ) { throw new Error('url for ' + stateName + ' must be valid'); }
    //   registeredUrls[stateName] = url;
    //   when(url, stateName);
    // };

    /**
     * Validates a url (relative path), ensuring that it begins with a '/' and contains only
     * alphanumeric characters, underscores, or '/'s.
     * @param {String} url The relative path for the state
     */
    function validUrl(url) {
      // FIX: Currently allows for repeated slashes so long as they do not occur at the beginning of the string.
      var regex = /^\/(?!\/)[a-zA-Z\d_\-\/(?!\/)]*$/;   
      return ( angular.isString(url) && !!regex.exec(url) );
    }

    /**
     * $famousUrlProvider service is responsible for watching $location and ensuring
     * that $location is updated whenever the state of the application changes.   
     * $famousUrlRouter also signals $famousState.go to transition states whenever a user
     * updates the status bar, thereby triggering a change in $location.
     */
    this.$get = $get;
    $get.$inject = ['$rootScope', '$location', '$famousState'];
    function $get($rootScope, $location, $famousState) {

      var currentPath = '';

      // Returns the current URL path
      $famousUrlRouter.location = function(){
        console.log('location state');
        return $location.path();
      };
      
      // Returns a boolean indicated whether or not a specific URL is registered
      $famousUrlRouter.registered = function() {
        console.log('registered urls');
        return registeredUrls;
      };

      // Listens for the $location change event
      $famousUrlRouter.listen = function() {
        console.log('listening');
        var listener = $rootScope.$on('$locationChangeSuccess', $famousUrlRouter.update);
        return listener;
      };
    
      $famousUrlRouter.getDefaultState = function() {
        return defaultState;
      };

      $famousUrlRouter.update = function () {   
        console.log('update triggered');
        var location = $location.path();
        // var reload = currentPath === location? true : false;
        if ( rules[location] ) { 
          $famousState.go(rules[location]);
          currentPath = location;
        } else {
          $location.path(defaultState);
          $famousState.go(defaultState);
          currentPath = $location.path(); // TODO: Find a better way to accomplish this
        }  
      };
      
      /**
      * Currently unable to inject $famousUrlRouterProvider into $famousStateProvider.  This is a 
      * workaround that fetches all of the states registered with state provider and registers their
      * URLs so that they don't need to be manually defined within the application .config block.
      */
      function registerExternalUrls() {
        var states = $famousState.getStates();
        angular.forEach(states, function(state, name) {
          if ( !!state.url ) { when(state.url, name); }
        });
      }

      function setInitialLocation() {
        currentPath = $location.path();
      }

      registerExternalUrls();
      setInitialLocation();
      $famousUrlRouter.listen();
      $famousUrlRouter.update();

      return $famousUrlRouter;
    }
});    
  