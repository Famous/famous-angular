angular.module('famous.angular')
  .provider('$famousState', function() {
    
    // var injector = angular.injector(['famous.angular.router', 'ng']);
    // var $famousUrlRouter = injector.get('$famousUrlRouter')
    
    var states = {};
    var queue = {};
    var $famousState;
    var root;

    /**
     * Defines the routes during the configuration stage of the provider
     * @param {String} name The name of the state.  The name can be a simple string
     * such as 'home', or a compund string wuch as 'home.list' which indicates that 
     * the state being defined ('list') is a child of the parent state 'home.' 
     * @param {Object} definition Defines the parameters of the state
     */
    this.state = state;
    function state(name, definition) {
      
      if ( angular.isObject(name) ) {
        definition = name;
      } else {
        definition.name = name;
      }
      defineState(definition);
      return this;
    }

    /**
     * Validates the name and parent of the state object being created.
     * @param {Object} state State object containing all properties related to the state
     */
    function defineState(state) {
      
      var name = state.name;
      if ( !angular.isString(name) || name.indexOf('@') >= 0)  {
        throw new Error('State must have a valid name');
      }
      if (states.hasOwnProperty(name)) {
        throw new Error('State ' + name + ' is already defined');
      }

      // Parent state may be defined within the name of the child state or as a separate property
      var parentName = (name.indexOf('.') !== -1) ? name.substring(0, name.lastIndexOf('.'))
          : ( angular.isString(state.parent) ) ? state.parent
          : '';

      if ( !!parentName && !states[parentName] ) { return queueState(state); }
      
      buildState(state);
    }

    /**
     * Passes the state object into the state builder which validates each of the properties defined
     * on the state.  If the object "passes" the state builder, it will be registered (added to the 
     * states object).  Finally, updateQueue is invoked to determine whether or not the state being 
     * added is the parent of one of the "orhpan" states in the queue.  If so, the child state will be 
     * registered.
     * @param {Object} state State object containing all properties related to the state
     */
    function buildState (state) {
      
      angular.forEach(stateBuilder, function(buildFunction) {
        buildFunction(state);
      });

      registerState(state);
      updateQueue(state);
    }

    /**
     * Validates each of the propeties on the state object before the state is registered.
     * @param {Object} state State object containing all properties related to the state
     */
    var stateBuilder = {
      
      // Extracts the name of the parent if implicitly ('parent.child') defined on the parent property
      parent: function(state) {
        if ( angular.isDefined(state.parent) && state.parent ) { return; }
        // *** UIR ***
        // regex matches any valid composite state name
        // would match "contact.list" but not "contacts"
        var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
        state.parent = compositeName ? compositeName[1] : root;
      },

      // TODO: Resolve dependency injection issue so that URLs can be registered with the 
      url: function(state) {
        
        var url = state.url;

        if ( !angular.isDefined(url) ) { return; }
        if ( !angular.isString(url) ) { throw new Error('url for state ' + state.name + ' must be a string'); }
        
      },
      
      // Template should be a string or a link to an HTML document
      template: function(state) {

        var template;
        if ( !!state.templateUrl ) {
          template = state.templateUrl;
          if ( !angular.isString(template) || template.substr(-5) !== '.html' ) {
            throw new Error('templateUrl must be a string pointing to an HTML document (e.g. templates/myTemp.html)');
          }
          state.template = {link: template};
        } else if ( !!state.template ) {
          template = state.template;
          if ( typeof template !== 'string' ){
            throw new Error('template must be a string containing valid HTML');
          }
          state.template = {html: template};
        }

      },
      
      // An anonymous function or a string referring a controller to be defined within the application
      controller: function(state){
       
        var controller = state.controller;
        if ( !state.template && !!controller ) { 
          throw new Error('A template must defined in order to create a controller');
        } 
        if ( !!controller && !angular.isString(controller) && !angular.isFunction(controller) ) {
          throw new Error('Controller must be a function or reference an existing controller');
        } 
      },

      // Transition properties are strings which reference callback function within their respective controllers
      transitions: function(state) {

        //  ******** THIS IS HORRIFIC.  NEED TO REFACTOR  **********
        var inTransitionFrom = state.inTransitionFrom;
        var outTransitionTo = state.outTransitionTo;
        
        if ( !angular.isDefined(inTransitionFrom) && !angular.isDefined(outTransitionTo) ) { return;} 

        if ( !!inTransitionFrom ) {
          if ( angular.isString(inTransitionFrom) ) {
            state.inTransitionFrom = inTransitionFrom;
          } else if ( angular.isObject(inTransitionFrom) ){
            angular.forEach(inTransitionFrom, function (definition, fromState) {
              if ( !angular.isString(definition) ) { //redundant ceck===
                throw new Error('inTransitionFrom property ' + state + ' must be a string' );
              } else {
                state.inTransitionFrom[fromState] = definition || null;
              }
            }); 
          }
        }

        if ( !!outTransitionTo ) {
          if ( angular.isString(outTransitionTo) ) {
            state.outTransitionFrom = outTransitionTo;
          } else {
            angular.forEach(outTransitionTo, function (definition, toState) {
              if ( !angular.isString(definition) ) {
                throw new Error('outTransitionTo property ' + state + ' must be a string' );
              } else {
                state.outTransitionTo[toState] = definition || null;
              }
            });
          }
        }

      },
      
      // Static views which are defined using 'staticChild@parent' notation
      views: function(state) {
        var views = {};

        angular.forEach(angular.isDefined(state.views) ? state.views : { '': state }, function (view, name) {
          if ( !name ) { name = '@'; }
          if ( name.indexOf('@') === -1 ) { name += '@' + state.parent.name; }
          validateView(view, name);
          views[name] = view;
        });

        state.views = views;
      }

    };

    /**
     * Static views similar states in that they may have their own templates, controllers,
     * and transitions defined.  Accordingly, all of the properties must be validated. 
     * @param {Object} view view object containing all properties related to the view
     */
    function validateView (view) {
      stateBuilder.template(view);
      stateBuilder.controller(view);
      stateBuilder.transitions(view);
    }

    /**
     * Adds the state to the states object which stores all valid registered states
     * @param {Object} state State object contains all properties related to the state
     */
    function registerState(state) {
      var name = state.name;
      states[name] = state;
    }

    /**
     * Adds an "orphan" child state to the queue if it doesn't already exist within the queue
     * @param {Object} state State object contains all properties related to the state
     */
    function queueState(state) {
      if ( !queue[state.name] ) {
        queue[state.name] = state;
      }
    }

    /**
     * Removes state from the queue if it is no longer an "orphan."" Iterates through 
     * the "orphan" queue ito determine is the parent of any of the child states has been registered.  
     * If so, the child state is registered.
     * @param {Object} state State object contains all properties related to the state
     */
    function updateQueue(state){
      if ( queue[state.name] ) { delete queue[state.name]; }
      for ( var name in queue ) {
        defineState(queue[name]);
      }
    }

    root = {
      name : '',
      parent: null,
      navigable: false,
      views: null,
      template: null,
      contoller: null
    };
    
    this.$get = $get;
    $get.$inject = ['$rootScope','$http', '$q', '$templateCache'];
    function $get($rootScope, $http, $q, $templateCache) {

      $famousState = {
        current: root.name, // Name of the current state
        $current: root,
        locals: {},
        parent: '', // Name of the parent state
        $prior: {}, // Prior state object
        $template: '', // HTML template for the current state
        inTransitionTo: '',
        outTransitionFrom: ''
      };


      /**
       * Allows the $famousState object to be queried to determine whether or not a state is registered.
       * @param {String} state The name of a state
       */
      $famousState.includes = function(state) {  
        return stateValid(state);
      };

      /**
       * Initiates the state transition process.  Return if state is the current state and reload is not true.
       * @param {String} state The name of a state
       */
      $famousState.go = function(state, reload){
        if ( state === $famousState.current && !reload) { return; }
        transitionState(state);     
      };

       /**
       * Returns all currently registered states.  This function exists solely for the purpose of 
       * allowing the famousUrlRouter to update URL routes upon initiation.  As soon as the dependency
       * injection issue is resolved, this function may be deleted.
       * @param {String} state The name of a state
       */
      $famousState.getStates = function() {
        return states;
      };

      // Updates the $famousState object to that the proper view may be rendered within the directive
      function transitionState(state) {

        if ( !transferValid ) { return $rootScope.$broadcast('$stateNotFound'); }

        $famousState.$prior = $famousState.$current;
        $famousState.current = state;
        $famousState.$current = states[state];
        $famousState.parent = $famousState.$current.parent;
        $famousState.$current.locals = updateLocals();


        // fetchAll($famousState.$current); 
        // fetch templates
        // .then -> $broadcast

        fetchLocalTemplates($famousState.$current.locals)
        .then(function(data) {
          angular.forEach(data, function(template) {
            $famousState.$current.locals[template.name].$template = template.data;
          });
          return fetchTemplate($famousState.$current);
        })
        .then(function(template){
          $famousState.$template = template.data;
          $rootScope.$broadcast('$stateChangeSuccess');
        });
      }

      /**
       * Validates the name (or relative name) of the parameter passed to 'go'
       * @param {String} state The name (or relative name) of a state
       */
      function transferValid(state) {

        // '^' indicates that the parent state should be activated
        if ( state === '^' ) {
          return $famousState.$parent !== root? stateValid($famousState.parent) : false;
        } 
        
        // '^.name' indicates that a sibling state should be activated
        if ( state.indexOf('^') === 0 && state.length > 1 ) {
          state = $famousState.parent + state;
          return stateValid(state);
        }
        
        // '.name' indicates that a child state should be activated
        if ( state.indexOf('.') === 0 ) {
          state = $famousState.current + state;
          return stateValid(state);
        }

        return stateValid(state);
      }

      /**
       * Ensures that the state being requested exists within the states object
       * @param {String} state The name (or relative name) of a state
       */
      function stateValid (state) {
        return states[state]? true : false;
      }

      function fetchLocalTemplates(locals) {

        var templateRequests = [];

        angular.forEach(locals, function(view, name) {
          templateRequests.push(fetchTemplates(view,name));
        });

        return $q.all(templateRequests);
      }

      function updateLocals (){

        var locals = {};

        angular.forEach($famousState.$current.views, function (view, name) {
          if ( name !== '@' ) { locals[name] = view; }
        });

        return locals;
      }

      function fetchTemplates(view, name) {

        var deferred = $q.defer();
        var template = {};

        $http.get(view.template.link, {cache: $templateCache})
        .success(function(data) {
          template.name = name;
          template.data = data;
          deferred.resolve(template);
        }).error(function(data) {
          template.name = name;
          template.data = data;
          deferred.reject(template);
        });

        return deferred.promise;

      }

      function fetchTemplate(state) {

        if ( state.template.html ) {
          return state.template.html;
        } else {
          return $http.get(state.template.link, { cache: $templateCache });
        }
      }

      return $famousState;
    }   
});