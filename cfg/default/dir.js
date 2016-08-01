'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const argv = require('yargs')
	.argv;

const source = 'src';
const common = 'common';
const dist = 'dist';
const temp = '.tmp';
const dump = path.join(source, '.dmp');

const config = {

	// Application & Presentation
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
	dest: argv.production ? dist : temp,

	// Assets common to all app entry points
	common,

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
config.absolute = Object.keys(config)
	.reduce((absolute, key) => {

		absolute[key] = path.join(cwd, config[key]);
		return absolute;

	}, {});

// Add objects so previous doesn't have to type check
config.cwd = cwd;
config.pkg = {
	path: pkgPath,
	root: pkgRoot
};

module.exports = config;
