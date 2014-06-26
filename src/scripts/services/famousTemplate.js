

angular.module('famous.angular')
  .factory('$famousTemplate', ['$http', '$templateCache', '$q', function($http, $templateCache, $q){

    function resolveChildViews(mainTemplate, childViews) {

      var deferred = $q.defer();
      var templateRequests = [];
      var statics = {};

      angular.forEach(childViews, function(template) {
        var childName = template.name.split('@')[0];
        // TODO: Add a check to ensure the parent name matches the div tag (or not?)
        // var parentName = template.name.split('@')[1];
        // TODO: It should be possible to define distinct behavior for staticchild views.  In order to
        //       do this the fa-router-view cannot be replaced as it is currently (transclusion = true).
        //       Ideally, this should be broken out into a separate directive. 
        var target = '<div fa-router-view="' + childName + '"></div>';
        //TODO: Refactor so that the HTML only needs to be scanned one time
        if ( mainTemplate.indexOf(target) !== -1 ) {
          statics[childName] = target;
          templateRequests.push(fetchTemplate(template, childName));
        }
      });

    }



    };

}]);