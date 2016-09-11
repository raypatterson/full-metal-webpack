'use strict';

const webpackValidator = require('webpack-validator');
const Joi = require('webpack-validator').Joi;

const cleanDest = require('./utils/clean-dest');
const addEntry = require('./utils/add-entry');
const addLoaders = require('./utils/add-loaders');
const addPlugins = require('./utils/add-plugins');

const webpackConfig = require('./config');

cleanDest();

addEntry(webpackConfig);
addLoaders(webpackConfig);
addPlugins(webpackConfig);

module.exports = webpackValidator(webpackConfig, {
	schemaExtension: Joi.object(webpackConfig.webpackSchemaExtension)
});
