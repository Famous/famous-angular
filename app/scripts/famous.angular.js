'use strict';

// Put angular bootstrap on hold
window.name = "NG_DEFER_BOOTSTRAP!" + window.name;

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
	"famous/events/EventArbiter",
	"famous/events/EventFilter",
	"famous/events/EventMapper",
	"famous/inputs/GenericSync",
	"famous/inputs/RotateSync",
	"famous/inputs/TouchSync",
	"famous/inputs/MouseSync",
	"famous/inputs/PinchSync",
	"famous/inputs/FastClick",
	"famous/surfaces/ImageSurface",
	"famous/surfaces/InputSurface",
	"famous/transitions/Easing",
	"famous/transitions/SpringTransition",
	"famous/transitions/Transitionable",
	"famous/utilities/Timer",
	"famous/views/Scrollview",
	"famous/views/Scroller",
	"famous/views/GridLayout"
]

require.config({
	baseUrl: "/scripts"
});

//declare the module before the async callback so that
//it will be accessible to other synchronously loaded angular
//components
var ngFameApp = angular.module('famous.angular', []);

require(requirements, function(/*args*/) {
	//capture 'arguments' in a variable that will exist in
	//child scopes
	var required = arguments;

	/**
	* @ngdoc provider
	* @name famousProvider
	* @module famous.angular
	* @description
	* This provider is loaded as an AMD module and will keep a reference on the complete Famo.us library.
	* We use this provider to avoid needing to deal with AMD on any other angular files.
	*
	* @usage
	* You probably won't have to configure this provider
	*
	* ```js
	* angular.module('mySuperApp', ['famous.angular']).config(
	*   function(famousProvider) {
	*
	*       // Register your modules
	*       famousProvider.registerModule('moduleKey', module);
	*
	*   };
	* });
	* ```
	*
	*/
	ngFameApp.provider('famous', function() {
		// hash for storing modules
		var _modules = {};

		/**
		 * @ngdoc method
		 * @name famousProvider#registerModule
		 * @module famous.angular
		 * @description
		 * Register the modules that will be available in the famous service
	     *
	     * @param {string} key the key that will be used to register the module
	     * @param {misc} module the data that will be returned by the service
		 */
		this.registerModule = function(key, module) {
			//TODO warning if the key is already registered ?
			_modules[key] = module;
		};

		//bag for holding references to declared elements,
		//accessible by those elements' ids
		//TODO:  break out into separate service?
		var _bag = {};
		_modules.bag = {
			_contents: _bag,
			register: function(id, ref) {
				if(_bag[id])
					_bag[id].push(ref)
				else
					_bag[id] = [ref];
			},
			first: function(id) {
				var arr = _bag[id];
				if(arr)
					return arr[0];
				return undefined;
			},
			all: function(id) {
				return _bag[id];
			}
		}

		this.$get = function() {

			/**
			 * @ngdoc service
			 * @name famous
			 * @module famous.angular
			 * @description
			 * This service gives you access to the complete Famo.us library.
			 *
			 * @usage
			 * Use this service to access the registered Famo.us modules as an object.
			 *
			 * ```js
			 * angular.module('mySuperApp', ['famous.angular']).controller(
			 *   function($scope, famous) {
			 *
			 *       // Access any registered module
			 *       var EventHandler = famous['famous/core/EventHandler'];
			 *       $scope.eventHandler = new EventHandler();
			 *
			 *   };
			 * });
			 * ```
			 *
			 */
			return _modules;
		};
	});

	ngFameApp.config(function(famousProvider) {
		for(var i = 0; i < requirements.length; i++) {
			famousProvider.registerModule(requirements[i], required[i]);
		}
//		console.log('registered modules', famousProvider.$get());
	});

	angular.element(document).ready(function() {
		angular.resumeBootstrap();
	});

})

