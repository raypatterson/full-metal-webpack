'use strict';

const Joi = require('webpack-validator').Joi;
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const resourceConfig = require('../utils/get-resource-config')('eslint');

// const getHappyPackLoader = require('../utils/get-happy-pack-loader');
const addHappyPackLoader = require('../utils/add-happy-pack-loader');
const addCachedLoader = require('../utils/add-cached-loader');

module.exports = webpackConfig => {

	const LOADER_ID = 'js';

	// Allow ESLint config to pass validation
	webpackConfig.webpackSchemaExtension.eslint = Joi.any();

	// Add ESLint config
	webpackConfig.eslint = {
		emitWarning: true,
		emitError: true,
		failOnWarning: false,
		failOnError: true,
		fix: true,
		cache: true,
		configFile: resourceConfig
	};

	let scriptsLoaders = [{
		loader: 'eslint-loader'
	}];

	scriptsLoaders = addHappyPackLoader(LOADER_ID, scriptsLoaders, webpackConfig);

	scriptsLoaders = addCachedLoader(LOADER_ID, scriptsLoaders);

	/**
	 * NOTE: `HappyPack` "inferring" doesn't support pre/post loaders.
	 * https://github.com/amireh/happypack/issues/48
	 */
	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: combineLoaders(scriptsLoaders),
		/**
		 * TODO: Use `include` instead of `exclude` for ESLint loader.
		 * @type {Array}
		 */
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
