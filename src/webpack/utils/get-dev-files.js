'use strict';

const path = require('path');
const pkgup = require('pkg-up');

const cfg = require('@raypatterson/sws-config');

module.exports = function getDevFiles() {

	const root = path.dirname(pkgup.sync(__dirname));

	const nodeModules = path.join(root, cfg.file.node);

	return [
		path.join(nodeModules, 'webpack/hot/dev-server'),
		`${path.join(nodeModules, 'webpack-dev-server/client')}?${cfg.server.url}/`
	];

};
