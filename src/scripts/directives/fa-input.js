'use strict';
/**
 * @ngdoc directive
 * @name ngClick
 * @module famous.angular
 * @restrict A
 * 
 * @description
 * This is a wrapped for the default ngClick which allows you to specify custom behavior when an fa-surface is clicked.
 * the wrapper is also designed to be be used on touchscreen devices. It matches all the features supported by ngClick, 
 * including ngTouch module for all types of fa-surface. 
 * 
 * If ngTouch is requried to add touch click capabilites in non F/A elements. Add ngTouch dependence before adding famous.angular otherwise 
 * this functionality will be lost.
 *
 * @usage
 * ```html
 * <ANY ng-click="expression">
 *
 * </ANY>
 * ```
 * @example
 * ### ng-click on an fa-surface
 * `ng-click` can be used on an `fa-surface`.  Internally, a Famous Surface has a `.on()` method that binds a callback function to an event type handled by that Surface.
 *  The function expression bound to `ng-click` is bound to that `fa-surface`'s click eventHandler, and when the `fa-surface` is clicked, the function expression will be called. 
 *
 * ```html
 * <fa-modifier fa-size="[100, 100]">
 *   <fa-surface ng-click="myClickHandler($event)" fa-background-color="'red'"></fa-surface>
 * </fa-modifier>
 * ```
 * ```javascript
 * $scope.myClickHandler = function($event) {
 *   console.log("click");
 *   console.log($event);
 * };
 * 
**/
angular.module('famous.angular')
.config(function  ($provide) {
  
  $provide.decorator('ngClickDirective', function ($delegate, $famousDecorator, $parse, $rootElement, $famous, $timeout) {
    var directive = $delegate[0];

    var compile = directive.compile;
    
    var TAP_DURATION = 750; // Shorter than 750ms is a tap, longer is a taphold or drag.
    var MOVE_TOLERANCE = 12; // 12px seems to work in most mobile browsers.
    var PREVENT_DURATION = 2500; // 2.5 seconds maximum from preventGhostClick call to click
    var CLICKBUSTER_THRESHOLD = 25; // 25 pixels in any dimension is the limit for busting clicks.

    var ACTIVE_CLASS_NAME = 'ng-click-active';
    var lastPreventedTime;
    var touchCoordinates;
    var lastLabelClickCoordinates;

    var Engine = $famous['famous/core/Engine'];

    // Checks if the coordinates are close enough to be within the region.
    function hit(x1, y1, x2, y2) {
      return Math.abs(x1 - x2) < CLICKBUSTER_THRESHOLD && Math.abs(y1 - y2) < CLICKBUSTER_THRESHOLD;
    }

    // Checks a list of allowable regions against a click location.
    // Returns true if the click should be allowed.
    // Splices out the allowable region from the list after it has been used.
    function checkAllowableRegions(touchCoordinates, x, y) {
      for (var i = 0; i < touchCoordinates.length; i += 2) {
        if (hit(touchCoordinates[i], touchCoordinates[i+1], x, y)) {
          touchCoordinates.splice(i, i + 2);
          return true; // allowable region
        }
      }
      return false; // No allowable region; bust it.
    }

    // Global click handler that prevents the click if it's in a bustable zone and preventGhostClick
    // was called recently.
    function onClick(event) {
      if (Date.now() - lastPreventedTime > PREVENT_DURATION) {
        return; // Too old.
      }

      var touches = event.touches && event.touches.length ? event.touches : [event];
      var x = touches[0].clientX;
      var y = touches[0].clientY;
     

      // Look for an allowable region containing this click.
      // If we find one, that means it was created by touchstart and not removed by
      // preventGhostClick, so we don't bust it.
      if (checkAllowableRegions(touchCoordinates, x, y)) {
        return;
      }

      // If we didn't find an allowable region, bust the click.
      event.stopPropagation();
      event.preventDefault();

      // Blur focused form elements
      if(event.target) {
        event.target.blur();
      }
    }


    // Global touchstart handler that creates an allowable region for a click event.
    // This allowable region can be removed by preventGhostClick if we want to bust it.
    function onTouchStart(event) {
      var touches = event.touches && event.touches.length ? event.touches : [event];
      var x = touches[0].clientX;
      var y = touches[0].clientY;
      touchCoordinates.push(x, y);

      $timeout(function() {
        // Remove the allowable region.
        for (var i = 0; i < touchCoordinates.length; i += 2) {
          if (touchCoordinates[i] === x && touchCoordinates[i+1] === y) {
            touchCoordinates.splice(i, i + 2);
            return;
          }
        }
      }, PREVENT_DURATION, false);
    }

    // On the first call, attaches some event handlers. Then whenever it gets called, it creates a
    // zone around the touchstart where clicks will get busted.
    function preventGhostClick(x, y) {
      if (!touchCoordinates) {
        $rootElement[0].addEventListener('click', onClick, true);
        $rootElement[0].addEventListener('touchstart', onTouchStart, true);
        touchCoordinates = [];
      }

      lastPreventedTime = Date.now();

      checkAllowableRegions(touchCoordinates, x, y);
    }

    directive.compile = function(element , attrs, transclude) {
      if($famous.util.isFaElement(element)) {
        if($famous.util.isASurface(element)) {
          return {
            post: function(scope, element, attr) {
              var clickHandler = $parse(attr.ngClick),
                  tapping = false,
                  tapElement,  // Used to blur the element after a tap.
                  startTime,   // Used to check if the tap was held too long.
                  touchStartX,
                  touchStartY;
              var isolate = $famous.getIsolate(scope);
              var renderNode = isolate.renderNode;

              function resetState() {
                tapping = false;
                
                // TODO: renderNode.

                renderNode.removeClass(ACTIVE_CLASS_NAME);
              }

              renderNode.on('touchstart', function(event) {
                tapping = true;
                tapElement = event.target ? event.target : event.srcElement; // IE uses srcElement.
                // Hack for Safari, which can target text nodes instead of containers.
                if(tapElement.nodeType === 3) {
                  tapElement = tapElement.parentNode;
                }

                renderNode.addClass(ACTIVE_CLASS_NAME);

                startTime = Date.now();

                var touches = event.touches && event.touches.length ? event.touches : [event];
                var e = touches[0].originalEvent || touches[0];
                touchStartX = e.clientX;
                touchStartY = e.clientY;
              });

              renderNode.on('touchmove', function(event) {
                resetState();
              });

              renderNode.on('touchcancel', function(event) {
                resetState();
              });

              renderNode.on('touchend', function(event) {
                var diff = Date.now() - startTime;

                var touches = (event.changedTouches && event.changedTouches.length) ? event.changedTouches :
                    ((event.touches && event.touches.length) ? event.touches : [event]);
                var e = touches[0].originalEvent || touches[0];
                var x = e.clientX;
                var y = e.clientY;
                var dist = Math.sqrt( Math.pow(x - touchStartX, 2) + Math.pow(y - touchStartY, 2) );

                if (tapping && diff < TAP_DURATION && dist < MOVE_TOLERANCE) {
                  // Call preventGhostClick so the clickbuster will catch the corresponding click.
                  preventGhostClick(x, y);

                  if (!angular.isDefined(attr.disabled) || attr.disabled === false) {
                    renderNode.emit('click', [event]);
                  }
                }

                resetState();
              });

              renderNode.on('click', function(event, touchend) {
                scope.$apply(function() {
                  clickHandler(scope, {$event: (touchend || event)});
                });
              });

              renderNode.on('mousedown', function(event) {
                renderNode.addClass(ACTIVE_CLASS_NAME);
              });

              renderNode.on('mousemove mouseup', function(event) {
                renderNode.removeClass(ACTIVE_CLASS_NAME);
              });

            }
          };
        }
      }else {
        return compile(element, attrs, transclude);
      }
    };
    return $delegate; 
  });



  angular.forEach(
  'dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '),
  function(name) {
    var directiveName = window.$famousUtil.directiveNormalize('ng-' + name) ;
    
    $provide.decorator(directiveName+'Directive', function ($delegate, $famousDecorator, $parse, $famous) {
        var directive = $delegate[0];

        var compile = directive.compile;
        directive.compile = function(element , attrs, transclude) {
          if($famous.util.isFaElement(element)) {
            return {

              post: function (scope, element, attrs) {
                var isolate = $famousDecorator.ensureIsolate(scope);

                if (attrs[directiveName]) {
                  var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

                  renderNode.on(name, function (data) {
                    var fn = $parse(attrs[directiveName]);
                    fn(scope, {$event: data});
                    if (!scope.$$phase){
                      scope.$apply();
                    }
                  });
                }
              }
            };
          }else {

            return compile(element , attrs, transclude);
          }
        };
      return $delegate;
    });
  });
});

