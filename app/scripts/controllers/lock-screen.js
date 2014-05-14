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
        speedLimit: 5,
        margin: 10000
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

    $scope.sizes = {
      numberButton: [77, 77],
      bgImage: [_width, _height],
      enterPasscodeSurface: [undefined, 100],
      numberPadGridLayout: [.9 * _width, .7 * _height - 20],
      inputDotsGridLayout: [.478 * _width, 20],
      inputDot: [15, 15],
      slideToUnlockText: [.45 * _width, 24],
      calendar: [undefined, 30],
      clock: [undefined, 200],
      emergencyText: [75, 50],
      topCapsule: [40, 8]
    }

    $scope.positions = {
      numberPadGridLayout: [.085 * _width, 150, 500],
      emergencyText: [.085 * _width, _height - 36, 2],
      deleteText: [-(.085 * _width), _height - 36, 2],
      enterPasscodeText: [0, 45, 2],
      inputDotsGridLayout: [.3 * _width, 85, 2],
      slideToUnlockText: [0, _height - 100, 2],
      clock: [0, 28, 2],
      calendar: [0, 130, 2],
      topCapsule: [143, 0, 2]
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
      { number: 0, letters: ""}
    ];

    $scope.inputDots = [
      {val: false},
      {val: false},
      {val: false},
      {val: false}
    ];








    $scope.testLog = function(arg) {
      console.log('test', arg);
    }

    var _inputLocked = false;
    var _dotIndex = 0;
    var DOTS = 4;
    $scope.shiftInputDots = function(){
      _dotIndex = (_dotIndex + 1);
      for(var i = 0; i < DOTS; i++){
        $scope.inputDots[i].val = i < _dotIndex;
      }
      if(_dotIndex >= DOTS){
        _inputLocked = true;
        $scope.fireDotShakeAnimation(function(){
          _dotIndex = -1;
          $scope.shiftInputDots();
          _inputLocked = false;
          if(!$scope.$$phase)
            $scope.$apply();
        })
      }
    }

    $scope.unshiftInputDots = function(){
      _dotIndex = Math.max(-1,(_dotIndex - 2));
      $scope.shiftInputDots();
    }

    $scope.bgOpacity = function(){
      var scrollView = famous.find('#main-scroll-view')[0].renderNode;
      if(scrollView){
        var perPosition = $scope.scrollXPosition();
        return perPosition;
      } else
        return 0;
    };

    $scope.scrollXPosition = function(){
      var scrollView = famous.find('#main-scroll-view')[0].renderNode;
      if(scrollView){
        var page = scrollView._node.index;
        var absPosition = _width * page + scrollView.getPosition();
        var perPosition = Math.max(0, Math.min(1, absPosition / (_width)));
        return 1 - perPosition;
      }
    };

    $scope.buttonTap = function(index, numberButton){
      console.log('pressed', numberButton.number);
      if(!_inputLocked){
        $scope.shiftInputDots();
        $scope.fireButtonAnimation(index);
      }
    }

    $scope.fireButtonAnimation = function(index){
      famous.find('#number-button-animation-' + index)[0].replay();
    }

    $scope.fireDotShakeAnimation = function(callback){
      famous.find('#dot-shake-animation')[0].replay(callback);
    }

  });
