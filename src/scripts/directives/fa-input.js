'use strict';
/**
 * @ngdoc directive
 * @name faClick
 * @module famous.angular
 * @restrict A
 * 
 * @description
 * This directive allows you to specify custom behavior when an element is clicked.
 *
**/
angular.module('famous.angular')
.config(function($provide) {
  $provide.decorator('ngClickDirective', function ($delegate, $famousDecorator, $parse, $famous, $timeout, $famous) {
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
      event.target && event.target.blur();
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
          if (touchCoordinates[i] == x && touchCoordinates[i+1] == y) {
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
        Engine.on('click', onClick);
        Engine.on('touchstart', onTouchStart);
        touchCoordinates = [];
      }

      lastPreventedTime = Date.now();

      checkAllowableRegions(touchCoordinates, x, y);
    }

    directive.compile = function(element , attrs, transclude) {

      if($famous.utils.isFaElement(element)) {
        if($famous.utils.isASurface(element)) {

          return {
            link: function(scope, element, attr) {
              var clickHandler = $parse(attr.ngClick),
                  tapping = false,
                  tapElement,  // Used to blur the element after a tap.
                  startTime,   // Used to check if the tap was held too long.
                  touchStartX,
                  touchStartY;
              var isolate = $famous.getIsolate(element.scope());
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

            }, 
          };
        }
      }else {
        return compile(element, attrs, transclude);
      }
    };
  });

  angular.forEach(
  'dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(' '),
  function(name) {
    var directiveName = window.$famousUtils.directiveNormalize('ng-' + name) ;
    
    $provide.decorator(directiveName+'Directive', function ($delegate, $famousDecorator, $parse, $famous) {
       console.log($delegate);
        var directive = $delegate[0];

        var compile = directive.compile;
        directive.compile = function(element , attrs, transclude) {
          var isFa = /^FA\-.*/;
          if(isFa.test(element[0].tagName)) {
            return {

              post: function (scope, element, attrs) {
                console.log(element[0].tagName, name);
                var isolate = $famousDecorator.ensureIsolate(scope);

                if (attrs[directiveName]) {
                  var renderNode = (isolate.renderNode._eventInput || isolate.renderNode);

                  renderNode.on(name, function (data) {
                    console.log(name,element, data);
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
                console.log(element[0].tagName, name);

            return compile(element , attrs, transclude);
          }
        };
      return $delegate;
    });
  });
});

