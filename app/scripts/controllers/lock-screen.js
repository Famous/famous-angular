'use strict';

angular.module('integrationApp')
  .controller('LockScreenCtrl', function ($scope, famous) {
    var EventHandler = famous['famous/core/EventHandler'];
    $scope.enginePipe = new EventHandler();

    //TODO:  either set the scrollview's initial position to the second page,
    //       or make it double-wide and offset it x: -1 * screenWidth
    
    var _width = 320;
    var _height = 568;
    $scope.options = {
      mainScrollView: {
        paginated: true,
        direction: 0, //horizontal
        speedLimit: 1
      },
      numberPadGridLayout: {
        dimensions: [3, 4],
        cellSize: [.3 * _width, .1 * _height]
      }
    }

    $scope.sizes = {
      numberButton: [77, 77],
      numberPadGridLayout: [.9 * _width, .7 * _height]
    }

    $scope.positions = {
      numberPadGridLayout: [.085 * _width, 130, 2],
      emergencyText: [.085 * _width, _height - 36, 2],
      deleteText: [-(.085 * _width), _height - 36, 2],
    }

    $scope.numberButtons = [
      { number: 1, letters: ""},
      { number: 2, letters: "ABC"},
      { number: 3, letters: "DEF"},
      { number: 4, letters: "GHI"},
      { number: 5, letters: "JKL"},
      { number: 6, letters: "MNO"},
      { number: 7, letters: "PQRS"},
      { number: 8, letters: "TUV"},
      { number: 9, letters: "WXYZ"},
      { number: "",letters: ""},
      { number: 0, letters: ""},
    ]

  });
