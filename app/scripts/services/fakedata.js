'use strict';

angular.module('integrationApp')
  .service('Fakedata', function Fakedata() {
    

  	var rand = function(){
  		return (Math.random() * (.6-.1) + .1);
  	}
  	var elements = 70;
  	var colors = [
      '#869B40',
      '#C2B02E',
      '#629286',
      '#B58963',
      '#9E9B8C'
    ];

    var strings = [
      'music',
      'video',
      'javascript',
      'famo.us',
      'wow'
    ];
    var events = _.map(_.range(elements), function(i){
      return {
        rand: rand(),
        name: _.sample(strings),
        bgColor: _.sample(colors),
        id: i
      }
    });




    return {
    	events : events
    }
  });
