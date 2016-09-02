'use strict';

const SplitByPathPlugin = require('webpack-split-by-path');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Optimize code code splitting by combining `manifest` and `common` JS.
 */

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new SplitByPathPlugin([{
		name: cfg.file.vendor,
		path: cfg.file.absolute.node
	}], {
		manifest: cfg.file.manifest
	}));

};
