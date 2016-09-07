'use strict';

const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Figure out why cache loader doesn't work with images.
 */

module.exports = webpackConfig => {

	const imageLoaders = [{
		loader: 'url-loader',
		query: {
			limit: cfg.wp.maxInlineFileSizeLimit,
			name: cfg.wp.outputPath
		}
	}];

	// Add Images Loader
	webpackConfig.module.loaders.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: combineLoaders(imageLoaders)
	});

};
