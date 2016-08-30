'use strict';

const path = require('path');
const pkgup = require('pkg-up');

const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const packageRoot = path.dirname(pkgup.sync(__dirname));

module.exports = webpackConfig => {

	// Allow ESLint config to pass validation
	webpackConfig.webpackSchemaExtension.eslint = Joi.any();

	console.log('include', cfg.file.absolute.source);

	// Add ESLint config
	webpackConfig.eslint = {
		emitWarning: true,
		emitError: true,
		failOnWarning: false,
		failOnError: true,
		fix: true,
		cache: true,
		configFile: path.join(packageRoot, 'cfg/eslint.config.js')
	};

	webpackConfig.module.preLoaders.push({
		test: /\.js$/i,
		loader: 'eslint-loader',
		exclude: [
			new RegExp(cfg.file.node)
		]
	});

};