angular.module('famous.angular')
  .factory('famousDecorator', function () {
    
    var _roles = {
      child: {

      },
      parent: {

      }
    }

    return {
      addRole: function(role, scope){

      },
      ensureIsolate: function(scope){
        scope.isolate = scope.isolate || {};
        scope.isolate[scope.$id] = scope.isolate[scope.$id] || {};

        //assign the scope $id to the isolate
        var isolate = scope.isolate[scope.$id];
        isolate.id = scope.$id;

        //assign default ng-repeat index if it exists
        //and index isn't already assigned
        var i = scope.$eval("$index");
        if(i && i !== '$index' && !isolate.index) isolate.index = i;

        return isolate;
      }
    };
  });

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
  .directive('faAnimation', function (famous, famousDecorator) {
    return {
      restrict: 'EA',
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        var Transform = famous['famous/core/Transform'];
        var Transitionable = famous['famous/transitions/Transitionable'];
        var Easing = famous['famous/transitions/Easing'];
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            setTimeout(function(){
              var timeline = scope.$eval(attrs.timeline);
              isolate._trans = new Transitionable(0);

              isolate.play = function(callback){
                var transition = {
                  duration: scope.$eval(attrs.duration),
                  curve: scope.$eval(attrs.curve) || 'linear'
                };
                isolate._trans.set(1, transition, callback);
                //TODO:  handle $animate with a callback
                //       support custom callbacks?
              }
              isolate.reset = function(){
                isolate._trans.set(0);
              }
              isolate.replay = function(callback){
                isolate.reset();
                isolate.play(callback);
              }

              //disengage will be a function that
              //unassigns the event listener
              var _disengage = undefined;
              console.log('event', attrs.event)
              if(attrs.event){
                if(_disengage)
                  _disengage();
                _disengage = scope.$on(attrs.event, function(evt, data){
                  var callback = data && data.callback ? data.callback : undefined;
                  isolate.replay(callback)
                })
              }

              //TODO:  support data-bound ids (supports only strings for now)
              //Possibly make "fa-id" for databound ids?
              //Register this modifier by ID in bag
              var id = attrs.id;
              famous.bag.register(id, isolate);

              if(timeline === undefined){
                timeline = isolate._trans.get.bind(isolate._trans);
                if(attrs.autoplay)
                  isolate.play();
              }
              if(!timeline instanceof Function)
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
                    
                    
                    _.each(modElements, function(modElement){
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
                          var x = timeline() || 0;
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
  });

angular.module('famous.angular')
  .directive('faApp', ["famous", "famousDecorator", function (famous, famousDecorator) {
    return {
      template: '<div style="display: none;"><div></div></div>',
      transclude: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            var View = famous['famous/core/View'];
            var Engine = famous['famous/core/Engine'];
            var Transform = famous['famous/core/Transform']

            
            element.append('<div class="famous-angular-container"></div>');
            var famousContainer = $(element.find('.famous-angular-container'))[0];
            scope.context = Engine.createContext(famousContainer);

            function AppView(){
              View.apply(this, arguments);
            }

            AppView.prototype = Object.create(View.prototype);
            AppView.prototype.constructor = AppView;

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            var getTransform = function(data) {
              var transforms = [];
              if (data.mod().translate && data.mod().translate.length) {
                var values = data.mod().translate.map(getOrValue)
                transforms.push(Transform.translate.apply(this, values));
              }
              if (scope["faRotateZ"])
                transforms.push(Transform.rotateZ(scope["faRotateZ"]));
              if (scope["faSkew"])
                transforms.push(Transform.skew(0, 0, scope["faSkew"]));
              return Transform.multiply.apply(this, transforms);
            };

            scope.view = new AppView();
            scope.context.add(scope.view);

            scope.$on('registerChild', function(evt, data){
              scope.view.add(data.renderNode);
              evt.stopPropagation();
            })
          },
          post: function(scope, element, attrs){
            transclude(scope, function(clone) {
              element.find('div div').append(clone);
            });
            scope.readyToRender = true;
          }
        }
      }
    };
  }]);

angular.module('famous.angular')
  .directive('faGridLayout', function (famous, famousDecorator, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var GridLayout = famous["famous/views/GridLayout"];
            var ViewSequence = famous['famous/core/ViewSequence'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new GridLayout(options);

            if (attrs.faPipeFrom) {
              (scope.$eval(attrs.faPipeFrom)).pipe(isolate.renderNode);
            }

            var updateGridLayout = function(){
              _children.sort(function(a, b){
                return a.index - b.index;
              });
              isolate.renderNode.sequenceFrom(_.map(_children, function(c){
                return c.renderNode
              }));
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateGridLayout();
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children = _.reject(_children, function(c){
                  return c.id === data.id
                });
                updateGridLayout();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            var id = attrs.id;
            famous.bag.register(id, isolate)
            scope.$emit('registerChild', isolate);
          }
        };
      }
    };
  });

