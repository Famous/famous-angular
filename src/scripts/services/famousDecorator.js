/**
 * @ngdoc service
 * @name $famousDecorator
 * @module famous.angular
 * @description
 * Manages the creation and handling of isolate scopes.
 *
 * Isolate scopes are like a namespacing inside plain Angular child scopes,
 * with the purpose of storing properties available only to one particular
 * scope.
 * The scopes are still able to communicate with the parent via events
 * ($emit, $broadcast), yet still have their own $scope properties that will
 * not conflict with the parent or other siblings.
 *
 * @usage
 * ```js
 * var isolate = $famousDecorator.ensureIsolate($scope);
 *
 * $famousDecorator.registerChild($element, $scope, isolate);
 *
 * $famousDecorator.sequenceWith(
 *   $scope,
 *   function(data) { ... },
 *   function(childScopeId) { ... }
 * );
 * ```
 */

angular.module('famous.angular')
  .factory('$famousDecorator', ['$famous', function ($famous) {
    //TODO:  add repeated logic to these roles
    var _roles = {
      child: {
      },
      parent: {
      },
      renderable: function( isolate ) {
        var RenderNode = $famous['famous/core/RenderNode'];

        isolate.renderGate = new RenderNode();
        isolate.emptyNode = new RenderNode();

        isolate.show = function() {
          if(isolate.renderGate) isolate.renderGate.set(isolate.renderNode);
        };
        isolate.hide = function() {
          isolate.renderGate.set(isolate.emptyNode);
        };
      }

    };

    var _isolateStore = {};

    return {
      //TODO:  patch into _roles and assign the
      // appropriate role to the given scope
      addRole: function(role, isolate){
          _roles[role](isolate);
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#ensureIsolate
       * @module famous.angular
       * @description
       * Checks the passed in scope for an existing isolate property.  If
       * scope.isolate does not already exist, create it.
       *
       * If the scope is being used in conjunction with an ng-repeat, assign
       * the default ng-repeat index onto the scope.
       *
       * @returns {Object} the isolated scope object from scope.isolate
       *
       * @param {String} scope - the scope to ensure that the isolate property
       * exists on
       * @param {Object} element (optional) - the DOM element associated with the target scope
       */
      ensureIsolate: function(scope, element) {


        //handle special-case directives that don't follow a (DOM hierarchy <=> Scope hierarchy) relationship
        if(element){
          var SPECIAL_CASE_LIST = ['fa-edge-swapper', 'fa-render-controller', 'fa-deck', 'fa-lightbox'];
          var special = false;
          angular.forEach(SPECIAL_CASE_LIST, function(specialCase){
            if(specialCase.toUpperCase() === element[0].tagName) { special = true; return; }
            if(element[0].attributes[specialCase] !== undefined) { special = true; return; }
          });
          if(special){
            scope = scope.$parent;
          }
        }

        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        _isolateStore[isolate.id] = isolate;

        return isolate;
      },

      //relies on an 'alternate source of truth' vs the static .isolate
      //member shared by the fa-element child scopes.  Unideal, but should be OK
      //based on the assumption that a single Angular app will create a unique ID for
      //every new scope.
      //surface area for a memory leak (TODO: clean up upon element destruction--BUT, make sure
      //it doesn't break leave animations on ui-view and ng-include animations, e.g. <ui-view fa-edge-swapper></ui-view>)
      $$getIsolateById: function(id){
        return _isolateStore[id];
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#registerChild
       * @module famous.angular
       * @description
       * Register a child isolate's renderNode to the nearest parent that can sequence
       * it, and set up an event listener to remove it when the associated element is destroyed
       * by Angular.
       *
       * A `registerChild` event is sent upward with `scope.$emit`.
       *
       * @param {String} scope - the scope with an isolate to be sequenced
       * @param {String} element - the element to listen for destruction on
       * @param {Object} isolate - an isolated scope object from $famousDecorator#ensureIsolate
       * @param {Function} unregisterCallback - an optional callback to invoke when unregistration is complete
       * @returns {void}
       */
      registerChild: function(scope, element, isolate, unregisterCallback) {
        scope.$emit('registerChild', isolate);

        element.one('$destroy', function() {
          if ('removeMethod' in isolate) {
            isolate.removeMethod(isolate.id);
          }

          if(isolate && isolate.hide) { isolate.hide(); }

          // Invoke the callback, if provided
          if(unregisterCallback) unregisterCallback();
        });
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#sequenceWith
       * @module famous.angular
       * @description
       * Attach a listener for `registerChild` events.
       *
       * @param {String} scope - the scope to listen on
       * @param {Object} addMethod - the method to apply to the incoming isolate's content to add it
       * to the sequence
       * @param {Object} removeMethod - the method to apply to the incoming isolate's ID to remove it
       * from the sequence
       * @returns {void}
       */
      sequenceWith: function(scope, addMethod, removeMethod, updateMethod) {
        scope.$on('registerChild', function(evt, isolate) {
          if (evt.targetScope.$id !== scope.$id) {
            //add reference to parent isolate
            var parentIsolate = $famous.getIsolate(scope);
            isolate.$parent = parentIsolate;

            parentIsolate.$children = parentIsolate.$children || [];
            parentIsolate.$children.push(isolate);

            addMethod(isolate);
            evt.stopPropagation();

            // Attach the remove method to the isolate, so it can be invoked without scope, if it is provided
            if(removeMethod) isolate.removeMethod = removeMethod;
            if(updateMethod) isolate.updateMethod = updateMethod;
          }
        });
      }
    };
  }]);
