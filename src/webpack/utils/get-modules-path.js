'use strict';

/**
 * This util is necessary to develop with NPM link.
 */

const path = require('path');
const fs = require('fs-jetpack');

const NODE_MODULES = 'node_modules';

const projectRoot = require('./get-project-root');
const packageRoot = require('./get-package-root');

const projectModules = path.join(projectRoot, NODE_MODULES);
const packageModules = path.join(packageRoot, NODE_MODULES);

module.exports = (fs.exists(packageModules) === 'dir') ? {
	root: packageRoot,
	node: packageModules
} : {
	root: projectRoot,
	node: projectModules
};
