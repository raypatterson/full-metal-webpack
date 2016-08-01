'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');

const cfg = require('../../../cfg');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new CleanWebpackPlugin(cfg.dir.dest, {
		root: cfg.dir.absolute.source,
		verbose: true,
		dry: false
	}));

};
