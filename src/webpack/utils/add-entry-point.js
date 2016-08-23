'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

const devFiles = require('./get-dev-files')();

const addTemplateLoader = require('./add-template-loader');

module.exports = function addEntryPoint(entryObject, entryPath, webpackConfig) {

	const entryName = path.dirname(entryPath);

	entryObject[entryName] = [
		path.join(cfg.file.absolute.pages, entryPath),
		addTemplateLoader(entryName, webpackConfig)
	].concat(devFiles);

	return entryObject;

};
