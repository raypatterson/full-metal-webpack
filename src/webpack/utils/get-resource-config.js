'use strict';

/**
 * TODO: Make everything async to enable the use of `cosmiconfig` maybe?
 * https://github.com/davidtheclark/cosmiconfig
 */

const path = require('path');
const glob = require('globby');

const projectRoot = require('./get-project-root');
const packageRoot = require('./get-package-root');

const packageConfigPath = path.join(packageRoot, 'cfg');

const getConfig = (configName, cwd) => glob.sync(
	[
		`.${configName}rc`,
		`.${configName}rc.{js,json,yml,yaml}`,
		`${configName}.config.{js,json,yml,yaml}`
	], {
		cwd
	})[0];

module.exports = configName => {

	const projectConfig = getConfig(configName, projectRoot);
	const packageConfig = getConfig(configName, packageConfigPath);
	return projectConfig ?
		path.join(projectRoot, projectConfig) :
		path.join(packageConfigPath, packageConfig);

};
