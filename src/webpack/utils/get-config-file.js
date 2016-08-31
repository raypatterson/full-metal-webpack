'use strict';

/**
 * TODO: Make everything async to enable the use of `cosmiconfig` maybe?
 * https://github.com/davidtheclark/cosmiconfig
 */

const path = require('path');
const pkgup = require('pkg-up');
const lookup = require('look-up');

const packageRoot = path.dirname(pkgup.sync(__dirname));
const projectRoot = path.dirname(pkgup.sync(process.cwd()));

module.exports = configName => {

	return lookup(`.${configName}rc.{js,json,yml,yaml}`, {
		cwd: projectRoot,
		dot: true
	}) || path.join(packageRoot, 'cfg', `${configName}.config.js`);

};
