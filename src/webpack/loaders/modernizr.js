'use strict';

const path = require('path');
const fs = require('fs-jetpack');
const combineLoaders = require('webpack-combine-loaders');
const HappyPack = require('happypack');

const projectRoot = require('../utils/get-project-root');
const getCachedLoader = require('../utils/get-cached-loader');

const resourceConfigPath = path.resolve(projectRoot, '.modernizr-autorc');

const modernizrLoaders = combineLoaders(getCachedLoader('modernizr', [{
	loader: 'modernizr-auto-loader'
}]));

const LOADER_ID = 'happy-modernizr';

module.exports = webpackConfig => {

	if (fs.exists(resourceConfigPath)) {

		// Add HappyPack
		webpackConfig.plugins.push(new HappyPack({
			id: LOADER_ID,
			threads: 4,
			loaders: [
				modernizrLoaders
			]
		}));

		webpackConfig.module.loaders.push({
			test: /\.modernizr-autorc$/,
			loader: `happypack/loader?id=${LOADER_ID}`
		});

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

	}

};
