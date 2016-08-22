'use strict';

const path = require('path');

const cfg = require('../../../cfg');

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

const modulesDirectories = [
	cfg.dir.node,
	cfg.dir.local,
	cfg.dir.source
];

const webpackConfig = {
	entry: {},
	context: cfg.dir.absolute.source,
	output: {
		path: cfg.dir.absolute.dest,
		filename: defaultFilename,
		chunkFilename: defaultFilename,
		publicPath: cfg.wp.publicPath
	},
	resolve: {
		root: cfg.dir.cwd,
		extensions: [
			'',
			'.js'
		],
		modulesDirectories
	},
	// Resolve Package loaders
	resolveLoader: {
		root: cfg.dir.pkg.root,
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
