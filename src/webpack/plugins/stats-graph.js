'use strict';

const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');

const cfg = require('../../config');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new WebpackVisualizerPlugin({
		filename: `${cfg.file.reports}/wp/index.html`
	}));

};
