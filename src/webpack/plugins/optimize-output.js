'use strict';

const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
	webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

	webpackConfig.plugins.push(new OptimizeCssAssetsPlugin({
		cssProcessorOptions: {
			discardComments: {
				removeAll: true
			}
		}
	}));

	webpackConfig.plugins.push(new CompressionPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	}));

};
