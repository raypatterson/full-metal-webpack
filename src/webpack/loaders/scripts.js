'use strict';

const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const linterConfig = require('../utils/get-config-file')('eslint');

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
		configFile: linterConfig
	};

	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: 'eslint-loader',
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
