'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const fs = require('fs-jetpack');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

/**
 *  Config
 */

const defaultFilename = path.join(cfg.wp.outputName, cfg.file.bundle.js);

const projectRoot = path.dirname(pkgup.sync(process.cwd()));
const packageRoot = path.dirname(pkgup.sync(__dirname));

const resolveLoaderModulesDir = path.join(packageRoot, cfg.file.node);
/**
 * TODO: Make sure this check works with NPM 2.x
 */
const isPackageLinked = (fs.exists(resolveLoaderModulesDir) === 'dir');

console.log('projectRoot', projectRoot);
console.log('packageRoot', packageRoot);
console.log('resolveLoaderModulesDir', resolveLoaderModulesDir);
console.log('isPackageLinked', isPackageLinked);

const resolveLoaderRoot = isPackageLinked ? packageRoot : projectRoot;

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
		root: resolveLoaderRoot,
		modulesDirectories
		// ,
		// fallback: [
		// 	path.join(root, cfg.file.node)
		// ]
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
