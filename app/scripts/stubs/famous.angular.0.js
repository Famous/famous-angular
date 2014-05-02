//TODO:  the templates for the first and last segments of
//       the compiled famous.angular.js file sit in separate
//       files (in app/scripts/stubs.)  Rather than maintain
//       this structure, probably should put together a
//       placeholder-replacement step in gulp instead of 
//       concatenating files like this.

'use strict';

//TODO:  Ensure that this list stays up-to-date with
//       the filesystem (maybe write a bash script
//       working around `ls -R1 app/scripts/famous` ?)
var requirements = [
  "famous/core/Engine",
  "famous/core/EventHandler",
  "famous/core/EventEmitter",
  "famous/core/Modifier",
  "famous/core/RenderNode",
  "famous/core/Surface",
  "famous/core/Transform",
  "famous/core/View",
  "famous/core/ViewSequence",
  "famous/inputs/GenericSync",
  "famous/inputs/RotateSync",
  "famous/inputs/TouchSync",
  "famous/inputs/MouseSync",
  "famous/inputs/PinchSync",
  "famous/inputs/FastClick",
  "famous/transitions/Easing",
  "famous/transitions/SpringTransition",
  "famous/transitions/Transitionable",
  "famous/utilities/Timer",
  "famous/views/ScrollView",
  "famous/views/GridLayout",
]

//declare the module before the async callback so that
//it will be accessible to other synchronously loaded angular
//components
var ngFameApp = angular.module('famous.angular', []);

require(requirements, function(/*args*/){
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

      //bag for holding references to declared elements,
      //accessible by those elements' ids
      //TODO:  break out into separate service?
      var _bag = {};
      _modules.bag = {
        _contents: _bag,
        register: function(id, ref){
          if(_bag[id])
            _bag[id].push(ref)
          else
            _bag[id] = [ref];
        },
        first: function(id){
          var arr = _bag[id];
          if(arr)
            return arr[0];
          return undefined;
        },
        all: function(id){
          return _bag[id];
        }
      }

      // Method that gets called when the 'famous'
      // service is injected in the normal course of the app
      this.$get = function () {
        return _modules;
      };
    });

