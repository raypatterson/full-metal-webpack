'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const argv = require('yargs').argv;

const source = 'src';
const common = 'common';
const manifest = 'manifest';
const vendor = 'vendor';
const reports = 'reports';
const dist = 'dist';
const temp = '.tmp';
const dump = path.join(source, '.dmp');
const dest = argv.production ? dist : temp;

const config = {};

const directories = {

	/**
	 *  Application & Presentation
	 */

	// Presentation layer source
	source,

	// Page specific resources
	pages: path.join(source, 'pages'),

	// Modular resources
	modules: path.join(source, 'modules'),

	// Build 'dest' sub directories
	dist,
	temp,
	dump,
	dest,

	// Assets common to all app entry points
	common,

	// 3rd party vendor libraries
	vendor,

	/**
	 * TODO: Figure out why a manifest needs to be split out...
	 */
	manifest,

	// Reports, graphs, etc.
	reports,

	// These 'common' map 1:1 from source to dest, and so are useful for copying
	favicons: path.join(common, 'favicons'),
	images: path.join(common, 'images'),
	fonts: path.join(common, 'fonts'),
	data: path.join(common, 'data'),

	// Packages, libraries, pre-NPM modules
	node: 'node_modules',
	local: 'local_modules'
};

const cwd = process.cwd();
const pkgPath = pkgup.sync(__dirname);
const pkgRoot = path.dirname(pkgPath);

// Good for webpack
directories.absolute = Object.keys(directories)
	.reduce((absolute, key) => {

		absolute[key] = path.join(cwd, directories[key]);
		return absolute;

	}, {});

// Add objects so previous doesn't have to type check
directories.cwd = cwd;
directories.pkg = {
	path: pkgPath,
	root: pkgRoot
};

// Add file names
Object.assign(config, directories, {
	index: 'index',
	config: 'config',
	extensions: {
		js: 'js',
		css: 'css',
		html: 'html',
		tmpl: 'ejs'
	}
});

module.exports = config;
