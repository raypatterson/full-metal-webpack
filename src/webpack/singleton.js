'use strict';

const webpackValidator = require('webpack-validator');

const Joi = require('webpack-validator').Joi;

const webpackConfigDev = require('./dev');

const webpackConfig = Object.assign({}, webpackConfigDev);

module.exports = webpackValidator(webpackConfig, {
	schemaExtension: Joi.object(webpackConfig.webpackSchemaExtension)
});
