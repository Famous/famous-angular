/**
 * @ngdoc directive
 * @name faVideoSurface
 * @module famous.angular
 * @restrict EA
 * @param {String} faVideoUrl  -  String url pointing to the video that should be loaded into the Famo.us VideoSurface
 * @param {Object} faOptions  -   Object that sets options for the Famo.us VideoSurface
 * @description
 * This directive creates a Famo.us VideoSurface and loads the specified VideoUrl.
 * @usage
 * ```html
 * <fa-video-surface fa-video-url="vid/my-video.mp4">
 * </fa-video-surface>
 * ```
 @example
 * To use `fa-video-surface`, declare an `fa-video-url` attribute with a string url.
 * ```html
 * <fa-video-surface
 *            fa-video-url="vid/my-video.mp4"
 *            class="video"
 *            fa-options="{autoplay:true}">
 * </fa-video-surface>
 * ```
 * `Fa-video-surface` accepts options via the fa-options attribute. Currently the only option supported by Famo.us is autoplay, so you will have to target other attributes for the video element like controls and loop on the renderNode after the surface deploy event fires. 
 *
 *  var video = $famous.find('.video')[0].renderNode;
 *  video.on('deploy', function(){
 *     var player = video._currTarget;
 *     player.controls = true;
 *     player.loop = true;
 *     player.onprogress = console.log('video is downloading');
 *  });  
 *
 * `Fa-video-surface` can be modified via fa-modifier just like any Surface.
 *
 */

angular.module('famous.angular')
      .directive('faVideoSurface', ["$famous", "$famousDecorator", function ($famous, $famousDecorator) {
        return {
          scope: true,
          transclude: true,
          template: '<div class="fa-video-surface"></div>',
          restrict: 'EA',
          compile: function (tElem, tAttrs) {
            return {
              pre: function (scope, element, attrs) {
                var isolate = $famousDecorator.ensureIsolate(scope);
      
                var VideoSurface = $famous['famous/surfaces/VideoSurface'];
      
                scope.$watch(function(){
                
                  return scope.$eval(attrs.faOptions);
                  
                }, function(oldVal, newVal){
                
                  isolate.renderNode.setOptions(newVal);
                  
                }, true);
      
                isolate.renderNode = new VideoSurface({
                  class: scope.$eval(attrs.class)
                });
                
                $famousDecorator.addRole('renderable',isolate);
                isolate.show();
                      
                if (attrs.class) {
                  isolate.renderNode.setClasses(attrs['class'].split(' '));
                }
                // Throw an exception if anyother famous scene graph element is added on fa-surface.            
                $famousDecorator.sequenceWith(scope, function(data) {
                  throw new Error('Surfaces are leaf nodes of the Famo.us render tree and cannot accept rendernode children.  To include additional Famo.us content inside of a fa-surface, that content must be enclosed in an additional fa-app.');
                });                
                
              },
              post: function (scope, element, attrs) {
              
                var isolate = $famousDecorator.ensureIsolate(scope);
      
                var updateContent = function () {
                  isolate.renderNode.setContent(attrs.faVideoUrl);
                };
      
                updateContent();
      
                attrs.$observe('faVideoUrl', updateContent);
      
                $famousDecorator.registerChild(scope, element, isolate);
              }
            };
          }
        };
      }]);