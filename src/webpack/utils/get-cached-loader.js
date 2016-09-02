'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

module.exports = (uid, loaders) => {

	if (cfg.production === false) {

		loaders.unshift({
			loader: 'cached-loader',
			query: {
				cacheDirectory: cfg.file.absolute.dest,
				cacheIdentifier: path.join(cfg.file.absolute.dest, uid)
			}
		});

	}

	return loaders;

};
