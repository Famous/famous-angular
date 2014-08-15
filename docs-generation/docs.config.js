var path = require('canonical-path');
var basePath = path.resolve(__dirname, '..');

var _ = require('lodash');

var basePackage = require('dgeni-packages/ngdoc');
var examplesPackage = require('dgeni-packages/examples');
var cdnUrl = "//ajax.googleapis.com/ajax/libs/angularjs/1.2.21/";
var pkg = require('../package.json');

var SITE_DIR = '../famous-angular-docs/';

var getVersion = function(component, sourceFolder, packageFile) {
  sourceFolder = sourceFolder || '../bower_components';
  packageFile = packageFile || 'bower.json';
  return require(path.join(sourceFolder,component,packageFile)).version;
};

var cdnUrl = "//ajax.googleapis.com/ajax/libs/angularjs/" + getVersion('angular');

module.exports = function(config) {
	config.set('currentVersion', process.env.DOC_VERSION || 'unstable');

	config = basePackage(config);
  config = examplesPackage(config);

	config.set('logging.level', 'info');

	config.prepend('rendering.templateFolders', [
		path.resolve(__dirname, 'templates')
	]);

	config.set('basePath', __dirname);
	config.set('source.projectPath', '.');
	config.set('rendering.outputFolder', SITE_DIR);
	config.set('rendering.examples.outputFolder', SITE_DIR);

	var versionData = require('./generate-versions')(config);
	config.set('versionData', versionData);
	config.set('rendering.contentsFolder', path.join('docs', versionData.current.folder));

	config.set('processing.api-docs', {
		outputPath: 'api/${docType}/${name}/index.md',
		path: 'api/${docType}/${name}/',
		moduleOutputPath: 'api/module/${name}/index.md',
		modulePath: 'api/module/${name}/'
	});

	config.append('rendering.filters', [
		require('./filters/capital')
	]);

	config.set('source.files', [
		{ pattern: 'src/scripts/**/*.js', basePath: basePath }
	]);

	config.append('processing.inlineTagDefinitions', [
		require('./inline-tag-defs/link')
	]);

	config.append('processing.tagDefinitions', require('./tag-defs'));

	//Don't conflict with the jekyll tags
	config.set('rendering.nunjucks.config.tags', {
		blockStart: '<@',
		blockEnd: '@>',
		variableStart: '<$',
		variableEnd: '$>',
		commentStart: '<#',
		commentEnd: '#>'
	});

	config.append('processing.processors', [
		require('./processors/latest-version'),
		require('./processors/keywords'),
		require('./processors/pages-data'),
		require('./processors/index-page'),
		require('./processors/version-data'),
		require('./processors/jekyll')
	]);

  // config for examples iframes
  config.merge('deployment', {
    environments: [{
      name: 'default',
      examples: {
        commonFiles: {
          scripts: [
            'https://code.famo.us/famous/global/0.2.2/famous.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.2.22/angular.min.js',
            '../../bower_components/famous-angular/dist/famous-angular.min.js'
          ],
          stylesheets: []
        }
      }
    }]
  });

	return config;
};
