'use strict';

const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = webpackConfig => {

	/**
	 * TODO: Bar must repeat and persist due to inability to suppress other plugin writes to `sterr`
	 * https://github.com/clessg/progress-bar-webpack-plugin/issues/5#issuecomment-236483817
	 */
	webpackConfig.plugins.push(new ProgressBarPlugin({
		stream: process.stdout,
		clear: false
	}));

};
