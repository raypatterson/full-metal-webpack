'use strict';

const Joi = require('webpack-validator').Joi;
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const resourceConfig = require('../utils/get-resource-config')('eslint');
const getCachedLoader = require('../utils/get-cached-loader');

const scriptLoaders = combineLoaders(getCachedLoader('script', [{
	loader: 'eslint-loader'
}]));

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

	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: scriptLoaders,
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
