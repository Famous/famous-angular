'use strict';

angular.module('integrationApp')
  .directive('faAnimation', function (famous) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        var Transform = famous['famous/core/Transform'];
        var Easing = famous['famous/transitions/Easing'];
        console.log(Easing)
        return {
          pre: function(scope, element, attrs){
            var timeline = scope.$eval(attrs.timeline)
            if(!timeline instanceof Function)
              throw 'timeline must be a reference to a function';

            var animates = element.find('animate');
            var declarations = {};

            for(var i = 0; i < animates.length; i++){
              (function(){
                var animate = animates[i];

                //DOM selector string that points to our mod of interest
                if(animate.attributes['targetmodselector']){
                  //dig out the reference to our modifier
                  //TODO:  support passing a direct reference to a modifier instead of performing
                  //       a DOM lookup
                  var modElement = element.parent().find(animate.attributes['targetmodselector'].value);
                  var modScope = angular.element(modElement).scope();
                  var modifier = modScope.isolate[modScope.$id].modifier;

                  var curve = animate.attributes['curve'] && animate.attributes['curve'].value !== 'linear' 
                    ? Easing[animate.attributes['curve'].value]
                    : function(j) {return j;}; //linear

                  //assign the modifier functions
                  if(animate.attributes['field']){
                    var field = animate.attributes['field'].value;
                    var lowerBound = animate.attributes['timelinelowerbound']
                      ? parseFloat(animate.attributes['timelinelowerbound'].value)
                      : 0;
                    var upperBound = animate.attributes['timelineupperbound']
                      ? parseFloat(animate.attributes['timelineupperbound'].value)
                      : 1;
                    if(!animate.attributes['startvalue'])
                      throw 'you must provide a start value for the animation'
                    var startValue = scope.$eval(animate.attributes['startvalue'].value);

                    if(!animate.attributes['endvalue'])
                      throw 'you must provide an end value for the animation'
                    var endValue = scope.$eval(animate.attributes['endValue'].value);

                    //Keep arrays of all declarations so that transformFunctions can handle
                    //all of the appropriate segments
                    var modDecs = declarations[modScope.$id] = declarations[modScope.$id] || {};
                    var segments = modDecs[field] = modDecs[field] || [];
                    segments.push({
                      lowerBound: lowerBound,
                      upperBound: upperBound,
                      startValue: startValue,
                      endValue: endValue
                    });

                    //Keep modDecs[field] sorted
                    segments.sort(function(a, b){
                      return b.lowerBound - a.lowerBound;
                    });

                    //Check domain overlap:
                    //after sorting by lowerBounds, if upperBounds are not monotonic,
                    //there's an overlap in domains, which is unsupportable.  Throw.
                    var lastUp = segments[0].upperBound;
                    for(var j = 1; j < modDecs[field].length; j++){
                      var newUp = segments[j];
                      if(newUp < lastUp)
                        throw "Animate segments have overlapping domains for the same field (" + field + "). "
                              + " At any point in the timeline, only one <animate> can affect a given field on the same modifier."
                    }


                    //Domain:  timeline function bounded (0,1)
                    //Subdomains (between pipes):  specified subdomains from timeline segments
                    //Range:  output value, determined by interpolating startValue and endValue
                    //        through the easing curves
                    //     |          |                       |          |
                    //     |          |                       |          |
                    //     |          |                       |          |
                    //     |          |                       |          |           
                    //     |  (ease)  |                       |  (ease)  |
                    //     |        -/|-----------------------|-\        |
                    //     |      -/  |                       |  -\      |
                    //     |    -/    |                       |    -\    |
                    //     |  -/      |                       |      -\  |
                    // ----|-/        |                       |        -\|-------
                    //     |          |                       |          |
                    //_____|__________|_______________________|__________|_______
                    //     |x(0,0)    |x(0,1)                 |x(1,0)    |x(1,1)


                    //TODO:  in order to support nested fa-animation directives,
                    //       this function needs to be exposed somehow.
                    var transformFunction = function(){
                      var x = timeline();
                      var relevantIndex = 0;
                      var relevantSegment = segments[relevantIndex];
                      while(x < relevantSegment.upperBound && relevantIndex < segments.length){
                        relevantIndex++;
                        relevantSegment = segments[relevantIndex];
                      }

                      if(x <= relevantSegment.lowerBound)
                        return relevantSegment.startValue;
                      if(x >= relevantSegment.upperBound)
                        return relevantSegment.endValue; 
                      //normalize our domain to [0, 1]
                      var subDomain = (relevantSegment.upperBound - relevantSegment.lowerBound)
                      var normalizedX = (x - relevantSegment.lowerBound) / subDomain;

                      return relevantSegment.startValue + curve(normalizedX) * (relevantSegment.endValue - relevantSegment.startValue);
                    };

                    if(field === 'opacity'){
                      modifier.opacityFrom(function(){
                        return transformFunction();
                      });
                    }else if (field === 'origin'){
                      modifier.originFrom(function(){
                        return transformFunction();
                      });
                    }else if (field === 'size'){
                      modifier.sizeFrom(function(){
                        return transformFunction();
                      });
                    }else{ //transform field
                      //TODO:  support multiple transform fields
                      modifier.transformFrom(function(){
                        return Transform[field](transformFunction());
                      });
                    }
                  }
                }
              })();
            }
          },
          post: function(scope, element, attrs){

          }
        }
      }
    };
  });
