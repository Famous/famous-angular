'use strict';

angular.module('integrationApp')
  .factory('ScrollParticle', function (famous) {

    var ScrollView = famous['famous/views/ScrollView'];
    var Timer = famous["famous/utilities/Timer"];
    var PhysicsEngine = famous['famous/physics/PhysicsEngine'];
    var Particle = famous['famous/physics/bodies/Particle'];
    var Drag = famous['famous/physics/forces/Drag'];
    var Spring = famous['famous/physics/forces/Spring'];
    var EventEmitter = famous['famous/core/EventEmitter'];

    return function ScrollParticle(edgeFunction, clipSizeFn) {
      var scrollView =  new ScrollView({speedLimit: 10});


      var _handleEdge = function _handleEdge(edgeDetected) {
    
        if (edgeDetected < 0) {
          this._springPosition = clipSizeFn();
          this.spring.setOptions({
              anchor: [this._springPosition, 0, 0],
          });
        }
        else if (edgeDetected > 0) {
          this._springPosition = 0;
          this.spring.setOptions({
              anchor: [this._springPosition, 0, 0],
          });
        }

        if(!this._onEdge && edgeDetected) {
          this.sync.setOptions({scale: this.options.edgeGrip});
          if(!this.touchCount && !this._springAttached) {
            this._springAttached = true;
            this.physicsEngine.attach([this.spring], this.particle);
          }
        }
        else if(this._onEdge && !edgeDetected) {
          this.sync.setOptions({scale: 1});
          if(this._springAttached && Math.abs(this.getVelocity()) < 0.001) {
            this.setVelocity(0);
            this.setPosition(this._springPosition);
            // reset agents, detaching the spring
            _detachAgents.call(this);
            _attachAgents.call(this);
          }
        }
        this._onEdge = edgeDetected;
      }

      Timer.every(function() {
        var edgeStatus = edgeFunction();
        _
        _handleEdge.call(scrollView, edgeStatus);


        if (_scrollState == "gliding" && this.getVelocity().x < 1e-2) {
          _scrollState = "still";
          scrollStateEvents.emit("still");
        }

      }.bind(this), 20);

      // ScrollParticle states
      //
      // still, dragging, gliding, stopping
      //
      // start still
      // transition to dragging when touchmove
      // transition to gliding when touchend with v > 0
      // transitionsition to still when touchstart with v = 0
      //
      // a touch is a stopping touch if 

      var _scrollState = "still";
      var scrollStateEvents = new EventEmitter();

      scrollView.eventInput.on('update', function(data) {
        var _scrollState = "dragging";
        scrollStateEvents.emit("dragging");
      }.bind(this));

      scrollView.eventInput.on('end', function(data) {
        if (Math.abs(data.v) > 0) {
          _scrollState = "gliding";
          scrollStateEvents.emit("gliding");
        }
      }.bind(this));

      scrollView.eventInput.on('end', function(data) {
        if (data.v == 0) {
          _scrollState = "still";
          scrollStateEvents.emit("still");
        }
      }.bind(this));

      this.scrollState = scrollStateEvents;
      this.particle = scrollView.particle;
      this.getPosition = scrollView.getPosition.bind(scrollView);
      this.getVelocity = scrollView.particle.getVelocity.bind(scrollView.particle);
      this.rawInput = scrollView.rawInput;


    };
  });
