'use strict';



require.config({
  baseUrl: 'scripts'
})

require([
    "famous/core/Engine",
    "famous/core/Surface"
  ], function(famousCoreEngine, famousCoreSurface){
    alert('loaded!');
    //TODO:  give the context and the angular app separate divs to do their things
    //TODO:  write an angular provider that can accept all of these famous modules
    //       and store them away for future use by other app components
    angular.module('ngFame', []);
    //angular.bootstrap(document, ['ngFame'])
    var context = famousCoreEngine.createContext();
  })
