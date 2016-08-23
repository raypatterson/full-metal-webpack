'use strict';

const program = require('commander');

const api = require('../src');
const cfg = require('../src/config');

program
	.version(cfg.pkg.version)
	.usage('fmw [options]')
	.option('-d, --debug', 'Enable debug mode')
	.option('-p, --production', 'Package for release')
	.parse(process.argv);

api({
	cfg,
	program
});
