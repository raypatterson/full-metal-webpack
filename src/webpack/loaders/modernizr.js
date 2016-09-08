'use strict';

/**
 * TODO: Inline Modernizr JS into `<head>`.
 */

const path = require('path');
const fs = require('fs-jetpack');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const projectRoot = require('../utils/get-project-root');
const addHappyPackLoader = require('../utils/add-happy-pack-loader');
const addCachedLoader = require('../utils/add-cached-loader');

const resourceConfigPath = path.resolve(projectRoot, '.modernizr-autorc');

module.exports = webpackConfig => {

	if (fs.exists(resourceConfigPath)) {

		if (cfg.debug === false) {

			/**
			 * NOTE: Disables output from Customizr
			 */
			process.argv.push('--quiet');

		} else {

			/**
			 * NOTE: Increases output from Customizr
			 */
			process.argv.push('--verbose');

		}

		const LOADER_ID = 'modernizr';

		let modernizrLoaders = [{
			loader: 'modernizr-auto-loader'
		}];

		modernizrLoaders = addHappyPackLoader(LOADER_ID, modernizrLoaders, webpackConfig);

		modernizrLoaders = addCachedLoader(LOADER_ID, modernizrLoaders);

		webpackConfig.module.loaders.push({
			test: /\.modernizr-autorc$/,
			loader: combineLoaders(modernizrLoaders)
		});

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

	}

};
