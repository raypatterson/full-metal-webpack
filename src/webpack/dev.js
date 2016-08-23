'use strict';

const addEntry = require('./utils/add-entry');
const addLoaders = require('./utils/add-loaders');
const addPlugins = require('./utils/add-plugins');

const webpackConfigDefault = require('./defaults');

const webpackConfig = Object.assign({}, webpackConfigDefault);

addEntry(webpackConfig);
addLoaders(webpackConfig);
addPlugins(webpackConfig);

module.exports = webpackConfig;
