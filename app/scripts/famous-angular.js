'use strict';

var requirements = [
  "famous/core/Engine",
  "famous/core/Surface"
]


//declare the module before the async callback so that
//it will be accessible to other synchronously loaded angular
//components
var ngFameApp = angular.module('famous-angular', []);

require(requirements, function(/*args*/){
    //TODO:  give the context and the angular app separate divs to do their things

    //capture 'arguments' in a variable that will exist in
    //child scopes
    var required = arguments;
    
    //Declare this provider inside this file to avoid needing to deal with
    //AMD on any other angular files.  Alternative would be to
    //wrap other angular components in define() blocks (not the end of the world)
    ngFameApp.provider('famous', function () {
      // hash for storing modules
      var _modules = {};

      this.registerModule = function (key, module) {
        _modules[key] = module;
      };

      // Method that gets called when the 'famous'
      // service is injected in the normal course of the app
      this.$get = function () {
        return _modules;
      };
    });

    ngFameApp.config(function(famousProvider){
      for(var i = 0; i < requirements.length; i++)
        famousProvider.registerModule(requirements[i], required[i]);
      console.log('registered modules', famousProvider.$get());
    });

    if(window.famousAngularBootstrap){
      window.famousAngularBootstrap();
    }else{
      throw "window.famousAngularBootstrap callback not defined.  In order to work with famous-angular, you must define that callback function and bootstrap your app inside."
    }
    
  })
