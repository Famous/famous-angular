// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
        'app/scripts/stubs/famous.angular.0.js',
        'app/scripts/directives/**/*.js',
        'app/scripts/stubs/famous.angular.1.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('famous.angular.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/scripts'], {read: false})
    .pipe(clean());
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

// Watch
gulp.task('watch', function() {

  // Listen on port 3030
  server.listen(3030, function (err) {
    if (err) {
      return console.log(err)
    };

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

  });

});