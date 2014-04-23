'use strict';

angular.module('integrationApp')
  .filter('testFilter', function (testFilterService) {
    return function (input, field) {
      if(!input instanceof Array)
        throw 'testFilter expects an array'

      var ret = [];
      for(var i = 0; i < input.length; i++)
        if(input[i][field].toLowerCase().indexOf(testFilterService.getField().toLowerCase()) > -1)
          ret.push(input[i])

      return ret;
    };
  });
