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
	cfg.file.local
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
		root: [
			/**
			 * NOTE: Helps to point webpack directly to the source.
			 * https://github.com/webpack/webpack/issues/472#issuecomment-55706013
			 */
			cfg.file.absolute.source
		],
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
	prePlugins: [],
	plugins: [],
	postPlugins: [],
	module: {
		preLoaders: [],
		loaders: [],
		postLoaders: []
	},
	cache: cfg.production === false,
	debug: cfg.production === false,
	devtool: cfg.production ? false : 'cheap-module-inline-source-map'
};

// Allow validation for custom loader configs
webpackConfig.webpackSchemaExtension = {
	webpackSchemaExtension: Joi.any()
};

module.exports = webpackConfig;
