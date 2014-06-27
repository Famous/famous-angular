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


      // Keeps a record of most recent location
      var currentPath = '';

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
});    
  