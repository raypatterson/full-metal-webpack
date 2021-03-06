'use strict';

const combineLoaders = require('webpack-combine-loaders');
const HappyPack = require('happypack');

/* eslint-disable new-cap */
const happyThreadPool = HappyPack.ThreadPool({size: 7});
/* eslint-enable new-cap */

const cfg = require('@raypatterson/sws-config');

module.exports = (loaderId, loaders, webpackConfig) => {

	const happyPackId = `happypack-${loaderId}`;

	if (cfg.happy === true && cfg.production === false) {

		webpackConfig.plugins.unshift(new HappyPack({
			cache: true,
			debug: cfg.debug,
			verbose: cfg.debug,
			tempDir: cfg.file.absolute.happypack,
			id: happyPackId,
			threadPool: happyThreadPool,
			loaders: [
				combineLoaders(loaders)
			]
		}));

	}

	return (cfg.happy === true && cfg.production === false) ? [{
		loader: 'happypack/loader',
		query: {
			id: happyPackId
		}
	}] : loaders;

};