/**
 * @ngdoc directive
 * @name ngDblclick
 *
 * @description
 * This wrapped on `ngDblclick` directive allows you to specify custom behavior on a dblclick event on a fa-surface .
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngDblclick {@link guide/expression Expression} to evaluate upon
 * a dblclick. (The Event object is available as `$event`)
 *
 * @usage
 * ```html
 * <ANY ng-dblclick="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-dblclick="count = count + 1" ng-init="count=0">
        Increment (on double click), count: {{count}}
      </fa-surface>
     </file>
     <file name="style.css">
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      fa-surface {
        cursor: pointer;
      }
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMousedown
 *
 * @description
 * The ngMousedown directive allows you to specify custom behavior on mousedown event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousedown {@link guide/expression Expression} to evaluate upon
 * mousedown. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mousedown="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mousedown="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (on mouse down), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseup
 *
 * @description
 * Specify custom behavior on mouseup event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseup {@link guide/expression Expression} to evaluate upon
 * mouseup. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseup="expression">
 *
 * </ANY>
 * ```
 * @example
  <example>
     <file name="index.html">
      <fa-surface ng-mouseup="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (on mouse up), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */

/**
 * @ngdoc directive
 * @name ngMouseover
 *
 * @description
 * Specify custom behavior on mouseover event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseover {@link guide/expression Expression} to evaluate upon
 * mouseover. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseover="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseover="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse is over), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseenter
 *
 * @description
 * Specify custom behavior on mouseenter event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseenter {@link guide/expression Expression} to evaluate upon
 * mouseenter. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseenter="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseenter="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse enters), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMouseleave
 *
 * @description
 * Specify custom behavior on mouseleave event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMouseleave {@link guide/expression Expression} to evaluate upon
 * mouseleave. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mouseleave="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mouseleave="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse leaves), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngMousemove
 *
 * @description
 * Specify custom behavior on mousemove event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngMousemove {@link guide/expression Expression} to evaluate upon
 * mousemove. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-mousemove="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-mousemove="count = count + 1" ng-init="count=0" style="cursor: pointer;">
        Increment (when mouse moves), count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeydown
 *
 * @description
 * Specify custom behavior on keydown event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeydown {@link guide/expression Expression} to evaluate upon
 * keydown. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keydown="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keydown="count = count + 1" ng-init="count=0">
        key down count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeyup
 *
 * @description
 * Specify custom behavior on keyup event on a fa-surface.
 *
 * @element ANY
 * @priority 0
 * @param {expression} ngKeyup {@link guide/expression Expression} to evaluate upon
 * keyup. (Event object is available as `$event` and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keyup="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keyup="count = count + 1" ng-init="count=0">
        key up count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngKeypress
 *
 * @description
 * Specify custom behavior on keypress event on a fa-surface.
 *
 * @element ANY
 * @param {expression} ngKeypress {@link guide/expression Expression} to evaluate upon
 * keypress. ({@link guide/expression#-event- Event object is available as `$event`}
 * and can be interrogated for keyCode, altKey, etc.)
 *
 * @usage
 * ```html
 * <ANY ng-keypress="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
     <file name="index.html">
      <fa-surface ng-keypress="count = count + 1" ng-init="count=0">
        key press count: {{count}}
      </fa-surface>
     </file>
   </example>
 */


