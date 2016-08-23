'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

const root = path.dirname(pkgup.sync(__dirname));

const modulesDirectories = [
	cfg.file.node,
	cfg.file.local,
	cfg.file.source
];

const webpackConfig = {
	entry: {},
	context: cfg.file.absolute.source,
	output: {
		path: cfg.file.absolute.dest,
		filename: defaultFilename,
		chunkFilename: defaultFilename,
		publicPath: cfg.wp.publicPath
	},
	resolve: {
		root: cfg.file.cwd,
		extensions: [
			'',
			'.js'
		],
		modulesDirectories
	},
	// Resolve Package loaders
	resolveLoader: {
		root,
		modulesDirectories
	},
	plugins: [],
	module: {
		preLoaders: [],
		loaders: [],
		postLoaders: []
	},
	devtool: '#inline-source-map',
	// Allow validation for custom loader configs
	webpackSchemaExtension: {
		webpackSchemaExtension: Joi.any()
	}
};

module.exports = webpackConfig;
