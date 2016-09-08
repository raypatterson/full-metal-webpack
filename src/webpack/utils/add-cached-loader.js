'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

module.exports = (uid, loaders) => {

	if (cfg.production === false) {

		loaders.unshift({
			loader: 'cached-loader',
			query: {
				cacheDirectory: cfg.file.cached,
				cacheIdentifier: path.join(cfg.file.cached, `cached-${uid}`)
			}
		});

	}

	return loaders;

};
