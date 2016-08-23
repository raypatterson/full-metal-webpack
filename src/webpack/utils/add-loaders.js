'use strict';

const _ = require('lodash');
const reqAll = require('req-all');

module.exports = function addLoaders(webpackConfig) {

	/**
	 * Import loader presets
	 * TODO: Import project loaders
	 */
	_.each(reqAll('../loaders'), loader => loader(webpackConfig));

};
