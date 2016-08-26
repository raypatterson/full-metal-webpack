'use strict';

const path = require('path');

const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const modulesPath = require('../utils/get-modules-path.js');

module.exports = webpackConfig => {

	// Allow ESLint config to pass validation
	webpackConfig.webpackSchemaExtension.eslint = Joi.any();

	// Add ESLint config
	webpackConfig.eslint = {
		emitWarning: true,
		emitError: true,
		failOnWarning: false,
		failOnError: true,
		configFile: path.join(modulesPath.root, 'cfg/_eslintrc.js')
	};

	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: 'eslint-loader',
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
