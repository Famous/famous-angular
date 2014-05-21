var SITE_DIR = 'famous-angular-docs/';
var EXAMPLES_DIR = 'famous-angular-examples/';

var EXPRESS_PORT = 4000;
var EXPRESS_DOCS_ROOT = __dirname + '/' + SITE_DIR + '_site';

var LIVERELOAD_PORT = 35729;

// Load plugins
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  livereload = require('gulp-livereload'),
  server = livereload(),
  gutil = require('gulp-util'),
  pkg = require('./package.json'),
  exec = require('gulp-exec');

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/'], {read: false})
  .pipe(clean());
});

// Build for dist
gulp.task('build', ['clean'], function(event) {

	var header = require('gulp-header');
	var banner = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
		' * @version v<%= pkg.version %>',
		' * @link <%= pkg.homepage %>',
		' * @license <%= pkg.license %>',
		' */',
		''].join('\n');


  // Build the CSS
  gulp.src([
    'src/styles/famous-angular.css'
  ])
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest('dist/'))
  .pipe(minifycss())
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/'));


  // Build the JS
	return gulp.src([
		'src/scripts/services/**/*.js',
		'src/scripts/directives/**/*.js'
	])
	.pipe(concat('famous-angular.js'))
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest('dist/'))
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(header(banner, { pkg : pkg } ))
	.pipe(gulp.dest('dist/'))
	.pipe(notify({ message: 'Build task complete' }));
});

gulp.task('docs', ['build'], function(done) {
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


/***********************************************************************
 * Watch task for developing with the famous-angular-examples submodule
 ***********************************************************************/
gulp.task('build-to-examples', ['clean'], function(event) {
	return gulp.src([
		'src/scripts/services/**/*.js',
		'src/scripts/directives/**/*.js'
	])
	.pipe(concat('famous-angular.js'))
	.pipe(gulp.dest(EXAMPLES_DIR + 'app/bower_components/famous-angular/dist/'))
	.pipe(notify({ message: 'Build task complete' }));
})

// Watch
gulp.task('watch-examples', function(event) {
	var server = livereload();
	// Watch .js files
	gulp.watch([
			'src/scripts/*/**/*.js',
			EXAMPLES_DIR + 'app/*'
		],
		['build-to-examples', 'build']
	).on('change',
		function(file){
			server.changed(file.path);
		}
	);
});

// Default task
gulp.task('dev', function() {
	var express = require('express');
	var app = express();
	app.use(require('connect-livereload')());
	app.use(express.static(EXAMPLES_DIR + 'app/'));
	app.listen(EXPRESS_PORT);
	gulp.start('watch-examples');
});
