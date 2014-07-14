/**
 * @ngdoc factory
 * @name $famousTemplateFactory
 * @module famous.angular
 * @description
 * This factory function is used to resolve templates and make the HTML available to the
 * fa-router directive during state transitions.
 */

angular.module('famous.angular')
  .factory('$famousTemplate', ['$http', '$templateCache', '$q', function($http, $templateCache, $q){


    /**
     * @description
     * Fetches the HTML for each of the child views and inserts it into the HTML of the main view
     * @param {Object} mainTemplate A view or state object containing a template property
     * @param {Object} childViews Contains all child view information {childName: template, childName: template}
     * @return {String} Returns the raw HTML of the main view, wrapped in a promise
     */

    function resolveChildViews(mainTemplate, childViews) {

      var deferred = $q.defer();
      var templateRequests = [];
      var statics = {};

      angular.forEach(childViews, function(template) {
        var childName = template.name.split('@')[0];
        // TODO: Add a check to ensure the parent name matches the div tag (or not?)
        // var parentName = template.name.split('@')[1];
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
     * Fetches a view template
     * @param {Object} view A view or state object containing a template property
     * @param {String} name The name associated with the provided state or view
     * @return {Object} Returns a template object wrapped in a promise
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

    return {

      /**
       * @ngdoc method
       * @name $famousTemplate#resolve
       * @module famous.angular
       * 
       * @description
       * Accepts a state object with a views property.  Fetches the template for the main view and returns 
       * the raw HTML to be inserted into the application by the fa-router directive.  If any static child views 
       * are defined, the templates for the child views are fetched and injected into the HTML of the main view
       * before it is returned.
       *
       * @param {Object} state The state for which the templates need to be fetched
       * @returns {Object} The raw HTML for the state, wrapped in a promise
       *  
       * @usage 
       * 
       * ```js
       * $famousTemplate.resolve($famousState.$current)
       * .then(function(template){
       *   $famousState.$current.$template = template;
       *   $rootScope.$broadcast('$stateChangeSuccess');
       *   if ( !!$famousState.$current.url ) { 
       *     $location.path($famousState.$current.url); }
       * });
       * ```
       */

      resolve: function(state) {

        var deferred = $q.defer();
        var mainView = state.views['@'];
        mainView.name = state.name;
        var childViews = [];

        angular.forEach(state.views, function(view, name) {
          if ( name !== '@' && name.indexOf('@') !== 1 ) {
            childViews.push({name: name, template: view.template});
          }
        });

        fetchTemplate(mainView, mainView.name)
        .then(function(mainTemplate) {
          if ( childViews.length > 0 ) {
            resolveChildViews(mainTemplate.data, childViews)
            .then(function(template){
              deferred.resolve(template);
            });
          } else {
            deferred.resolve(mainTemplate.data);
          }
        });

        return deferred.promise;

      }
    };

}]);
