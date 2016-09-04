'use strict';

const path = require('path');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const modulesPath = require('./utils/get-modules-path');

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

const resolveLoaderRoot = modulesPath.root;

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
		publicPath: cfg.wp.publicPath,
		pathinfo: cfg.debug
	},
	resolve: {
		alias: {},
		root: cfg.file.cwd,
		extensions: [
			'',
			'.js'
		],
		modulesDirectories
	},
	// Resolve Package loaders
	resolveLoader: {
		root: resolveLoaderRoot,
		modulesDirectories,
		/**
		 * TODO: Figure out why loader won't resolve without a fallback.
		 */
		fallback: path.join(resolveLoaderRoot, cfg.file.node)
	},
	plugins: [],
	module: {
		preLoaders: [],
		loaders: [],
		postLoaders: []
	},
	cache: true, // !cfg.production,
	debug: cfg.debug,
	devtool: cfg.debug ? 'cheap-module-inline-source-map' : false,
	// Allow validation for custom loader configs
	webpackSchemaExtension: {
		webpackSchemaExtension: Joi.any()
	}
};

module.exports = webpackConfig;
