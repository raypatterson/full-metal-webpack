'use strict';

const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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

};
