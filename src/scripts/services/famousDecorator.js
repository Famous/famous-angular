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
       *
       * @usage
       *
       * ```js
       * var isolate = $famousDecorator.ensureIsolate($scope);
       * ```
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
       * A `registerChild` event is sent upward with `scope.$emit` starting from scope.$parent
       * to ensure we never add an isolate's renderNode to its own sequence.
       *
       * @param {String} scope - the scope with an isolate to be sequenced.
       * @param {Object} isolate - an isolated scope object from $famousDecorator#ensureIsolate
       *
       * @usage
       *
       * ```js
       * $famousDecorator.registerChild($scope, isolate);
       * ```
       */
      registerChild: function(scope, isolate) {
        scope.$emit('registerChild', isolate);
      },

      /**
       * @ngdoc method
       * @name $famousDecorator#sequenceWith
       * @module famous.angular
       * @description
       * Attach a listener to a scope for
       *
       * A `registerChild` event is sent upward with `scope.$emit` starting from scope.$parent
       * to ensure we never add an isolate's content to its own sequence.
       *
       * @param {String} scope - the scope to listen on
       * @param {Object} method - the method to apply to the incoming isolate's content to add it
       * to the sequence
       *
       * @usage
       *
       * ```js
       * $famousDecorator.sequenceWith($scope, isolate.renderNode.add);
       * ```
       */
      sequenceWith: function(scope, method) {
        scope.$on('registerChild', function(evt, data) {
          if (evt.targetScope.$id !== scope.$id) {
            method(data);
            evt.stopPropagation();
          }
        });
      }
    };
  });

