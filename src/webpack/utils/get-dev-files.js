'use strict';

const path = require('path');

const cfg = require('../../config');

module.exports = function getDevFiles() {

	const nodeModules = path.join(cfg.file.pkg.root, cfg.file.node);

	return [
		path.join(nodeModules, 'webpack/hot/dev-server'),
		`${path.join(nodeModules, 'webpack-dev-server/client')}?${cfg.server.url}/`
	];

};
