'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const addHappyPackLoader = require('../utils/add-happy-pack-loader');
const addCachedLoader = require('../utils/add-cached-loader');
const getFilename = require('../utils/get-output-name');

module.exports = webpackConfig => {

	// PostCSS Loader

	/**
	 * NOTE: PoseCSS loader doesn't work with HappyPack
	 */

	// Allow PostCSS config to pass validation
	webpackConfig.webpackSchemaExtension.postcss = Joi.any();

	// Add PostCSS config
	webpackConfig.postcss = function postcss() {

		return [
			autoprefixer
		];

	};

	const postcssLoader = {
		/**
		 * NOTE: Need to use `-loader` suffix or webpack gets confused
		 * https://github.com/postcss/postcss-loader/issues/74#issuecomment-225773438
		 */
		loader: 'postcss-loader'
	};

	// CSS Loader

	const cssLoader = {
		loader: 'css-loader'
	};

	// SASS Loaders

	const SASS_LOADER_ID = 'sass';

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

	let sassLoaders = [{
		loader: 'sass-loader'
	}];

	sassLoaders = addHappyPackLoader(SASS_LOADER_ID, sassLoaders, webpackConfig);

	sassLoaders = [
		cssLoader,
		postcssLoader
	].concat(sassLoaders);

	sassLoaders = addCachedLoader(SASS_LOADER_ID, sassLoaders);

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

	const CSS_LOADER_ID = 'css';

	let cssLoaders = [
		cssLoader,
		postcssLoader
	];

	cssLoaders = addHappyPackLoader(CSS_LOADER_ID, cssLoaders, webpackConfig);

	cssLoaders = addCachedLoader(CSS_LOADER_ID, cssLoaders);

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
			getFilename(cfg.file.bundle.css), {
				allChunks: true
			}));

};
