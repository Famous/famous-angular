

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

      }
      



 
      



    };





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