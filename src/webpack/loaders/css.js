'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cfg = require('../../../cfg');

module.exports = webpackConfig => {

	webpackConfig.sassLoader = {
		includePaths: [
			cfg.dir.node,
			cfg.dir.local,
			cfg.dir.source
		],
		root: cfg.dir.source,
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
