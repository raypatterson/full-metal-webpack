'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

module.exports = bundleName => {

	bundleName = cfg.production === false ?
		bundleName :
		cfg.wp.getOutputNameWithHash(bundleName);

	return path.join(cfg.wp.outputName, bundleName);

};
