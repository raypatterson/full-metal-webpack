'use strict';

const path = require('path');
const HappyPack = require('happypack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const getCachedLoader = require('../utils/get-cached-loader');

const SASS_LOADER_ID = 'happy-sass';

const cssLoaders = getCachedLoader('style', [{
	loader: 'css-loader'
}, {
	/**
	 * NOTE: Need to use `-loader` suffix or webpack gets confused
	 * https://github.com/postcss/postcss-loader/issues/74#issuecomment-225773438
	 */
	loader: 'postcss-loader'
}]);

const sassLoaders = cssLoaders.concat([{
	loader: `happypack/loader?id=${SASS_LOADER_ID}`
}]);

module.exports = webpackConfig => {

	// Allow PostCSS config to pass validation
	webpackConfig.webpackSchemaExtension.postcss = Joi.any();

	// Add PostCSS config
	webpackConfig.postcss = function postcss() {

		return [
			autoprefixer
		];

	};

	// Allow SASS config to pass validation
	webpackConfig.webpackSchemaExtension.sassLoader = Joi.any();

	// Add SASS config
	webpackConfig.sassLoader = {
		includePaths: [
			cfg.file.node,
			cfg.file.local,
			cfg.file.source
		],
		root: cfg.file.source,
		outputStyle: 'expanded'
	};

	// Add SASS HappyPack
	webpackConfig.plugins.push(new HappyPack({
		id: SASS_LOADER_ID,
		threads: 4,
		loaders: [
			'sass-loader'
		]
	}));

	// Add SASS Loader
	webpackConfig.module.loaders.push({
		test: /\.scss$/i,
		loader: ExtractTextPlugin.extract(
			'style-loader',
			combineLoaders(sassLoaders), {
				publicPath: cfg.wp.publicPath
			})
	});

	// Add CSS Loader
	webpackConfig.module.loaders.push({
		test: /\.css$/i,
		loader: ExtractTextPlugin.extract(
			'style-loader',
			combineLoaders(cssLoaders)
		)
	});

	// Configure ExtractTextPlugin
	webpackConfig.plugins.push(
		new ExtractTextPlugin(
			path.join(cfg.wp.outputName, cfg.file.bundle.css), {
				allChunks: true
			}));

};