angular.module('famous.angular')
  .directive('faImageSurface', function (famous, famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      template: '<div class="fa-image-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var ImageSurface = famous['famous/surfaces/ImageSurface'];
            var Transform = famous['famous/core/Transform']
            var EventHandler = famous['famous/core/EventHandler'];
            
            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties()
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            )

            isolate.getProperties = function(){
              return {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
              };
            };

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.renderNode = new ImageSurface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.renderNode.setClasses(attrs['class'].split(' '));

            if (attrs.faClick) {
              isolate.renderNode.on("click", function() {
                scope.$eval(attrs.faClick);
              });
            }

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            var updateContent = function(){
              isolate.renderNode.setContent(attrs.faImageUrl)
            };

            updateContent();

            attrs.$observe('faImageUrl', updateContent);

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.renderNode)

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faIndex', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function(){
              return scope.$eval(attrs.faIndex)
            }, function(){
              isolate.index = scope.$eval(attrs.faIndex)
            });
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faModifier', ["famous", "famousDecorator", function (famous, famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      restrict: 'EA',
      priority: 100,
      scope: true,
      compile: function(tElement, tAttrs, transclude){
        return {
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var RenderNode = famous['famous/core/RenderNode']
            var Modifier = famous['famous/core/Modifier']
            var Transform = famous['famous/core/Transform']

            var get = function(x) {
              if (x instanceof Function) return x();
              return x.get ? x.get() : x;
            };

            isolate.getTransform = function() {
              //var transforms = [Transform.translate(0, 0, 0)];
              var transforms = [];
              if (attrs.faTranslate) {
                var values = scope.$eval(attrs.faTranslate).map(get)
                transforms.push(Transform.translate.apply(this, values));
              }

              if (attrs.faRotateX){
                transforms.push(
                  Transform.rotateX(
                    get(
                      scope.$eval(attrs.faRotateX)
                    )
                  )
                );
              }

              if (attrs.faScale){
                var values = scope.$eval(attrs.faScale).map(get)
                transforms.push(Transform.scale.apply(this, values));
              }

              if (attrs.faRotateY) {
                transforms.push(
                  Transform.rotateY(
                    get(
                      scope.$eval(attrs.faRotateY)
                    )
                  )
                );
              }

              if (attrs.faRotateZ) {
                transforms.push(
                  Transform.rotateZ(
                    get(
                      scope.$eval(attrs.faRotateZ)
                    )
                  )
                );
              }

              if (attrs.faSkew) {
                transforms.push(
                  Transform.skew(0, 0, scope.$eval(attrs.faSkew))
                );
              }

              if(!transforms.length)
                return undefined;
              else if (transforms.length === 1)
                return transforms[0]
              else
                return Transform.multiply.apply(this, transforms);
            };

            isolate.getOpacity = function(){
              if (attrs.faOpacity)
                return get(scope.$eval(attrs.faOpacity));
              return 1;
            }

            
            isolate.modifier = new Modifier({
              transform: isolate.getTransform,
              size: scope.$eval(attrs.faSize),
              opacity: isolate.getOpacity,
              origin: scope.$eval(attrs.faOrigin)
            });

            isolate.renderNode = new RenderNode().add(isolate.modifier)

            scope.$on('$destroy', function() {
              isolate.modifier.setOpacity(0);
              scope.$emit('unregisterChild', {id: scope.$id});
            });
            
            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id !== evt.currentScope.$id){
                isolate.renderNode.add(data.renderNode);
                evt.stopPropagation();
              }
            })

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate)

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);



