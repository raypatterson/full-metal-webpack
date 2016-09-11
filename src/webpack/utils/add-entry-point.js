'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

const devFiles = require('./get-dev-files');
const addTemplateLoader = require('./add-template-loader');

module.exports = function addEntryPoint(entryObject, entryPath, webpackConfig) {

	const entryName = path.dirname(entryPath);
	const entryScript = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryPath));
	const entryTemplate = addTemplateLoader(entryName, webpackConfig);

	// const entryStyles = path.relative(cfg.file.absolute.source, path.join(cfg.file.absolute.pages, entryName, cfg.file.bundle.sass));

	entryObject[entryName] = [
		entryScript,
		// entryStyles,
		entryTemplate
	].concat(devFiles);

	return entryObject;

};
