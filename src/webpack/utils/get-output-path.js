'use strict';

const cfg = require('@raypatterson/sws-config');

module.exports = cfg.production === false ?
	cfg.wp.outputPath :
	cfg.wp.getOutputPathWithHash(cfg.wp.outputPath);
