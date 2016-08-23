'use strict';

const SplitByPathPlugin = require('webpack-split-by-path');

const cfg = require('../../config');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new SplitByPathPlugin([{
		name: cfg.file.vendor,
		path: cfg.file.absolute.node
	}], {
		manifest: cfg.file.manifest
	}));

};
