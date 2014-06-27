

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

      $q.all(templateRequests).then(function(templates) {
        angular.forEach(templates, function(template) {
          mainTemplate = mainTemplate.replace(statics[template.name], template.data);
        });
        deferred.resolve(mainTemplate);
      });

      return deferred.promise;
    }

    /**
     * Fetches a view template and returns the raw HTML as a promise.
     */

    function fetchTemplate(view, name) {

      var deferred = $q.defer();
      var template = {};

      if ( view.template.html ) { 
        template.name = name;
        template.data = view.template.html;
        deferred.resolve(template);
      } else if ( view.template.link ) {
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
      }

      return deferred.promise;

    }

    };

}]);