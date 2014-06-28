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
 * $famousDecorator.registerChild($scope, isolate);
 *
 * $famousDecorator.unregisterChild($element, $scope);
 *
 * $famousDecorator.sequenceWith(
 *   $scope,
 *   function(data) { ... },
 *   function(childScopeId) { ... }
 * );
 * ```
 */

angular.module('famous.angular')
  .factory('$famousDecorator', function () {
    //TODO:  add repeated logic to these roles
    var _roles = {
      child: {
      },
      parent: {
      }
    }

    return {
      //TODO:  patch into _roles and assign the
      // appropriate role to the given scope
      addRole: function(role, scope){

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
       */
      ensureIsolate: function(scope) {
        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        return isolate;
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#registerChild
       * @module famous.angular
       * @description
       * Register a child isolate's renderNode to the nearest parent that can sequence
       * it.
       *
       * A `registerChild` event is sent upward with `scope.$emit`.
       *
       * @param {String} scope - the scope with an isolate to be sequenced.
       * @param {Object} isolate - an isolated scope object from $famousDecorator#ensureIsolate
       * @returns {void}
       */
      registerChild: function(scope, isolate) {
        scope.$emit('registerChild', isolate);
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#unregisterChild
       * @module famous.angular
       * @description
       * An `unregisterChild` event is sent upward with `scope.$emit` when a a directive element's
       * `$destroy` event occurs.
       *
       * @param {Object} element - the element to listen on
       * @param {String} scope - the scope to emit from
       * @param {Object} callback - an optional callback to invoke when the emission is complete
       * @returns {void}
       */
      unregisterChild: function(element, scope, callback) {
        var ensureIsolate = this.ensureIsolate;
        element.one('$destroy', function() {
          var isolate = ensureIsolate(scope);

          if ('removeMethod' in isolate) {
            isolate.removeMethod(isolate.id);
          }

          // Invoke the callback, if provided
          callback && callback();
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
      sequenceWith: function(scope, addMethod, removeMethod) {
        scope.$on('registerChild', function(evt, data) {
          if (evt.targetScope.$id !== scope.$id) {
            addMethod(data);
            evt.stopPropagation();

            // Attach the remove method to the isolate, so it can be invoked without scope, if it is provided
            removeMethod && (data.removeMethod = removeMethod);
          }
        });
      }
    };
  });

