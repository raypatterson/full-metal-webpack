'use strict';

const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

module.exports = function addPlugins(webpackConfig) {

	/**
	 * Import plugin presets (order matters)
	 * TODO: Import project plugins
	 */
	webpackConfig.plugins.push(new ForceCaseSensitivityPlugin());
	webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
	webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

	/**
	 * TODO: Not sure how to add this plugin and use ESLint warning
	 * https://github.com/MoOx/eslint-loader#noerrorsplugin
	 */
	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

	[
		'../plugins/clean-dest',
		'../plugins/debug-flag',
		'../plugins/lint-styles',
		'../plugins/common-chunks',
		'../plugins/split-path',
		/**
		 * TODO: Production Only: Optimize CSS
		 */
		'../plugins/optimize-css',
		/**
		 * TODO: Production Only: Generate stats
		 */
		'../plugins/stats-graph',
		'../plugins/open-browser'

	].forEach(pluginPath => {

		require(pluginPath)(webpackConfig);

	});

};
