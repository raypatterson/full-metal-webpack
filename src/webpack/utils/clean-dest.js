'use strict';

const del = require('del');

const cfg = require('@raypatterson/sws-config');

module.exports = () => {

	if (cfg.clean) {

		del.sync([
			cfg.file.absolute.dest
		]);

	}

};
