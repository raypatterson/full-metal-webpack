'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const fs = require('fs-jetpack');

const cfg = require('@raypatterson/sws-config');

const projectRoot = path.dirname(pkgup.sync(process.cwd()));
const projectModules = path.join(projectRoot, cfg.file.node);

const packageRoot = path.dirname(pkgup.sync(__dirname));
const packageModules = path.join(packageRoot, cfg.file.node);

module.exports = (fs.exists(packageModules) === 'dir') ? {
	root: packageRoot,
	node: packageModules
} : {
	root: projectRoot,
	node: projectModules
};
