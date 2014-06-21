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

      url: function(state) {
        
        var url = state.url;

        if ( !angular.isDefined(url) ) { return; }

        $famousUrlRouter.registerUrl(state, url);

        if ( !angular.isString(url) ) { throw new Error('url for state ' + state.name + ' must be a string')}
        
      },

      // Keep track of the closest ancestor state that has a URL (i.e. is navigable)
      // navigable: function(state) {
      //   return state.url ? state : (state.parent ? state.parent.navigable : null);
      // },

      // path: function(state) {
      //   return state.parent ? state.parent.path.concat(state) : []; // exclude root from path
      // },

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
        var inTransitionFrom = state.inTransitionFrom;
        var outTransitionTo = state.outTransitionTo;
        
        if ( !angular.isDefined(inTransitionFrom) && (!angular.isDefined(outTransitionTo)) ) { return;} 

        if ( !!inTransitionFrom ) {
          angular.forEach(inTransitionFrom, function (definition, property) {
            if ( !!property && !angular.isString(definition) ) {
              throw new Error('inTransitionFrom property ' + property + ' must be a string' );
            } else {
              state.inTransitionFrom[property] = definition || null;
            }
          });
        }

        if ( !!outTransitionTo ) {
          angular.forEach(outTransitionTo, function (definition, property) {
            if ( !!property && !angular.isString(definition)  ) {
              throw new Error('outTransitionTo property ' + property + ' must be a string' );
            } else {
              
              state.outTransitionTo[property] = defintion || null;
            }
          });
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
      if ( !queue[state.name] ) {
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
      navigable: false,
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

        if ( $famousState.includes(state) ) {
          transitionState(state);
        } else {
          $rootScope.$broadcast('$stateNotFound');
        } 
      }



      function transitionState(state) {

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

      // function fetchAll(state) {

      //   var templates = [{state.name: state.template}];

      //   angular.forEach(state.locals, (view, name) {
      //     templates.push(view.template);
      //   })

      //   angular.forEach(templates,  )

      //   if ( state.template.html ) {
      //     templateRequests.push(angular.identity(state.template.html));
      //   } else {
      //     templateRequests.push(fetchTemplate(state.template.link, name));
      //   }

      //   angular.forEach(state.locals, function(view, viewName) {
      //     templateRequests.push(fetchTemplates(view, viewName));
      //   })

      // }

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
          if ( name !== '@' ) {
            locals[name] = view;
          }
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