angular.module('integrationApp',['famous.angular', 'ui.router', 'firebase'])
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
      })
      .state("modifiers", {
        url: "/modifiers",
        templateUrl: "views/modifiers.html"
      })
      .state("makemefamous", {
        url: "/makemefamous",
        templateUrl: "views/makemefamous.html"
      })
      .state("animations", {
        url: "/animations",
        templateUrl: "views/animations.html"
      })
      .state("reading", {
        url: "/reading",
        templateUrl: "views/reading.html"
      });
    });

window.famousAngularBootstrap = function(){
  angular.bootstrap(document, ['integrationApp']);
} 
