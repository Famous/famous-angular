angular.module('integrationApp',['famous.angular', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("main", {
        url: "/",
        templateUrl: "views/demo.html"
      })
      .state("timbre", {
        url: "/timbre",
        templateUrl: "views/timbre.html",
        controller: "TimbreCtrl"
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
      .state("repeat", {
        url: "/repeat",
        templateUrl: "views/repeat.html"
      })
      .state("reading", {
        url: "/reading",
        templateUrl: "views/reading.html"
      });
    });

window.famousAngularBootstrap = function(){
  angular.bootstrap(document, ['integrationApp']);
} 
