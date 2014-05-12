var mkdirp = require('mkdirp');
var path = require('canonical-path');

module.exports = {
	create: function(config) {
		var currentVersion = config.get('currentVersion');

		var docsBase = path.join(config.get('basePath'), config.get('rendering.outputFolder'), 'docs');
		var versionDir = path.join(docsBase, currentVersion);

		// create the folders for the current version
		mkdirp.sync(versionDir);
	}
};
