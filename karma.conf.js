// Karma configuration
// Generated on Mon May 19 2014 16:19:09 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['jasmine', 'requirejs'],
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/requirejs/require.js',
      'http://code.famo.us/famous/0.2.0/famous.min.js',
      'dist/famous-angular.js',
      'test/**/*Spec.js'

      // Dependencies for famous-angular-examples
			//'famous-angular-examples/app/bower_components/angular-animate/angular-animate.js',
			//'famous-angular-examples/app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
			//'famous-angular-examples/app/scripts/app.js',
			//'famous-angular-examples/app/scripts/**/*js',
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // Give gulp time to re-build dist, in the src/ files change
    autoWatchBatchDelay: 1000,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
