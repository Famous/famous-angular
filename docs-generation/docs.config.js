var path = require('canonical-path');
var basePath = path.resolve(__dirname, '..');

var _ = require('lodash');

var basePackage = require('dgeni-packages/ngdoc');
var pkg = require('../package.json');

var SITE_DIR = '../famous-angular-docs/';

module.exports = function(config) {
	config.set('currentVersion', process.env.DOC_VERSION || 'unstable');

	config = basePackage(config);

	config.set('logging.level', 'info');

	config.prepend('rendering.templateFolders', [
		path.resolve(__dirname, 'templates')
	]);

	config.set('basePath', __dirname);
	config.set('source.projectPath', '.');
	config.set('rendering.outputFolder', SITE_DIR);

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
		{ pattern: 'dist/scripts/famous.angular.js', basePath: basePath }
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

	return config;
};
