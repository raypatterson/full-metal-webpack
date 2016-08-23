'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

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
			'css?sourceMap!sass', {
				publicPath: cfg.wp.publicPath
			})
	});

	webpackConfig.module.loaders.push({
		test: /\.css$/i,
		loader: ExtractTextPlugin.extract(
			'style',
			'css?sourceMap'
		)
	});

	webpackConfig.plugins.push(
		new ExtractTextPlugin(
			path.join(cfg.wp.outputName, cfg.file.bundle.css), {
				allChunks: true
			}));

};
