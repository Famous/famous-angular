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

    $scope.inputDots = [
      {val: false},
      {val: false},
      {val: false},
      {val: false}
    ];

    var _dotIndex = 0;
    var DOTS = 4;
    $scope.shiftInputDots = function(){
      _dotIndex = (_dotIndex + 1);
      for(var i = 0; i < DOTS; i++){
        $scope.inputDots[i].val = i < _dotIndex;
      }
      if(_dotIndex >= DOTS){
        //TODO:  fire animation
        $scope.fireDotShakeAnimation(function(){
          console.log('callback"')
          _dotIndex = -1;
          $scope.shiftInputDots();
          if(!$scope.$$phase)
            $scope.$apply();
        })

      }
      //TODO:  handle case when dots fill up (go back to zero after delay; animate)
    }

    window.scope = $scope;

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
      inputDotsGridLayout: [.3 * _width, 85, 2],
      inputDotsGridLayoutShake: [-100, 0, 2],
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

    $scope.buttonTap = function(index){
      $scope.shiftInputDots();
      $scope.fireButtonAnimation(index);
    }


    $scope.fireButtonAnimation = function(index){
      famous.bag.first('number-button-animation-' + index).replay();
    }

    $scope.fireDotShakeAnimation = function(callback){
      famous.bag.first('dot-shake-animation').replay(callback);
    }

  });
