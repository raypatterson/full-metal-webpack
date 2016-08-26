'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const autoprefixer = require('autoprefixer');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const cssLoader = [
	{
		loader: 'css',
		query: {
			sourceMap: true
		}
	}, {
		/**
		 * Need to use `-loader` suffix or webpack gets confused
		 * https://github.com/postcss/postcss-loader/issues/74#issuecomment-225773438
		 */
		loader: 'postcss-loader'
	}
];

const sassLoader = cssLoader.concat([{
	loader: 'sass'
}]);

module.exports = webpackConfig => {

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

	webpackConfig.module.loaders.push({
		test: /\.scss$/i,
		loader: ExtractTextPlugin.extract(
			'style',
			combineLoaders(sassLoader), {
				publicPath: cfg.wp.publicPath
			})
	});

	webpackConfig.module.loaders.push({
		test: /\.css$/i,
		loader: ExtractTextPlugin.extract(
			'style',
			combineLoaders(cssLoader)
		)
	});

	// Allow PostCSS config to pass validation
	webpackConfig.webpackSchemaExtension.postcss = Joi.any();

	// Add PostCSS config
	webpackConfig.postcss = function postcss() {

		return [
			autoprefixer
		];

	};

	webpackConfig.plugins.push(
		new ExtractTextPlugin(
			path.join(cfg.wp.outputName, cfg.file.bundle.css), {
				allChunks: true
			}));

};
