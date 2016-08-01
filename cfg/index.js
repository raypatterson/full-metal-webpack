'use strict';

const _ = require('lodash');
const deepFreeze = require('deep-freeze');
const argv = require('yargs')
	.argv;

const dir = require('./default/dir');
const file = require('./default/file');
const pattern = require('./default/pattern');
const project = require('./default/project');
const server = require('./default/server');
const wp = require('./default/wp');

const pkg = require(dir.pkg.path);

module.exports = deepFreeze(_.merge({
	pkg,
	argv,
	dir,
	file,
	pattern,
	server,
	wp
}, project));
