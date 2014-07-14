/**
 * @ngdoc provider
 * @name $famousUrlRouterProvider
 * @module famous.angular
 * @description
 * This provider allows for state-based routing similar to that of the Angular UI Router.  The 
 * difference being that $famousStateProvider allows Famo.us animations and transforms to be defined on
 * state transitions.
 *
 * @usage
 * URL routes may be defined in the configuration block using the 'when' and 'otherwise' methods.  If 
 * $famousStateProvider is used to define URLs for states, they do not need to be defined here.  However,
 * the 'otherwise' method should always be used to define the state which the application will
 * default to when an invalid URL is specified.
 *
 * ```js
 * angular.module('mySuperApp', ['famous.angular']).config(
 *   function($famousUrlRouterProvider) {
 *     
 *    $famousUrlRouterProvider.when('/blog', 'blog');
 *    $famousUrlRouterProvider.when('/portfolio', 'portfolio');
 *    $famousUrlRouterProvider.when('/contact', 'contact');
 *    $famousUrlRouterProvider.otherwise('home');
 *    
 *   }
 * });
 * ```
 *
 */
angular.module('famous.angular')
  .provider('$famousUrlRouter', function(){

    var $famousUrlRouter = {};
    var rules = {}; // {url: stateName}
    var defaultState;

    /**
     * @ngdoc method
     * @name $famousUrlRouter#when
     * @module famous.angular
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
     * @ngdoc method
     * @name $famousUrlRouter#otherwise
     * @module famous.angular
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
     * Validates a url (relative path), ensuring that it begins with a '/' and contains only
     * alphanumeric characters, underscores, or '/'s.
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

      /**
       * @ngdoc service
       * @name $famousUrlRouter
       * @module famous.angular
       * @description
       * This service gives you access to $famousUrlRouter object.
       * @usage
       * Use this service to sync the state of the application and $location.  After configuring the 
       * provider, no interaction should be required.  However, $famousUrlRouter must be included in a 
       * controller in order to use URL routing.
       * 
       * ```js
       * angular.module('mySuperApp', ['famous.angular'])
       *   .controller('mainCtrl', function($scope, $famousUrlRouter) {
       *   
       *   // Control things
       *  
       *   });   
       * ```
       */

      // Keeps a record of most recent location
      var currentPath = '';

      /**
       * @ngdoc method
       * @name $famousUrlRouter#listen
       * @module famous.angular
       * @description Listens for a $location change event and triggers the update function
       */
      $famousUrlRouter.listen = function() {
        var listener = $rootScope.$on('$locationChangeSuccess', $famousUrlRouter.update);
        return listener;
      };

      /**
       * @ngdoc method
       * @name $famousUrlRouter#update
       * @module famous.angular
       * @description Triggered on location change.  If the new location is registered, initiates
       * transition to the corrsponding state by calling $famousState.go('stateName').  If the location
       * is not registered, $famouState.go is called with the default state.
       */
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
      
      /**
      * Currently unable to inject $famousUrlRouterProvider into $famousStateProvider.  This is a 
      * workaround that fetches all of the states registered with state provider and registers their
      * URL routes so that they don't need to be manually defined within the application .config block.
      * If URL routes are defined using the router provider during configuration, they will not be
      * overwritten by this function.
      */
      function registerExternalUrls() {
        var states = $famousState.getStates();
        angular.forEach(states, function(state, name) {
          if ( !!state.url && !rules[state.url] ) { when(state.url, name); }
        });
      }

      // Sets the currentPath to the initial url path on application load
      function setInitialLocation() {
        currentPath = $location.path();
      }

      registerExternalUrls();
      setInitialLocation();
      $famousUrlRouter.listen();
      $famousUrlRouter.update();
      
      return $famousUrlRouter;
    }
})
.run(function($famousUrlRouter){
  
});    
  