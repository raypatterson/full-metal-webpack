'use strict';

const path = require('path');

const cfg = require('../../../cfg');

/**
 *  Config
 */

const webpackConfig = {
	entry: {},
	context: cfg.dir.absolute.source,
	output: {
		path: cfg.dir.absolute.dest,
		filename: path.join(cfg.wp.outputName, cfg.file.bundle.js),
		publicPath: cfg.wp.publicPath
	},
	resolve: {
		root: cfg.dir.cwd,
		extensions: [
			'',
			'.js'
		],
		modulesDirectories: [
			cfg.dir.node,
			cfg.dir.local,
			cfg.dir.source
		]
	},
	// Resolve Package loaders
	resolveLoader: {
		root: cfg.dir.pkg.root,
		modulesDirectories: [
			path.join(cfg.dir.pkg.root, cfg.dir.node)
		]
	},
	plugins: [],
	module: {
		preLoaders: [],
		loaders: [],
		postLoaders: []
	},
	devtool: '#inline-source-map',
	commonChunks: []
};

module.exports = webpackConfig;
