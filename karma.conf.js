// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
	    'test/requirejs.config.js',
	    'famous-angular-examples/app/bower_components/angular/angular.js',
	    'bower_components/angular-mocks/angular-mocks.js',
	    'famous-angular-examples/app/bower_components/angular-animate/angular-animate.js',
	    'famous-angular-examples/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
	    'famous-angular-examples/app/bower_components/requirejs/require.js',
	    'famous-angular-examples/app/bower_components/underscore/underscore.js',
	    'famous-angular-examples/app/bower_components/angular-touch/angular-touch.js',
	    'http://code.famo.us/famous/0.2.0/famous.min.js',
	    'dist/famous-angular.js',
	    'famous-angular-examples/app/scripts/app.js',
	    'famous-angular-examples/app/scripts/**/*js',
	    'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
