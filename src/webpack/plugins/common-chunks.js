'use strict';

const path = require('path');
const webpack = require('webpack');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Disable `common` JS if `webpackConfig.entry.length === 1`.
 */

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
		name: cfg.file.common,
		filename: path.join(cfg.wp.outputName, cfg.file.bundle.js),
		chunks: Object.keys(webpackConfig.entry).reduce((arr, key) => {

			arr.push(key);

			return arr;

		}, [])
	}));

};
