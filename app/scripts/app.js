angular.module('integrationApp',['famous.angular', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("main", {
        url: "/",
        templateUrl: "views/main.html"
      })
      .state("demo", {
        url: "/demo",
        templateUrl: "views/demo.html"
      });
    });

window.famousAngularBootstrap = function(){
  angular.bootstrap(document, ['integrationApp']);
} 