'use strict';

const webpack = require('webpack');

module.exports = function addPlugins(webpackConfig) {

	/**
	 * Import plugin presets (order matters)
	 * TODO: Import project plugins
	 */
	webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

	[
		'../plugins/clean-dest',
		'../plugins/debug-flag',
		'../plugins/common-chunks',
		'../plugins/split-path',
		'../plugins/stats-graph',
		'../plugins/open-browser'

	].forEach(pluginPath => {

		require(pluginPath)(webpackConfig);

	});

};
