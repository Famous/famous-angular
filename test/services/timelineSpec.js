'use strict';

describe('$timeline', function() {

  var $timeline;

  beforeEach(module('famous.angular'));

  beforeEach(inject(function(_$timeline_) {
    $timeline = _$timeline_;
  }));

  describe('timeline function', function() {

    describe('generated timeline function', function() {

      describe('scalar ranges', function() {

        var linear = function(x) { return x; };
        var points = [[0, 0, linear], [0.5, 500, linear], [1, 700, 0]];

        it('should return the min y if x is < than the min x', function() {
          var f = $timeline(points);
          expect(f(-1)).toEqual(0);
        });

        it('should return the min y if x = the min x', function() {
          var f = $timeline(points);
          expect(f(0)).toEqual(0);
        });

        it('should return the scaled value between two points if x is between those points', function() {
          var f = $timeline(points);
          expect(f(0.25)).toEqual(250);
          expect(f(0.75)).toEqual(600);
        });

        it('should return the max if x = the max x', function() {
          var f = $timeline(points);
          expect(f(1)).toEqual(700);
        });

        it('should return the max y if x is > than the max x', function() {
          var f = $timeline(points);
          expect(f(1.5)).toEqual(700);
        });

      });


      describe('vector ranges', function() {

        var linear = function(x) { return x; };
        var points = [[0, [0, 0, 0], linear], [0.5, [500, 300, 0], linear], [1, [100, 400, 20]]];

        it('should return the min y if x is < than the min x', function() {
          var f = $timeline(points);
          expect(f(-1)).toEqual([0, 0, 0]);
        });

        it('should return the min y if x = the min x', function() {
          var f = $timeline(points);
          expect(f(0)).toEqual([0, 0, 0]);
        });

        it('should return the scaled value between two points if x is between those points', function() {
          var f = $timeline(points);
          expect(f(0.25)).toEqual([250, 150, 0]);
          expect(f(0.75)).toEqual([300, 350, 10]);
        });

        it('should return the max if x = the max x', function() {
          var f = $timeline(points);
          expect(f(1)).toEqual([100, 400, 20]);
        });

        it('should return the max y if x is > than the max x', function() {
          var f = $timeline(points);
          expect(f(1.5)).toEqual([100, 400, 20]);
        });

      });


      describe('easing function', function() {

        var points = [[0, 0], [1, 10]];

        it('should default to linear if no easing is provided', function() {
          var f = $timeline(points);
          expect(f(0.5)).toEqual(5);
          expect(f(0.9)).toEqual(9);
        });

      });

    });


  });

});
