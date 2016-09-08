'use strict';

const Joi = require('webpack-validator').Joi;
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Figure out why cache loader doesn't work with images.
 */

module.exports = webpackConfig => {

	const imagesLoaders = [{
		loader: 'url-loader',
		query: {
			limit: cfg.wp.maxInlineFileSizeLimit,
			name: cfg.wp.outputPath
		}
	}];

	if (cfg.production) {

		imagesLoaders.push({
			loader: 'image-webpack'
		});

	}

	// Allow Image Compression config to pass validation
	webpackConfig.webpackSchemaExtension.imageWebpackLoader = Joi.any();

	webpackConfig.imageWebpackLoader = {
		pngquant: {
			quality: '65-90',
			speed: 4
		},
		svgo: {
			plugins: [{
				removeViewBox: false
			}, {
				removeEmptyAttrs: false
			}]
		}
	};

	// Add Images Loader
	webpackConfig.module.loaders.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: combineLoaders(imagesLoaders)
	});

};
