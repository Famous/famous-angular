'use strict';

angular.module('integrationApp')
  .directive('faAnimation', function () {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var timeline = scope.$eval(attrs.timeline)
            if(!timeline instanceof Function)
              throw 'timeline must be a reference to a function';

            var animates = element.find('animate');

            for(var i = 0; i < animates.length; i++){
              var animate = animates[i];

              console.log('animate', animate);

              //DOM selector string that points to our mod of interest
              if(animate.attributes['targetmodselector']){
                var modScope = angular.element(animate.attributes['targetmodselector'].value).scope();
                var modifier = modScope.isolate[modScope.$id].modifier;
                //TODO:  support multiple fields on a given modifier


              }


            }
          },
          post: function(scope, element, attrs){

          }
        }
      }
    };
  });
