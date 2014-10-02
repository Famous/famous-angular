/**
 * @ngdoc directive
 * @name faIndex
 * @module famous.angular
 * @restrict A
 * @description
 * This directive is used to specify the rendering order of elements
 * inside of a ViewSequence-based component, such as @link faScrollView faScrollView}
 * or @link faGridLayout faGridLayout}.  As a special case, when elements are added to
 * these controls using ng-repeat, they are automatically assigned the
 * $index property exposed by ng-repeat.  When adding elements manually
 * (e.g. to a faScrollView but not using ng-repeat) or in a case where custom
 * order is desired, then the index value must be assigned/overridden using the faIndex directive.
 * @usage
 * ```html
 * <fa-scroll-view>
 *  <fa-surface fa-index="0">Surface 1</fa-surface>
 *  <fa-surface fa-index="1">Surface 2</fa-surface>
 * </fa-scroll-view>
 * ```
 *
 * @example
 * `Fa-index` determines the order of which the surfaces appear in the sequential view.
 * In this example below, a Scroll View is created with two nested `fa-view`'s, both of which have an `fa-index` of 0 and 1, respectively.
 *
 * If `fa-index` is declared explicitly, it will override any default order of `fa-view`'s declared in html.
 * If `fa-views` are created with an ng-repeat, they are automatically assigned the $index property, unless explicitly set.
 * The `fa-view` with the blue background color appears after the one with the red background because its `fa-index` is set to 1.
 *
 * `fa-scroll-view` accepts another directive called `fa-start-index` as an attribute, which determines which `fa-view` the Scroll View displays by default.
 * `Fa-start-index` will not affect the sequential order of the layout; the `fa-view` with the red background will be layed out first, followed by the one with the blue background.
 *  By setting `fa-start-index` to 1, the Scroll View will display the View with the index of 1, which is the View with the blue background color. 
 *
 <example module="faIndexExampleApp">
  <file name="index.html">
  <fa-app ng-controller="IndexCtrl"> 

     <!-- The scroll View will start at the index of 1 -->
      <fa-scroll-view fa-pipe-from="eventHandler" fa-options="options.scrollView" fa-start-index="1">

        <!-- Even though this view is declared first in html, it will will be layed out 2nd -->
        <!-- On page load, the scroll View will scroll to this view, and display it.  -->

         <fa-view fa-index="1">
            <fa-modifier fa-size="[320, 320]">
               <fa-surface fa-pipe-to="eventHandler" 
                           fa-background-color="'blue'">
                           <p>Scroll me back!</p>
               </fa-surface>
            </fa-modifier>
         </fa-view>
    
         <fa-view fa-index="0">
            <fa-modifier fa-size="[320, 320]">
               <fa-surface fa-pipe-to="eventHandler" 
                           fa-background-color="'red'">
                           <p>Scroll me!</p>
               </fa-surface>
            </fa-modifier>
         </fa-view>
    
      </fa-scroll-view>   
    </fa-app>   
  </file>
  <file name="script.js">
  angular.module('faIndexExampleApp', ['famous.angular'])
      .controller('IndexCtrl', ['$scope', '$famous', function($scope, $famous) {

       var EventHandler = $famous['famous/core/EventHandler'];
       $scope.eventHandler = new EventHandler();
       $scope.list = [{content: "famous"}, {content: "angular"}, {content: "rocks!"}];
      
       $scope.options = {
         scrollView: {
           direction: 0 // displays the fa-views horizontally
         }
       };

    }]);
  </file>
  <file name="style.css">
  fa-app {
      width: 320px;
      height: 320px;
      overflow: hidden;
    }
    p {
      padding: 8px 8px;
    }
  </file>
 </example>
 */

angular.module('famous.angular')
  .directive('faIndex', ["$parse", "$famousDecorator", function ($parse, $famousDecorator) {
    return {
      restrict: 'A',
      scope: false,
      priority: 16,
      compile: function () {
        return {
          post: function (scope, element, attrs) {
            var isolate = $famousDecorator.ensureIsolate(scope, element);
            isolate.index = scope.$eval(attrs.faIndex);

            scope.$watch(function () {
              return scope.$eval(attrs.faIndex);
            }, function () {
              isolate.index = scope.$eval(attrs.faIndex);
              if(isolate.updateMethod) isolate.updateMethod();
            });
          }
        };
      }
    };
  }]);