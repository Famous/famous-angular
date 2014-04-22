// 
// © 2014 Thomas Street LLC. All rights reserved
//

'use strict';

angular.module('integrationApp')
  .factory('gridRows', function () {

    // position helpers

    
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
      positions: function(offsetFn) {

        var hidden = function(row) {
          return row.y + row.height + offsetFn() < 0;
        };

        var flat = function(row) {
          return row.y + row.height < offsetFn();
        };

        var rotating = function(row) {
          return -offsetFn() > row.y && -offsetFn();
          return -offsetFn() > (row.y - row.height) && -offsetFn() < row.y;
        };

        return {
          x: function(tweet) {
            return tweet.xOffset;
          },
          y: function(row) {
            if (rotating(row)) return 0;
            return row.y + offsetFn();
          },
          z: function(row) {
            if (!rotating(row)) return 0;
            var height = row.height;
            var visibleHeight = (row.y + row.height + offsetFn());
            var z = Math.sqrt((height * height) - (visibleHeight * visibleHeight));
            return -z;
          },
          xRotation: function(row) {
            if (rotating(row)) {
              var visibleHeight = (row.y + row.height + offsetFn());
              var oppositeOverHypotenuse = visibleHeight / row.height;
              var theta = (Math.PI / 2) - Math.asin( visibleHeight / row.height);
              return theta;
            }
            if (hidden(row)) return Math.PI / 2;
            return 0;
          }
        }
      }
    };
  });
