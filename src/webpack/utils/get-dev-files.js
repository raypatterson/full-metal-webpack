'use strict';

const path = require('path');
const pkgup = require('pkg-up');

const cfg = require('@raypatterson/sws-config');

module.exports = function getDevFiles(webpackConfig) {

	const packageRoot = path.dirname(pkgup.sync(__dirname));
	const entryContext = webpackConfig.context;
	const relativePath = path.relative(entryContext, packageRoot);
	const nodeModules = path.join(relativePath, cfg.file.node);

	return [
		path.join(nodeModules, 'webpack/hot/dev-server'),
		`${path.join(nodeModules, 'webpack-dev-server/client')}?${cfg.server.url}/`
	];

};
