'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

const getDevFiles = require('./get-dev-files');
const addTemplateLoader = require('./add-template-loader');

module.exports = function addEntryPoint(entryObject, entryPath, webpackConfig) {

	const devFiles = getDevFiles(webpackConfig);
	const entryName = path.dirname(entryPath);

	entryObject[entryName] = [
		path.join(cfg.file.pages, entryPath),
		addTemplateLoader(entryName, webpackConfig)
	].concat(devFiles);

	return entryObject;

};
