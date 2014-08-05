// 'use strict';

window.$famousUtils = function() {
 
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;

  /**
   * Converts snake_case to camelCase.
   * Also there is special case for Moz prefix starting with upper case letter.
   * @param name Name to normalize
   */
  function camelCase(name) {
    return name.
      replace(SPECIAL_CHARS_REGEXP, function(_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
      }).
      replace(MOZ_HACK_REGEXP, 'Moz$1');
  }

  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  
  return {
    /**
     * @description Converts all accepted directives format into proper directive name.
     * All of these will become 'myDirective':
     *   my:Directive
     *   my-directive
     *   x-my-directive
     *   data-my:directive
     *
     * Also there is special case for Moz prefix starting with upper case letter.
     * @param name Name to normalize
     */
    directiveNormalize: function(name) {
        return camelCase(name.replace(PREFIX_REGEXP, ''));
    }
  };
}();
var ngFameApp = angular.module('famous.angular', ['ngTouch']);
