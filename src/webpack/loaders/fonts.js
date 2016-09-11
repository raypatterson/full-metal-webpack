'use strict';

const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const addHappyPackLoader = require('../utils/add-happy-pack-loader');
const addCachedLoader = require('../utils/add-cached-loader');
const outputPath = require('../utils/get-output-path');

module.exports = webpackConfig => {

	// Woff Loaders

	const WOFF_LOADER_ID = 'woff';

	let woffLoaders = [{
		loader: 'url-loader',
		query: {
			name: outputPath,
			limit: cfg.wp.maxInlineFileSizeLimit,
			mimetype: 'application/font-woff'
		}
	}];

	woffLoaders = addHappyPackLoader(WOFF_LOADER_ID, woffLoaders, webpackConfig);

	woffLoaders = addCachedLoader(WOFF_LOADER_ID, woffLoaders);

	webpackConfig.module.loaders.push({
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
		loader: combineLoaders(woffLoaders)
	});

	// Font Loaders

	const FONT_LOADER_ID = 'font';

	let fontLoaders = [{
		loader: 'file-loader',
		query: {
			name: outputPath
		}
	}];

	fontLoaders = addHappyPackLoader(FONT_LOADER_ID, fontLoaders, webpackConfig);

	fontLoaders = addCachedLoader(FONT_LOADER_ID, fontLoaders);

	webpackConfig.module.loaders.push({
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		loader: combineLoaders(fontLoaders)
	});

};
