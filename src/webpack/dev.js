'use strict';

const _ = require('lodash');
const glob = require('globby');
const reqAll = require('req-all');
const webpack = require('webpack');

const cfg = require('@raypatterson/sws-config');

const addEntryPoint = require('./utils/add-entry-point');

const webpackConfigDefault = require('./defaults');

const webpackConfig = Object.assign({}, webpackConfigDefault);

webpackConfig.entry = glob.sync(
		cfg.pattern.js, {
			cwd: cfg.file.absolute.pages
		})
	.reduce((entryObject, entryPath) => {

		return addEntryPoint(entryObject, entryPath, webpackConfig);

	}, {});

/**
 * Import loader presets
 * TODO: Import project loaders
 */
_.each(reqAll('./loaders'), loader => loader(webpackConfig));

/**
 * Import plugin presets (order matters)
 * TODO: Import project plugins
 */
webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

[
	'./plugins/clean-dest',
	'./plugins/debug-flag',
	'./plugins/common-chunks',
	'./plugins/split-path',
	'./plugins/stats-graph',
	'./plugins/open-browser'

].forEach(pluginPath => {

	require(pluginPath)(webpackConfig);

});

module.exports = webpackConfig;
