'use strict';

const program = require('commander');

const cfg = require('@raypatterson/sws-config');

const api = require('../src');

program
	.version('zero')
	.usage('fmw [options]')
	.option('-d, --debug', 'Enable debug mode')
	.option('-p, --production', 'Package for release')
	.parse(process.argv);

api({
	cfg,
	program
});
