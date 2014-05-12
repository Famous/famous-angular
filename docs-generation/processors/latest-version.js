var copy = require('cp-r');
var mkdirp = require('mkdirp');
var path = require('canonical-path');

module.exports = {
  name: 'latest-version',
  runAfter: ['write-files'],
  description: 'Copy the latest version (that was compiled to docs/latest) into docs/versionName',
  process: function(docs, config) {
    var versionData = config.get('versionData');

    var docsBase = path.join(config.get('basePath'), config.get('rendering.outputFolder'), 'docs');
    var versionDir = path.join(docsBase, versionData.latest.name);
	  console.log(versionDir);
    var latestDir = path.join(docsBase, 'api');

    mkdirp(versionDir, function() {
	    copy(path.join(versionDir, 'api'), latestDir, {
		    deleteFirst: true
	    });
	    copy(path.join(versionDir, 'api'), path.join('docs', versionData.latest.name));
    });
  }
};
