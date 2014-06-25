

angular.module('famous.angular')

  .provider('$famousState', function() {
    
    var states = {};
    var queue = {};
    var $famousState;
    var root;

    /**
     * @ngdoc method
     * @name $famousProvider#state
     * @module famous.angular
     * @description
     * Defines the states of the application
     * @param {String} definition Defines the name of the state
     * @param {Object} definition Defines the parameters of the state
     */

    this.state = state;
    function state(name, definition) {
      /** 
       * If only a single state definition object is passed as a parameter, will
       * attempt to extract the state name from the parameter object 
       */
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
     */
    function defineState(state) {
      
      // Static child views may be defined using '@child@parent'
      var name = state.name;
      if ( !angular.isDefined(name) || !angular.isString(name) || name.indexOf('@') >= 0  || name.indexOf('.') !== -1 )  {
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


    function buildState (state) {
      
      angular.forEach(stateBuilder, function(buildFunction) {
        buildFunction(state);
      });

      registerState(state);
      updateQueue(state);
    }

    /**
     * Validates each of the propeties on the state object before the state is registered.
     */
    var stateBuilder = {
      
      // Extracts the name of the parent if implicitly ('parent.child') defined on the parent property
      parent: function(state) {
        if ( angular.isDefined(state.parent) && state.parent ) { return; }
        
        // Extract parent name from composite state name: grandparent.parent.child -> grandparent.parent 
        var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
        state.parent = compositeName ? compositeName[1] : root;
      },
 
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
        if ( (!state.template && !angular.isDefined(state.views)) && !!controller ) { 
          throw new Error('A template must defined in order to create a controller');
        } 
        if ( !!controller && !angular.isString(controller) && !angular.isFunction(controller) ) {
          throw new Error('Controller must be a function or reference an existing controller');
        } 
      },


      transitions: function(state) {

        if ( !angular.isDefined(state.inTransitionFrom) && !angular.isDefined(state.outTransitionTo) ) { return; } 
        
        var transitions = {}; 
        transitions.inTransitionFrom = state.inTransitionFrom;
        transitions.outTransitionTo = state.outTransitionTo;
 

        for ( var direction in transitions ) {
          if ( angular.isString(transitions[direction]) ) {
            // '($callback)' must be added to the function to create an invocation that can be properly parsed
            state[direction] = transitions[direction] + '($callback)'; 
          } else if ( angular.isObject(transitions) ) {
            angular.forEach(transitions[direction], function(definition, state) {
              transitions[direction][state] = definition + '($callback)';
            })
            angular.extend(state[direction], transitions[direction]);
          } else if ( angular.isDefined(state[direction]) ) { 
            throw new Error('Transitions must be strings which reference function names');
          }
        }
      },
      
      // Static views should be defined using 'staticChild@parent' notation
      views: function(state) {

        if ( !angular.isDefined(state.views) ) { 
          state.views = { '@': state };
          return;
        }

        var views = {};

        angular.forEach(angular.isDefined(state.views) ? state.views : { '': state }, function (view, name) {
          if ( !name ) { name = '@'; }
          if ( name.indexOf('@') === -1 ) { name += '@' + state.parent.name; }
          validateView(view, name);
          views[name] = view;
        });

        state.views = views;
      },

      /**
       * Creates a locals object which contains all data relevant to the child views the states
       */
      locals: function(state) {

        state.locals = {};
        
        angular.forEach(state.views, function(view, name) {
          if ( name !== '@' ) { state.locals[name] = view; }
        });
      }

    };

    /**
     * Static views are similar to states in that they may have their own templates, controllers,
     * and transitions defined.  Accordingly, all properties must be defined in the same manner. 
     */
    function validateView (view) {
      
      stateBuilder.template(view);
      stateBuilder.controller(view);
      stateBuilder.transitions(view);
    }

    /**
     * Adds the state to the states object which stores all valid registered states
     */
    function registerState(state) {

      var name = state.name;
      states[name] = state;
    }

    /**
     * Adds an "orphan" child state to the queue if it doesn't already exist within the queue
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
     */
    function updateQueue(state){
      if ( queue[state.name] ) { delete queue[state.name]; }
      for ( var name in queue ) {
        defineState(queue[name]);
      }
    }

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



      $famousState = {
        current: root.name, // Name of the current state
        $current: root,
        parent: root.parent,
        locals: {},
        $prior: {}, // Prior state object
        inTransitionTo: '',
        outTransitionFrom: ''
      };


      $famousState.includes = function(state) {  
        return stateValid(state);
      };


      $famousState.go = function(state, reload){
        if ( state === $famousState.current && !reload) { return; }
        transitionState(state);     
      };


      $famousState.getStates = function() {
        return states;
      };

      // Updates the $famousState object so that the new state view may be rendered by the fa-router directive
      function transitionState(state) {
        state = transferValid(state);
        if ( !state ) { return $rootScope.$broadcast('$stateNotFound'); }

        $famousState.$prior = $famousState.$current;
        $famousState.current = state;
        $famousState.$current = states[state];
        $famousTemplate.resolve($famousState.$current)
        .then(function(template){
          $famousState.$current.$template = template;
          $rootScope.$broadcast('$stateChangeSuccess');
          if ( !!$famousState.$current.url ) { 
            $location.path($famousState.$current.url); }
        });
      }

      function transferValid(state) {

        // '^' indicates that the parent state should be activated
        if ( state === '^' ) { 
          var parent = /^(.+)\.[^.]+$/.exec($famousState.current)[1];
          return stateValid(parent) ? parent : false;
        }

        // '^.name' indicates that a sibling state should be activated
        if ( state.indexOf('^') === 0 && state.length > 1 ) {
          state = $famousState.$current.parent + state.slice(1);
          return stateValid(state) ? state : false;
        }
        
        // '.name' indicates that a child state should be activated
        if ( state.indexOf('.') === 0 ) {
          state = $famousState.current + state;
          return stateValid(state) ? state : false;
        }
        

        if ( state.indexOf('.') > 0 ) {
          if ( $famousState.current === '' ) { $location.path('^'); }
          var parentName = /^(.+)\.[^.]+$/.exec(state)[1];
          if ( $famousState.current === parentName ) {
            return stateValid(state) ? state : false;
          } else {
            var relativeState  = findCommonAncestor(parentName);
            return stateValid(relativeState) ? relativeState : false;
          }
        }

        return stateValid(state) ? state: false;
      }

      function findCommonAncestor (parentName) {
        
        var currentParent = $famousState.$current.parent;
        var newParent = parentName;
        var newChild;
        
        while (currentParent && newParent) {

          if ( currentParent.indexOf('.') !== -1 && currentParent.length >= newParent.length ) {
            currentParent = /^(.+)\.[^.]+$/.exec(currentParent)[1];
          }
          if ( newParent.indexOf('.') !== -1 && newParent.length > currentParent.length ) {
            newChild = newParent.slice(newParent.lastIndexOf('.'));
            newParent = /^(.+)\.[^.]+$/.exec(newParent)[1];
          }
          if ( currentParent === newParent || currentParent.indexOf('.') === -1 && newParent.indexOf('.') === -1  ) { break; }

        }

        return newParent + newChild;
      }


      return $famousState;
    }   
});