'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

	// Allow config to pass validation
	webpackConfig.webpackSchemaExtension.sassLoader = Joi.any();

	// Add config
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
			combineLoaders([
				{
					loader: 'css',
					query: {
						sourceMap: true
					}
				}, {
					loader: 'sass'
				}
			]), {
				publicPath: cfg.wp.publicPath
			})
	});

	webpackConfig.module.loaders.push({
		test: /\.css$/i,
		loader: ExtractTextPlugin.extract(
			'style',
			combineLoaders([
				{
					loader: 'css',
					query: {
						sourceMap: true
					}
				}
			])
		)
	});

	webpackConfig.plugins.push(
		new ExtractTextPlugin(
			path.join(cfg.wp.outputName, cfg.file.bundle.css), {
				allChunks: true
			}));

};
