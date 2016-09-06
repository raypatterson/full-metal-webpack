'use strict';

const OnlyIfChangedPlugin = require('only-if-changed-webpack-plugin');

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new OnlyIfChangedPlugin({
		cacheDirectory: cfg.file.absolute.cached,
		cacheIdentifier: cfg
	}));

};
