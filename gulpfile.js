var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/app';
var EXPRESS_DOCS_ROOT = __dirname + '/angus-site/_site';
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
  .pipe(concat('famous-angular.js'))
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
	      '!app/scripts/famous-angular.js',
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
	gulp.src('app/styles/famous.css')
	.pipe(gulp.dest('dist/css'))
	.pipe(minifycss())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/css'))
  /*
  * Make the filename exactly match the bower repo's dir name,
  * e.g. famous-angular/famous-angular.js, to ensure compatibility with
  * yeoman's default gruntfile
  */
	return gulp.src('app/scripts/famous-angular.js')
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
	return gulp.src('./angus-site/scss/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./angus-site/css'))
		.pipe(exec("jekyll build --source ./angus-site/ --destination ./angus-site/_site/"))
		.pipe(notify({ message: 'Jekyll build task complete' }));
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
