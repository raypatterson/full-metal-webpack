'use strict';

const path = require('path');
const fs = require('fs-jetpack');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const projectRoot = require('../utils/get-project-root');
const getCachedLoader = require('../utils/get-cached-loader');

const resourceConfigPath = path.resolve(projectRoot, '.modernizr-autorc');

const modernizrLoaders = combineLoaders(getCachedLoader('modernizr', [{
	loader: 'modernizr-auto-loader'
}]));

module.exports = webpackConfig => {

	if (fs.exists(resourceConfigPath)) {

		webpackConfig.module.loaders.push({
			test: /\.modernizr-autorc$/,
			loader: modernizrLoaders
		});

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

	}

};
