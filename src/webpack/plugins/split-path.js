'use strict';

const SplitByPathPlugin = require('webpack-split-by-path');

const cfg = require('../../../cfg');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new SplitByPathPlugin([{
		name: cfg.dir.vendor,
		path: cfg.dir.absolute.node
	}], {
		manifest: cfg.dir.manifest
	}));

};
