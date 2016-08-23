'use strict';

const webpackValidator = require('webpack-validator');

const Joi = require('webpack-validator').Joi;

const webpackSchemaExtension = Joi.object({
	passthough: Joi.any(),
	sassLoader: Joi.any()
});

const webpackConfigDev = require('./dev');

const webpackConfig = Object.assign({}, webpackConfigDev);

module.exports = webpackValidator(webpackConfig, {
	schemaExtension: webpackSchemaExtension
});
