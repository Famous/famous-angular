var _ = require('lodash');
var fs = require('fs');
var semver = require('semver');
var path = require('canonical-path');
var createFolders = require('./processors/create-folders');

module.exports = function(config) {
  var basePath = config.get('basePath');
  var outputFolder = config.get('rendering.outputFolder');
  var currentVersion = config.get('currentVersion');

  var docsBaseFolder = path.resolve(basePath, outputFolder, 'docs');

  createFolders.create(config);
  var versions = fs.readdirSync(docsBaseFolder)
    .filter(semver.valid)
    .sort(semver.rcompare);

  !_.contains(versions, currentVersion) && versions.unshift(currentVersion);
  !_.contains(versions, 'unstable') && versions.unshift('unstable');

  //First semver valid version is latest
  var latestVersion = _.find(versions, semver.valid);
  versions = versions.map(function(version) {
    //Latest version is in docs root
    var folder = version == latestVersion ? '' : version;
    return {
      href: path.join('/docs', folder),
      folder: folder,
      name: version
    };
  });

  return {
    list: versions,
    current: _.find(versions, { name: currentVersion }),
    latest: _.find(versions, {name: latestVersion}) || _.first(versions)
  };
};
