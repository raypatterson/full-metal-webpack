'use strict';

const glob = require('globby');

const cfg = require('@raypatterson/sws-config');

const addEntryPoint = require('./add-entry-point');

module.exports = webpackConfig => {

	webpackConfig.entry = glob.sync(
			cfg.pattern.js, {
				cwd: cfg.file.absolute.pages
			})
		.reduce((entryObject, entryPath) => {

			return addEntryPoint(entryObject, entryPath, webpackConfig);

		}, {});

};
