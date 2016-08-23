'use strict';

const path = require('path');

const cfg = require('../config');

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

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
		root: cfg.file.pkg.root,
		modulesDirectories
	},
	plugins: [],
	module: {
		preLoaders: [],
		loaders: [],
		postLoaders: []
	},
	devtool: '#inline-source-map'
};

module.exports = webpackConfig;
