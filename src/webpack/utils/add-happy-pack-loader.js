'use strict';

const HappyPack = require('happypack');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

module.exports = (loaderId, loaders, webpackConfig) => {

	const happyPackId = `happypack-${loaderId}`;

	if (cfg.production === false) {

		webpackConfig.plugins.push(new HappyPack({
			tempDir: cfg.file.absolute.happypack,
			id: happyPackId,
			threads: 4,
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
