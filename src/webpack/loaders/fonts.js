'use strict';

const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const getCachedLoader = require('../utils/get-cached-loader');

const woffLoaders = combineLoaders(getCachedLoader('woff', [{
	loader: 'url-loader',
	query: {
		name: cfg.wp.outputPath,
		limit: cfg.wp.maxInlineFileSizeLimit,
		mimetype: 'application/font-woff'
	}
}]));

const fontLoaders = combineLoaders(getCachedLoader('font', [{
	loader: 'file-loader',
	query: {
		name: cfg.wp.outputPath
	}
}]));

module.exports = webpackConfig => {

	webpackConfig.module.loaders.push({
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
		loader: woffLoaders
	});

	webpackConfig.module.loaders.push({
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		loader: fontLoaders
	});

};
