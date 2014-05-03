var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/app';
var LIVERELOAD_PORT = 35729;

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

// Set up server
function startExpress() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
    'app/scripts/services/famous.js',
    'app/scripts/directives/**/*.js'
  ])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('famous.angular.js'))
  .pipe(gulp.dest('app/scripts'))
  .pipe(livereload(server))
  .pipe(notify({ message: 'Scripts task complete' }));
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/scripts'], {read: false})
  .pipe(clean());
});

// Watch
gulp.task('watch', function(event) {
  server.listen(LIVERELOAD_PORT, function (err) {
	  if (err) {
	    return console.log(err)
	  };

	  // Watch .js files
	  gulp.watch(
	    [
	      'app/scripts/*/**/*.js',
	      'app/scripts/app.js',
	      '!app/scripts/famous.angular.js',
	      'app/index.html',
	      'app/views/**/*.html'
	    ],
	    ['build']
	  ).on('change',
	    function(file){
	      server.changed(file.path);
	    }
	  );
  });
});

// Build for dist
gulp.task('build', ['clean', 'scripts'], function(event) {
	return gulp.src('app/scripts/famous.angular.js')
	.pipe(gulp.dest('dist/scripts'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/scripts'))
	.pipe(notify({ message: 'Build task complete' }));
})

// Default task
gulp.task('default', ['scripts'], function() {
  startExpress();
  gulp.start('watch');
});