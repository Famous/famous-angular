'use strict';

angular.module('integrationApp')
  .factory('gridRows', function () {
    return {
      bigLeft: function(height, margin, yOffset, first, second, third) {
        return {
            height: 2*height,
            totalHeight: 2*height + 2*margin,
            y: yOffset,
            elements: [{
              tweet: first,
              size: 2*height + margin,
              x: margin,
              showTweet: true,
              y: margin
            }, {
              tweet: second,
              size: height,
              x: 2*height + 3*margin,
              y: margin,
            }, {
              tweet: third,
              size: height,
              x: 2*height + 3*margin,
              y: height + 2*margin,
            }]
        };
      },
      allSmall: function(height, margin, yOffset, first, second, third) {
        return {
            height: height,
            y: yOffset,
            totalHeight: height + margin,
            elements: [{
              tweet: first,
              size: height,
              x: margin,
              y: margin
            }, {
              tweet: second,
              size: height,
              x: height + 2*margin,
              y: margin,
            }, {
              tweet: third,
              size: height,
              x: 2*height + 3*margin,
              y: margin
            }]
        }
      },
    };
  });
