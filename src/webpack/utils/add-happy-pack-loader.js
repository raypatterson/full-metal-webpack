'use strict';

const combineLoaders = require('webpack-combine-loaders');
const HappyPack = require('happypack');

// eslint-disable-next-line babel/new-cap
const happyThreadPool = HappyPack.ThreadPool({
	size: 7
});

const cfg = require('@raypatterson/sws-config');

module.exports = (loaderId, loaders, webpackConfig) => {

	const happyPackId = `happypack-${loaderId}`;

	if (cfg.production === false) {

		webpackConfig.plugins.push(new HappyPack({
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

	return cfg.production === false ? [{
		loader: 'happypack/loader',
		query: {
			id: happyPackId
		}
	}] : loaders;

};
