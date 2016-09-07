'use strict';

const cleanDest = require('./utils/clean-dest');
const addEntry = require('./utils/add-entry');
const addLoaders = require('./utils/add-loaders');
const addPlugins = require('./utils/add-plugins');

const webpackConfigDefault = require('./defaults');

cleanDest();

const webpackConfig = Object.assign({}, webpackConfigDefault);

addEntry(webpackConfig);
addLoaders(webpackConfig);
addPlugins(webpackConfig);

module.exports = webpackConfig;
