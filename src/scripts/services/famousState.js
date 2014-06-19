angular.module('famous.angular')
  .provider('$famousState', function (){
    var states = {};
    var queue = {};
    var $famousState;
    var root;

    
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

    function buildState (state) {
      
      angular.forEach(stateBuilder, function(buildFunction) {
        buildFunction(state);
      });

      registerState(state);
      updateQueue();
    }

    var stateBuilder = {

      parent: function(state) {
        if (angular.isDefined(state.parent) && state.parent) { return; }
        // regex matches any valid composite state name
        // would match "contact.list" but not "contacts"
        var compositeName = /^(.+)\.[^.]+$/.exec(state.name);
        state.parent = compositeName ? compositeName[1] : root;
      },

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

      controller: function(state){

        var controller = state.controller;

        if ( !state.template && !!controller ) { 
          throw new Error('A template must defined in order to create a controller');
        } 

        if ( !!controller && !angular.isString(controller) && !angular.isFunction(controller) ) {
          throw new Error('Controller must be a function or reference an existing controller');
        } 
      },

      transitions: function(state) {
        //should be a function that returns a transition(I think)
        var inTransition = state.inTransition;
        var outTransition = state.outTransition;

        if ( !!inTransition  ){
          if ( !angular.isFunction(inTransition)  && !angular.isString(inTransition) && !angular.isObject(inTransition) ) {
            throw new Error('Transitions must be defined with a string, function, or object');
          }
        } else {
          state.inTransition = function() { return undefined; };
        } 

        if ( !!outTransition  ){
          if ( !angular.isFunction(outTransition)  && !angular.isString(outTransition) && !angular.isObject(outTransition) ) {
            throw new Error('Transitions must be defined with a string, function, or object');
          }
        } else {
          state.outTransition = function() { return undefined; };
        } 
      },
      
      views: function(state) {
        var views = {};

        angular.forEach(angular.isDefined(state.views) ? state.views : { '': state }, function (view, name) {
          if ( !name ) { name = '@'; }
          if ( name.indexOf('@') === -1) { name += '@' + state.parent.name; }
          validateView(view, name);
          views[name] = view;
        });

        state.views = views;
      }

    };

    function validateView (view) {
      stateBuilder.template(view);
      stateBuilder.controller(view);
      stateBuilder.transitions(view);
    }

    function registerState(state) {
      var name = state.name;
      delete state.name;
      states[name] = state;
    }

    function queueState(state) {
      if ( !!queue[state.name] ) {
        queue[state.name] = state;
      }
    }

    function updateQueue(){
      for ( var name in queue ) {
        defineState(queue[name]);
      }
    }

    root = {
      name : '',
      parent: null,
      views: null,
      template: null,
      contoller: null
    };
    
    this.$get = $get;
    $get.$inject = ['$rootScope','$http', '$q', '$templateCache'];
    function $get($rootScope, $http, $q, $templateCache){

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
      
      $famousState.includes = function(state) {
        return states[state]? true : false;
      };

      $famousState.go = function(state){

        validateTransfer(state);
          
      };

      function validateTransfer(state) {

        if ( state === $famousState.current ) { return; }

        if ( state === '^' && $famousState.$parent !== root ) {
          state = $famousState.parent;
          return validateState(state);
        } else {
          $rootScope.$broadcast('$stateNotFound');
        }

        if ( state.indexOf('^') === 0 && state.length > 1 ) {
          state = $famousState.parent + state;
          return validateState(state);
        }

        if ( state.indexOf('.') === 0 ) {
          state = $famousState.current + state;
          return validateState(state);
        }

        validateState(state);

      }

      function validateState (state) {

        if ( states[state] ) {
          transitionState(state);
        } else {
          $rootScope.$broadcast('$stateNotFound');
        }

      }

      function transitionState(state) {

        $famousState.$prior = $famousState.$current;
        $famousState.current = state;
        $famousState.$current = states[state];

        $famousState.$current.locals = updateLocals();
        $famousState.parent = $famousState.$current.parent;

        fetchTemplate($famousState.$current)
        .then(function(template){
          $famousState.$template = template.data;
          $rootScope.$broadcast('$stateChangeSuccess');
        });

      }

      function fetchLocalTemplates() {

        var templateRequests = [];

        angular.forEach(locals, function(view, name) {
          templateRequests.push(fetchTemplates(view,name));
        });

        return $q.all(templateRequests);
      }

      function updateLocals (){

        var locals = {};
        var templateRequests = [];

        angular.forEach($famousState.$current.views, function (view, name) {
          if ( name !== '@' ) {
            locals[name] = view;
            templateRequests.push(fetchTemplates(view, name));
          }
        });

        $q.all(templateRequests)
        .then(function(data) {
          angular.forEach(data, function(template) {
            console.log('name', template.name);
            console.log('template', template.data);
            locals[template.name].$template = template.data;
          });
          console.log('locals before returned from updateLocals', locals);
          return locals;
        });
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