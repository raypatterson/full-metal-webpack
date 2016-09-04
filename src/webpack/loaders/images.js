'use strict';

const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Figure out why cache loader doesn't work with images.
 */

// const getCachedLoader = require('../utils/get-cached-loader');
//
// const imageLoaders = combineLoaders(getCachedLoader('image', [{
// 	loader: 'url-loader',
// 	query: {
// 		limit: cfg.wp.maxInlineFileSizeLimit,
// 		name: cfg.wp.outputPath
// 	}
// }]));

const imageLoaders = combineLoaders([{
	loader: 'url-loader',
	query: {
		limit: cfg.wp.maxInlineFileSizeLimit,
		name: cfg.wp.outputPath
	}
}]);

module.exports = webpackConfig => {

	// Add Images Loader
	webpackConfig.module.loaders.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: imageLoaders
	});

};
