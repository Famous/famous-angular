var SITE_DIR = './famous-angular-docs/';
var SITE_DIR_PATH = '/famous-angular-docs/';

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/app';
var EXPRESS_DOCS_ROOT = __dirname + SITE_DIR_PATH + '_site';

var LIVERELOAD_PORT = 35729;

// Load plugins
var gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  stylus = require('gulp-stylus'),
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
  server = lr(),
  gutil = require('gulp-util'),
  pkg = require('./package.json'),
  exec = require('gulp-exec');


// Set up server
function startExpress(root) {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(root));
  app.listen(EXPRESS_PORT);
}

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
    'app/scripts/services/famous.js',
    'app/scripts/services/famousDecorator.js',
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
	  gulp.watch([
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

gulp.task('docs', ['scripts'], function(done) {
	var dgeni = require('dgeni'),
		semver = require('semver'),
		argv = require('minimist')(process.argv.slice(2)),
		docVersion = argv['doc-version'];

	if (docVersion != 'unstable' && !semver.valid(docVersion)) {
		console.log('Usage: gulp docs --doc-version=(unstable|versionName)');
		if(pkg.version) {
			console.log('Current package.json version is: '+pkg.version);
		}
		console.log('No version selected, using unstable');
		docVersion = 'unstable';
	}
	process.env.DOC_VERSION = docVersion;

	gutil.log('Generating documentation for ', gutil.colors.cyan(docVersion));
	var generateDocs = dgeni.generator('docs-generation/docs.config.js');
	return generateDocs().then(function() {
		gutil.log('Docs for', gutil.colors.cyan(docVersion), 'generated!');
	});
});

gulp.task('build-site', ['docs'], function(done) {
  return gulp.start('build-jekyll');
});

// Compile .styl for the site submodule
gulp.task('site-styl', function() {
  return gulp.src(SITE_DIR + "styl/*.styl")
    .pipe(stylus())
    .pipe(minifycss())
    .pipe(concat('main.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(SITE_DIR + "css/"));
});

// Concat all js files and minify them
gulp.task('site-js', function() {
  return gulp.src([
    SITE_DIR + "**/*.js",
    // Exclude directories where compiled JS will end up
    '!' + SITE_DIR + '_site/*',
    '!' + SITE_DIR + 'js/*'
  ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(SITE_DIR + "js/"));
});


// Only jekyll-build, without compiling docs, for faster run-time and to
// prevent infinite loop when watching over files
gulp.task('build-jekyll', ['site-styl', 'site-js'], function() {
  var jekyllCommand = 'jekyll build --source ' + SITE_DIR +  ' --destination ' + SITE_DIR + '_site/';
  // gulp-exec bugfix:
  // Need to call gulp.src('') exactly, before using .pipe(exec())
  return gulp.src('')
    .pipe(exec(jekyllCommand))
    .pipe(livereload(server));
});

/***********************************************************************
* Watch task for developing the angular-site submodule
***********************************************************************/
gulp.task('dev-site', ['build-jekyll'], function() {
  server.listen(LIVERELOAD_PORT, function (err) {
	  if (err) {
	    return console.log(err);
	  }

	  // Watch source files inside site submodule
	  gulp.watch([
      // Because .styl compiles into .css, do not watch .css, else you will
      // an infinite loop
      SITE_DIR + '**/*.styl',
      SITE_DIR + '**/*.html',
      SITE_DIR + '**/*.md',
      SITE_DIR + '**/*.js',
      // Do NOT watch the compile _site directory, else the watch will create
      // an infinite loop
      '!' + SITE_DIR + '_site/**',
      '!' + SITE_DIR + 'js/**'
    ],
    ['build-jekyll']
	  );
  });

  // Start the express server
  gulp.start('site');
});

gulp.task('site', function(done) {
	startExpress(EXPRESS_DOCS_ROOT);
	gutil.log('Server running at Docs for', gutil.colors.cyan('http://localhost:'+EXPRESS_PORT+'/'));
});

// Default task
gulp.task('default', ['scripts'], function() {
  startExpress(EXPRESS_ROOT);
  gulp.start('watch');
});
