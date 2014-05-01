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
      },
      inputDotsGridLayout: {
        dimensions: [4, 1],
        cellSize: [.12 * _width, 20]
      }
    }

    $scope.testLog = function(arg) {
      console.log('test', arg);
    }

    $scope.sizes = {
      numberButton: [77, 77],
      enterPasscodeSurface: [undefined, 100],
      numberPadGridLayout: [.9 * _width, .7 * _height - 20],
      inputDotsGridLayout: [.478 * _width, 20],
      inputDot: [15, 15],
      slideToUnlockText: [.45 * _width, 24],
      calendar: [undefined, 30],
      clock: [undefined, 200]
    }

    $scope.positions = {
      numberPadGridLayout: [.085 * _width, 150, 2],
      emergencyText: [.085 * _width, _height - 36, 2],
      deleteText: [-(.085 * _width), _height - 36, 2],
      enterPasscodeText: [0, 45, 2],
      inputDotsGridLayout: [.3 * _width, 85],
      slideToUnlockText: [0, _height - 100, 2],
      clock: [0, 40, 2],
      calendar: [0, 130, 2],
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
    ];

    $scope.fireButtonAnimation = function(index, event){
      console.log('famous bag', famous.bag)
      console.log('index', index);
      console.log('event', event);
      famous.bag.first('number-button-animation-' + index).replay();
    }

  });
