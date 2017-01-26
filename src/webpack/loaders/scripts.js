'use strict';

const Joi = require('webpack-validator').Joi;
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const getResourceConfig = require('../utils/get-resource-config');

const eslintConfig = getResourceConfig('eslint');
const babelConfig = getResourceConfig('babel');

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
		configFile: eslintConfig
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

	scriptsLoaders = [{
		loader: 'babel-loader'
	}];

	webpackConfig.module.loaders.push({
		test: /\.js$/i,
		loader: combineLoaders(scriptsLoaders),
		exclude: [
			new RegExp(cfg.file.node)
		],
		query: {
			cacheDirectory: !cfg.production,
			extends: babelConfig
		}
	});

};
