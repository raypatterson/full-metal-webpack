'use strict';

const path = require('path');
const WebpackVisualizerPlugin = require('webpack-visualizer-plugin');
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
const StatsPlugin = require('stats-webpack-plugin');

const cfg = require('@raypatterson/sws-config');

const dest = path.join(cfg.file.reports, 'stats');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new WebpackVisualizerPlugin({
		filename: path.join(dest, 'index.html')
	}));

	webpackConfig.plugins.push(new StatsWriterPlugin({
		filename: path.join(dest, 'stats-custom.json')
	}));

	webpackConfig.plugins.push(new StatsPlugin(path.join(dest, 'stats.json')));

};