angular.module('famous.angular')
  .directive('faPipeTo', function (famous, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function() {
        var Engine = famous['famous/core/Engine'];
        
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);
            scope.$watch(
              function(){
                return scope.$eval(attrs.faPipeTo);
              },
              function(newPipe, oldPipe){
                console.log('updating pipes')
                var target = isolate.renderNode || Engine;
                if(oldPipe instanceof Array){
                  for(var i = 0; i < oldPipe.length; i++){
                    target.unpipe(oldPipe[i]);
                  }
                }else if(oldPipe !== undefined){
                  target.unpipe(oldPipe);
                }

                if(newPipe instanceof Array){
                  for(var i = 0; i < newPipe.length; i++){
                    target.pipe(newPipe[i]);
                  }
                }else if(newPipe !== undefined){
                  target.pipe(newPipe);
                }
              }
            );
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faPresenter', function ($controller) {
    return {
      restrict: 'A',
      scope: false,
      priority: 1001,
      compile: function(tElement, tAttrs, transclude) {
        return {
          pre: function(scope, element, attrs){
            //TODO:  fa-presenter might be able to sit elsewhere
            //  in the compilation cycle, probably right as the post-compile
            //  fires. (probably call it at the beginning of each component's
            //  post-compile fn)
            //  This would give the advantage/feature of being able to address
            //  elements by their identifiers using HTML selectors
            //  (this may be a good way to pass references from
            //  the views/DOM to the controllers)
          },
          post: function(scope, element, attrs){
            if(attrs.faPresenter)
              $controller(attrs.faPresenter, {'$scope': scope})
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faRenderNode', ["famous", "famousDecorator", function (famous, famousDecorator) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            var Engine = famous['famous/core/Engine'];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.children = [];

            attrs.$observe('faPipeTo', function(val){
              var pipeTo = scope.$eval(val);
              if(pipeTo)
                Engine.pipe(pipeTo);
            })

            isolate.renderNode = scope.$eval(attrs.faNode);

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);





angular.module('famous.angular')
  .directive('faScrollView', function (famous, famousDecorator, $timeout, $controller) {
    return {
      template: '<div></div>',
      restrict: 'E',
      transclude: true,
      scope: true,
      compile: function(tElem, tAttrs, transclude){
        return  {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var ScrollView = famous["famous/views/Scrollview"];
            var ViewSequence = famous['famous/core/ViewSequence'];
            var Surface = famous['famous/core/Surface'];

            var _children = [];

            var options = scope.$eval(attrs.faOptions) || {};
            isolate.renderNode = new ScrollView(options);

            if (attrs.faPipeFrom) {
              (scope.$eval(attrs.faPipeFrom)).pipe(isolate.renderNode);
            }

            var updateScrollview = function(init){
              //$timeout hack used here because the
              //updateScrollview function will get called
              //before the $index values get re-bound
              //through ng-repeat.  The result is that
              //the items get sorted here, then the indexes
              //get re-bound, and thus the results are incorrectly
              //ordered.
              $timeout(function(){
                _children.sort(function(a, b){
                  return a.index - b.index;
                }); 

                var options = {
                  array: _.map(_children, function(c){ return c.renderNode }) 
                };
                //set the first page on the scrollview if
                //specified
                if(init)
                  options.index = scope.$eval(attrs.faStartIndex);
                
                var viewSeq = new ViewSequence(options);
                isolate.renderNode.sequenceFrom(viewSeq);

              })
            }

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children.push(data);
                updateScrollview(true);
                evt.stopPropagation();
              };
            });

            scope.$on('unregisterChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                _children = _.reject(_children, function(c){
                  return c.id === data.id
                });
                updateScrollview();
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.renderNode)
            scope.$emit('registerChild', isolate);

          }
        };
      }
    };
  });

