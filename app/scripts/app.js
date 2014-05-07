angular.module('integrationApp',['famous.angular', 'ui.router', 'ngAnimate'])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("main", {
        url: "/",
        templateUrl: "views/animations.html"
      })
      .state("timbre", {
        url: "/timbre",
        templateUrl: "views/timbre.html",
        controller: "TimbreCtrl"
      })
      .state("lock-screen", {
        url: "/lock-screen",
        templateUrl: "views/lock-screen.html",
        controller: "LockScreenCtrl"
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
      .state("demo", {
        url: "/demo",
        templateUrl: "views/demo.html"
      })

      .state("reading", {
        url: "/reading",
        templateUrl: "views/reading.html"
      });
    });