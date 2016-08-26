'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

const devFiles = require('./get-dev-files');
const addTemplateLoader = require('./add-template-loader');

module.exports = function addEntryPoint(entryObject, entryPath, webpackConfig) {

	const entryName = path.dirname(entryPath);
	const entryScript = path.join(cfg.file.pages, entryPath);
	const entryTemplate = addTemplateLoader(entryName, webpackConfig);

	entryObject[entryName] = [
		entryScript,
		entryTemplate
	].concat(devFiles);

	return entryObject;

};
