'use strict';

//angular.module('ngFameApp', []);

require.config({
  baseUrl: 'scripts'
})

define(function(require, exports, module) {
  alert('loaded');
  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');

	var mainContext = Engine.createContext();
});