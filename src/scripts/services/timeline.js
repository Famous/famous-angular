angular.module('famous.angular')
  .factory('$timeline', function () {

    // polymorphic add for scalars and vectors
    var add = function(a, b) {
      if (typeof a === "number") {
        return a + b;
      }
      else {
        return a.map(function(x, i) { return x + b[i]; });
      }
    };

    // polymorphic subtract for scalars and vectors
    var subtract = function(a, b) {
      if (typeof a === "number") {
        return a - b;
      }
      else {
        return a.map(function(x, i) { return x - b[i]; });
      }
    };

    // polymorphic multiply for scalar and vectors
    var multiply = function(A, b) {
      // b is a scalar, A is a scalar or a vector
      if (typeof A === "number") {
        return A * b;
      }
      else {
        return A.map(function(x) { return x * b; });
      }
    };

    var scale = function (f, x1, x2, y1, y2) {
      // x1 and x2 must be scalars. y1 and y2 can be scalars or vectors
      return function(x) {
        var yTranslate = y1;
        var xTranslate = -x1;
        var xScale = 1 / (x2 - x1);
        var yScale = subtract(y2, y1);
        return add(multiply(yScale, f(xScale * (x + xTranslate))), yTranslate);
      };
    };

    return function(points) {
        //
        // Takes a list of points, with the curve to follow to the next point.
        // Any curve value on the last point is ignored.
        //
        //  e.g., [[0, 100, Easings.inOutQuad], [1, 500]]
        //
        // Returns a piecewise function f:
        //
        //
        //         / y₀,             if x < x₀
        //         |
        //         | scaled(curveᵢ,  if xᵢ ≤ x < xᵢ₊₁
        //         |        xᵢ,
        //         |        xᵢ,
        // f(x) = <         yᵢ₊₁,
        //         |        yᵢ₊₁)(x)
        //         | for i in 0..segments.length - 1
        //         |
        //         \ last x,         otherwise
        //

        return function(x) {
          if (x < points[0][0]) {
            return points[0][1];
          }
          for (var i = 0; i < points.length - 1; i++) {
            if (points[i][0] <= x && x < points[i+1][0]) {
              var f = scale(points[i][2],
                            points[i][0],
                            points[i+1][0],
                            points[i][1],
                            points[i+1][1]);

              return f(x);
            }
          }
          return points[points.length-1][1];
        };

      }

  });
