/**
 * @ngdoc directive
 * @name faAnimation
 * @module famous.angular
 * @restrict EA
 * @description
 * This directive is used to animate an element in conjunction with an {@link api/directive/animate animate} directive
 *
 * @usage
 * ```html
 * <fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
 *  <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
 * </fa-animation>
 * ```
 */

angular.module('famous.angular')
  .directive('faAnimation', ['$famous', '$famousDecorator', function ($famous, famousDecorator) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var Easing = $famous['famous/transitions/Easing'];
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            setTimeout(function(){
              isolate.timeline = scope.$eval(attrs.timeline);
              isolate._trans = new Transitionable(0);

              isolate.play = function(callback){
                var transition = {
                  duration: scope.$eval(attrs.duration),
                  curve: scope.$eval(attrs.curve) || 'linear'
                };
                isolate._trans.set(1, transition, function(){
                  if(callback)
                    callback();
                  if(attrs.loop){
                    //Famo.us silently breaks its transitionable if this runs in
                    //the same execution context.  Maybe a suppressed SO error somewhere?
                    setTimeout(function(){isolate.replay(callback)}, 0);
                  }
                });
                //TODO:  handle $animate with a callback
              }
              isolate.reset = function(){
                isolate._trans.set(0);
              }
              isolate.replay = function(callback){
                isolate.reset();
                isolate.play(callback);
              }

              //disengage is a function that
              //can unassign the event listener
              var _disengage = undefined;
              if(attrs.event){
                if(_disengage)
                  _disengage();
                _disengage = scope.$on(attrs.event, function(evt, data){
                  var callback = data && data.callback ? data.callback : undefined;
                  isolate.replay(callback)
                })
              }

              var id = attrs.id;

              if(isolate.timeline === undefined){
                isolate.timeline = isolate._trans.get.bind(isolate._trans);
                if(attrs.autoplay)
                  isolate.play();
              }
              if(!isolate.timeline instanceof Function)
                throw 'timeline must be a reference to a function or duration must be provided';

	            /**
	             * @ngdoc directive
	             * @name animate
	             * @module famous.angular
	             * @restrict E
	             * @description
	             * This directive is used to specify the animation of an element in a {@link api/directive/faAnimation faAnimation} directive
	             *
	             * @usage
	             * ```html
	             * <fa-animation timeline="functionThatReturnsATimelineValueBetween0And1">
	             *  <animate targetModSelector="#topMod" field="rotateX" startValue="3.1415" endValue="0" curve="inQuad" timelineLowerBound="0" timelineUpperBound=".25" />
	             * </fa-animation>
	             * ```
	             */

              var animates = element.find('animate');
              var declarations = {};

              for(var i = 0; i < animates.length; i++){
                (function(){
                  var animate = animates[i];

                  //DOM selector string that points to our mod of interest
                  if(animate.attributes['targetmodselector']){
                    //dig out the reference to our modifier
                    //TODO:  support passing a direct reference to a modifier
                    //       instead of performing a DOM lookup
                    var modElements = element.parent().find(
                      animate.attributes['targetmodselector'].value
                    );
                    
                    
                    angular.forEach(modElements, function(modElement){
                      var modScope = angular.element(modElement).scope();
                      var modifier = modScope.isolate[modScope.$id].modifier;
                      var getTransform = modScope.isolate[modScope.$id].getTransform;

                      //TODO:  won't need to special-case curve type 'linear'
                      //       once/if it exists in Easing.js
                      var curve =
                        animate.attributes['curve'] &&
                        animate.attributes['curve'].value !== 'linear' 
                        ? Easing[animate.attributes['curve'].value]
                        : function(j) {return j;}; //linear

                      //assign the modifier functions
                      if(animate.attributes['field']){
                        var field = animate.attributes['field'].value;

                        var lowerBound =
                        animate.attributes['timelinelowerbound']
                          ? parseFloat(animate.attributes['timelinelowerbound'].value)
                          : 0;

                        var upperBound =
                          animate.attributes['timelineupperbound']
                          ? parseFloat(animate.attributes['timelineupperbound'].value)
                          : 1;

                        if(!animate.attributes['startvalue'])
                          throw 'you must provide a start value for the animation'
                        var startValue = scope.$eval(animate.attributes['startvalue'].value);

                        if(!animate.attributes['endvalue'])
                          throw 'you must provide an end value for the animation'
                        var endValue = scope.$eval(animate.attributes['endValue'].value);

                        //Keep arrays of all declarations so that transformFunctions
                        //can handle all of the appropriate segments

                        var modDecs =
                          declarations[modScope.$id] =
                          declarations[modScope.$id] || {};
                        var segments = modDecs[field] = modDecs[field] || [];
                        segments.push({
                          field: field,
                          lowerBound: lowerBound,
                          upperBound: upperBound,
                          startValue: startValue,
                          endValue: endValue,
                          curve: curve
                        });

                        //Keep modDecs[field] sorted
                        segments.sort(function(a, b){
                          return a.lowerBound - b.lowerBound;
                        });

                        //Check domain overlap:
                        //after sorting by lowerBounds, if any segment's lower bound
                        //is lower than the lower bound of any item before it, domains are
                        //overlapping
                        for(var j = 1; j < segments.length; j++){
                          var lower = segments[j].lowerBound;
                          for(var k = 0; k < j; k++){
                            if(lower < segments[k].upperBound){
                              throw "Animate segments have overlapping \
                                domains for the same field (" + field + "). \
                                At any point in the timeline, only one <animate> \
                                can affect a given field on the same modifier."
                            }
                          }
                        }


                        //Domain:  timeline function bounded [0,1]
                        //Subdomains (between pipes):  specified subdomains of timeline segments
                        //Range:  output value, determined by interpolating startValue and
                        //        endValue through the easing curves.
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
                        //       this function needs to be exposed somehow. (pass a reference into the directive;
                        //       and then assign this function to that reference?)
                        //TODO:  if needed:  make this more efficient.  This is a hot-running
                        //       function and we should be able to optimize.
                        var transformFunction = function(){
                          var x = isolate.timeline() || 0;
                          var relevantIndex = 0;
                          var relevantSegment = segments[relevantIndex];

                          for(var j = 0; j < segments.length; j++){
                            //this is the relevant segment if x is in the subdomain
                            if(x >= segments[j].lowerBound && x <= segments[j].upperBound){
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if it is the last one
                            if(j === segments.length - 1){
                              relevantSegment = segments[j];
                              break;
                            }
                            //this is the relevant segment if x is greater than its upper
                            //bound but less than the next segment's lower bound
                            if(x >= segments[j].upperBound && x < segments[j + 1].lowerBound){
                              relevantSegment = segments[j];
                              break;
                            }
                          }

                          if(x <= relevantSegment.lowerBound)
                            return relevantSegment.startValue;
                          if(x >= relevantSegment.upperBound)
                            return relevantSegment.endValue; 
                          //normalize our domain to [0, 1]
                          var subDomain = (relevantSegment.upperBound - relevantSegment.lowerBound)
                          var normalizedX = (x - relevantSegment.lowerBound) / subDomain;

                          //Support interpolating multiple values, e.g. for a Scale array [x,y,z]
                          if(Array.isArray(relevantSegment.startValue)){
                            var ret = [];
                            for(var j = 0; j < relevantSegment.startValue.length; j++){
                              ret.push(
                                relevantSegment.startValue[j] + relevantSegment.curve(normalizedX)
                                *
                                (relevantSegment.endValue[j] - relevantSegment.startValue[j])
                              );
                            }
                            return ret;
                          }else{
                            return relevantSegment.startValue
                              + relevantSegment.curve(normalizedX)
                              * (relevantSegment.endValue
                              - relevantSegment.startValue);
                          }
                        };

                        var transformComponents = modDecs.transformComponents = modDecs.transformComponents || [];

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
                          transformComponents.push({
                            field: field,
                            fn: transformFunction
                          })

                          modifier.transformFrom(function(){

                            var mult = getTransform && getTransform() ? [getTransform()] : [];
                            for(var j = 0; j < transformComponents.length; j++){
                              ((function(){
                                var transVal = transformComponents[j].fn();
                                var f = transformComponents[j].field;
                                if(Array.isArray(transVal))
                                  mult.push(Transform[f].apply(this, transVal));
                                else
                                  mult.push(Transform[f](transVal));  
                              })());
                            }

                            //Transform.multiply fails on arrays of <=1 matricies
                            if(mult.length === 1)
                              return mult[0]
                            else
                              return Transform.multiply.apply(this, mult);
                          });
                        }
                      }
                    });
                  }

                })();
                
              }
            }, 1)//end setTimeout
          }

        }

      }
    };
  }]);
