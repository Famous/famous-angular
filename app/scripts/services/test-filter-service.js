'use strict';

angular.module('integrationApp')
  .factory('testFilterService', function () {
    // Service logic
    // ...

    var _field = '';

    // Public API here
    return {
      getField: function(){
        return _field;
      },
      setField: function(v){
        _field = v;
      }
    };
  });
