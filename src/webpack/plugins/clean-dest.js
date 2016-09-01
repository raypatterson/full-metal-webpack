'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new CleanWebpackPlugin([
		cfg.file.dest
	], {
		root: cfg.file.cwd,
		verbose: true,
		dry: false
	}));

};
