'use strict';

const path = require('path');
const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new WebpackVisualizerPlugin({
		filename: path.join(cfg.file.reports, 'stats.html')
	}));

	webpackConfig.plugins.push(new StatsWriterPlugin({
		filename: path.join(cfg.file.reports, 'stats.json')
	}));

};
