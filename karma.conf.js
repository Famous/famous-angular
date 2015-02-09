// Karma configuration
// Generated on Mon May 19 2014 16:19:09 GMT-0700 (PDT)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // Even though we do not need the requirejs framework to load requirejs
        // modules, we need to add it to frameworks so that karma will wait to
        // start until __karma__.start() is called in karma-start.js
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'test/phantomjs-polyfills.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/famous/dist/famous-global.js',
            'src/scripts/module.js',
            'src/scripts/services/**/*.js',
            'src/scripts/directives/**/*.js',
            'test/bootstrap/common.js',
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
            'src/scripts/module.js': ['coverage'],
            'src/scripts/services/**/*.js': ['coverage'],
            'src/scripts/directives/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['spec', 'coverage'],

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
        browsers: ['PhantomJS'],
        
        coverageReporter: {
            reporters: [{
                type: 'text-summary'
            }, {
                type: 'cobertura',
                file: 'coverage.xml'
            }, {
                type: 'lcov'
            }]
        },
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
