'use strict';

const HappyPack = require('happypack');
const Joi = require('webpack-validator').Joi;
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const resourceConfig = require('../utils/get-resource-config')('eslint');
const getCachedLoader = require('../utils/get-cached-loader');

const LOADER_ID = 'happy-js';

module.exports = webpackConfig => {

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

	/**
	 * NOTE: `HappyPack` "inferring" doesn't support pre/post loaders.
	 * https://github.com/amireh/happypack/issues/48
	 */
	webpackConfig.plugins.push(new HappyPack({
		id: LOADER_ID,
		threads: 4,
		loaders: [
			'eslint-loader'
		]
	}));

	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: combineLoaders(getCachedLoader('script', [{
			loader: 'eslint-loader'
		}, {
			loader: `happypack/loader?id=${LOADER_ID}`
		}])),
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