/**
 * @ngdoc directive
 * @name ngSubmit
 *
 * @description
 * Enables binding angular expressions to onsubmit events on a fa-surface.
 *
 * Additionally it prevents the default action (which for form means sending the request to the
 * server and reloading the current page), but only if the form does not contain `action`,
 * `data-action`, or `x-action` attributes.
 *
 * <div class="alert alert-warning">
 * **Warning:** Be careful not to cause "double-submission" by using both the `ngClick` and
 * `ngSubmit` handlers together. See the
 * {@link form#submitting-a-form-and-preventing-the-default-action `form` directive documentation}
 * for a detailed discussion of when `ngSubmit` may be triggered.
 * </div>
 *
 * @element form
 * @priority 0
 * @param {expression} ngSubmit {@link guide/expression Expression} to eval.
 * ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-submit="expression">
 *
 * </ANY>
 * ```
 * @example
   <example module="submitExample">
   </example>
 */

/**
 * @ngdoc directive
 * @name ngFocus
 *
 * @description
 * Specify custom behavior on focus event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngFocus {@link guide/expression Expression} to evaluate upon
 * focus. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-focus="expression">
 *
 * </ANY>
 * ```
 * @example
 * See {@link ngClick ngClick}
 */

/**
 * @ngdoc directive
 * @name ngBlur
 *
 * @description
 * Specify custom behavior on blur event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngBlur {@link guide/expression Expression} to evaluate upon
 * blur. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-blur="expression">
 *
 * </ANY>
 * ```
 * @example
 */

/**
 * @ngdoc directive
 * @name ngCopy
 *
 * @description
 * Specify custom behavior on copy event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCopy {@link guide/expression Expression} to evaluate upon
 * copy. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-copy="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
    
   </example>
 */

/**
 * @ngdoc directive
 * @name ngCut
 *
 * @description
 * Specify custom behavior on cut event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngCut {@link guide/expression Expression} to evaluate upon
 * cut. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-cut="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
    
   </example>
 */

/**
 * @ngdoc directive
 * @name ngPaste
 *
 * @description
 * Specify custom behavior on paste event.
 *
 * @element window, input, select, textarea, a
 * @priority 0
 * @param {expression} ngPaste {@link guide/expression Expression} to evaluate upon
 * paste. ({@link guide/expression#-event- Event object is available as `$event`})
 *
 * @usage
 * ```html
 * <ANY ng-paste="expression">
 *
 * </ANY>
 * ```
 * @example
   <example>
   </example>
 */