angular.module('famous.angular')
  .directive('faSurface', function (famous, famousDecorator, $interpolate, $controller, $compile) {
    return {
      scope: true,
      transclude: true,
      template: '<div class="fa-surface"></div>',
      restrict: 'EA',
      compile: function(tElem, tAttrs, transclude){
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var Surface = famous['famous/core/Surface'];
            var Transform = famous['famous/core/Transform']
            var EventHandler = famous['famous/core/EventHandler'];
            
            //update properties
            //TODO:  is this going to be a bottleneck?
            scope.$watch(
              function(){
                return isolate.getProperties()
              },
              function(){
                if(isolate.renderNode)
                  isolate.renderNode.setProperties(isolate.getProperties());
              },
              true
            )

            isolate.getProperties = function(){
              return {
                backgroundColor: scope.$eval(attrs.faBackgroundColor),
                color: scope.$eval(attrs.faColor)
              };
            };

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            //TODO: $observe attributes and pass updated values
            // into variables that are returned by functions that
            // can then be passed into modifiers

            var modifiers = {
              origin: scope.$eval(attrs.faOrigin),
              translate: scope.$eval(attrs.faTranslate),
              rotateZ: scope.$eval(attrs.faRotateZ),
              skew: scope.$eval(attrs.faSkew)
            };

            isolate.renderNode = new Surface({
              size: scope.$eval(attrs.faSize),
              class: scope.$eval(attrs.class),
              properties: isolate.getProperties()
            });

            //TODO:  support ng-class
            if(attrs.class)
              isolate.renderNode.setClasses(attrs['class'].split(' '));

            isolate.modifier = function() {
              return modifiers;
            };

            if (attrs.faClick) {
              isolate.renderNode.on("click", function() {
                scope.$eval(attrs.faClick);
              });
            }

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            var updateContent = function(){
              var compiledEl = isolate.compiledEl = isolate.compiledEl || $compile(element.find('div.fa-surface').contents())(scope)
              isolate.renderNode.setContent(isolate.compiledEl.context);
            };

            updateContent();

            //boilerplate
            transclude(scope, function(clone) {
              element.find('div.fa-surface').append(clone);
            });

            //TODO:  support data-bound ids (supports only strings for now)
            //Possibly make "fa-id" for databound ids?
            //Register this modifier by ID in bag
            var id = attrs.id;
            famous.bag.register(id, isolate.renderNode)

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faTap', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTap) {
              var _dragging = false;

              //TODO:  refactor to isolate.renderNode
              var renderNode = isolate.renderNode
              renderNode.on("touchmove", function(data) {
                _dragging = true;
                return data;
              });

              renderNode.on("touchend", function(data) {
                if (!_dragging){
                  var fn = $parse(attrs.faTap);
                  fn(scope, {$event:data});
                  if(!scope.$$phase)
                    scope.$apply();
                }
                _dragging = false
              });
            }
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faTouchend', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchEnd) {
              isolate.renderNode.on("touchend", function(data) {
                var fn = $parse(attrs.faTouchMove);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });


            }
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faTouchmove', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchMove) {
              isolate.renderNode.on("touchmove", function(data) {
                var fn = $parse(attrs.faTouchMove);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
      }
    };
  });




angular.module('famous.angular')
  .directive('faTouchstart', function ($parse, famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      compile: function() {
        return { 
          post: function(scope, element, attrs) {
            var isolate = famousDecorator.ensureIsolate(scope);

            if (attrs.faTouchStart) {
              isolate.renderNode.on("touchstart", function(data) {
                var fn = $parse(attrs.faTouchStart);
                fn(scope, {$event:data});
                if(!scope.$$phase)
                  scope.$apply();
              });
            }
          }
        }
      }
    };
  });



angular.module('famous.angular')
  .directive('faView', ["famous", "famousDecorator", "$controller", function (famous, famousDecorator, $controller) {
    return {
      template: '<div></div>',
      transclude: true,
      scope: true,
      restrict: 'EA',
      compile: function(tElement, tAttrs, transclude){
        var View = famous['famous/core/View'];
        
        return {
          pre: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);

            isolate.children = [];

            var getOrValue = function(x) {
              return x.get ? x.get() : x;
            };

            isolate.renderNode = new View({
              size: scope.$eval(attrs.faSize) || [undefined, undefined]
            });

            scope.$on('$destroy', function() {
              scope.$emit('unregisterChild', {id: scope.$id});
            });

            scope.$on('registerChild', function(evt, data){
              if(evt.targetScope.$id != scope.$id){
                isolate.renderNode.add(data.renderNode);
                isolate.children.push(data);
                evt.stopPropagation();
              }
            })

          },
          post: function(scope, element, attrs){
            var isolate = famousDecorator.ensureIsolate(scope);
            
            transclude(scope, function(clone) {
              element.find('div').append(clone);
            });

            scope.$emit('registerChild', isolate);
          }
        }
      }
    };
  }]);
