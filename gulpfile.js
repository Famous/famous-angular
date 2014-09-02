var EXAMPLES_DIR = 'famous-angular-examples/';
var EXPRESS_PORT = 4000;

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
  gutil = require('gulp-util'),
  exec = require('gulp-exec'),
  inject = require('gulp-inject'),
  filter = require('gulp-filter'),
  ngAnnotate = require('gulp-ng-annotate'),
  pkg = require('./package.json');

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/'], {read: false})
  .pipe(clean());
});

// Update Famous dependencies
gulp.task('update-dependencies', function() {
  return gulp.src('./src/scripts/services/famous.js')
  .pipe(
    inject(
      gulp.src(['src/scripts/famous/**/*.js'], {read: false}).pipe(filter('!**/Gruntfile.js')), {
        starttag: 'var requirements = [',
        endtag: '];',
        transform: function (filepath, file, i, length) {
          return '"' + filepath.substr(13, (filepath.length - 16)) + '"' +
                (i + 1 < length ? ',' : '');
        }
      }
    )
  )
  .pipe(gulp.dest('./src/scripts/services/'));
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
    'src/scripts/module.js',
    'src/scripts/services/**/*.js',
    'src/scripts/directives/**/*.js'
  ])
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(concat('famous-angular.js'))
  .pipe(header(banner, { pkg : pkg } ))
  .pipe(ngAnnotate())
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
gulp.task('build-to-examples', ['clean', 'build'], function(event) {
  gulp.src([
    'src/scripts/module.js',
    'src/scripts/services/**/*.js',
    'src/scripts/directives/**/*.js'
  ])
  .pipe(concat('famous-angular.js'))
  .pipe(gulp.dest(EXAMPLES_DIR + 'app/bower_components/famous-angular/dist/'));

  return gulp.src('src/styles/famous-angular.css')
  .pipe(gulp.dest(EXAMPLES_DIR + 'app/bower_components/famous-angular/dist/'))
  .pipe(notify({ message: 'Build task complete' }));

})

// Watch
gulp.task('watch-examples', function(event) {
  var livereload = require('gulp-livereload');
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

var promptBump = function(callback) {
  var prompt = require('gulp-prompt');
  var semver = require('semver');

  return gulp.src('')
    .pipe(prompt.prompt({
      type: 'list',
      name: 'bump',
      message: 'What type of version bump would you like to do ? (current version is '+pkg.version+')',
      choices: [
        'patch ('+pkg.version+' --> '+semver.inc(pkg.version, 'patch')+')',
        'minor ('+pkg.version+' --> '+semver.inc(pkg.version, 'minor')+')',
        'major ('+pkg.version+' --> '+semver.inc(pkg.version, 'major')+')',
        'none (exit)'
      ]
    }, function(res){var newVer;
      if(res.bump.match(/^patch/)) {
        newVer = semver.inc(pkg.version, 'patch');
      } else if(res.bump.match(/^minor/)) {
        newVer = semver.inc(pkg.version, 'minor');
      } else if(res.bump.match(/^major/)) {
        newVer = semver.inc(pkg.version, 'major');
      }
      if(newVer && typeof callback === 'function') {
        return callback(newVer);
      } else {
        return;
      }
    }));
}

var makeChangelog = function(newVer) {
  var streamqueue = require('streamqueue');
  var stream = streamqueue({ objectMode: true });

  stream.queue(gulp.src('').pipe(exec('node ./changelog.js ' + newVer, { pipeStdout: true })));
  stream.queue(gulp.src('CHANGELOG.md'));

  return stream.done()
    .pipe(concat('CHANGELOG.md'))
    .pipe(gulp.dest('./'));
}

// Make changelog
gulp.task('changelog', function(event) {
  var prompt = require('gulp-prompt');
  var semver = require('semver');

  return promptBump(makeChangelog);
})

gulp.task('release', ['docs'], function() { // docs task includes build task
  var jeditor = require("gulp-json-editor");

  return promptBump(function(newVer) {
    var streamqueue = require('streamqueue');
    var stream = streamqueue({ objectMode: true });

    // make the changelog
    stream.queue(makeChangelog(newVer));

    // update the main project version number
    stream.queue(
      gulp.src('package.json')
      .pipe(jeditor({
        'version': newVer
      }))
      .pipe(gulp.dest("./"))
    );

    stream.queue(
      gulp.src('bower.json')
      .pipe(jeditor({
        'version': newVer
      }))
      .pipe(gulp.dest("./"))
    );

    // update docs dependency
    stream.queue(
      gulp.src('famous-angular-docs/bower.json')
      .pipe(jeditor(function(json) {
            json.dependencies['famous-angular'] = newVer;
        return json; // must return JSON object.
      }))
      .pipe(gulp.dest("famous-angular-docs"))
    );

    // update examples dependency
    stream.queue(
      gulp.src(EXAMPLES_DIR+'bower.json')
      .pipe(jeditor(function(json) {
        json.dependencies['famous-angular'] = newVer;
        return json; // must return JSON object.
      }))
      .pipe(gulp.dest(EXAMPLES_DIR))
    );

    return stream.done();
  });
})

gulp.task('jasmine', function() {
  var jasmine = require('gulp-jasmine');

  return gulp.src('test/**/*Test.js')
    .pipe(jasmine());
})

// Default task
gulp.task('dev', ['build-to-examples'], function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXAMPLES_DIR + 'app/'));
  app.listen(EXPRESS_PORT);
  gulp.start('watch-examples');
});
