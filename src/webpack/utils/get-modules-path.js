'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const fs = require('fs-jetpack');

const NODE_MODUELS = 'node_modules';

const projectRoot = path.dirname(pkgup.sync(process.cwd()));
const projectModules = path.join(projectRoot, NODE_MODUELS);

const packageRoot = path.dirname(pkgup.sync(__dirname));
const packageModules = path.join(packageRoot, NODE_MODUELS);

module.exports = (fs.exists(packageModules) === 'dir') ? {
	root: packageRoot,
	node: packageModules
} : {
	root: projectRoot,
	node: projectModules
};
