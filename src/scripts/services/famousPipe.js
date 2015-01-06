/**
 * @ngdoc service
 * @name $famousPipe
 * @module famous.angular
 * @description
 * Provides common helpers for the event pipe directives fa-pipe-from and fa-pipe-to.
 */

angular.module('famous.angular')
  .service('$famousPipe', function() {

    /**
     * @param {EventHandler|Array} pipes - pipes to negotatiate
     * @param {Engine|RenderNode|Array} targets - nodes to negotiate
     * @param {String} method - action to apply from targets to pipes, e.g. "pipe" or "unpipe"
     */
    function bulkUpdatePipes(pipes, targets, method) {
      if (! (pipes instanceof Array)) {
        pipes = [pipes];
      }

      if (! (targets instanceof Array)) {
        targets = [targets];
      }

      for (var i = 0; i < pipes.length; i++) {
        for (var j = 0; j < targets.length; j++) {
          if (targets[j] !== undefined && pipes[i] !== undefined) {
            if (targets[j]._isModifier){
              targets[j]._object[method](pipes[i]);
            } else {
              targets[j][method](pipes[i]);
            }
          }
        }
      }
    }

    /**
     * @ngdoc method
     * @name $famousPipe#unpipesFromTargets
     * @module famous.angular
     * @param {EventHandler|Array} pipes - pipes to unpipe
     * @param {Engine|RenderNode|Array} targets - nodes to unpipe from
     * @description
     * Unpipes the specified pipes from the specified targets.
     */
    this.unpipesFromTargets = function(pipes, targets) {
      bulkUpdatePipes(pipes, targets, "unpipe");
    };

    /**
     * @ngdoc method
     * @name $famousPipe#pipesToTargets
     * @module famous.angular
     * @param {EventHandler|Array} pipes - pipes to pipe
     * @param {Engine|RenderNode|Array} targets - nodes to pipe to
     * @description
     * Pipes the specified pipes to the specified targets.
     */
    this.pipesToTargets = function(pipes, targets) {
      bulkUpdatePipes(pipes, targets, "pipe");
    };
  });
