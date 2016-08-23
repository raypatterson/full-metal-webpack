'use strict';

const glob = require('globby');

const cfg = require('@raypatterson/sws-config');

const addEntryPoint = require('./add-entry-point');

module.exports = function addPlugins(webpackConfig) {

	webpackConfig.entry = glob.sync(
			cfg.pattern.js, {
				cwd: cfg.file.absolute.pages
			})
		.reduce((entryObject, entryPath) => {

			console.log('entryPath', entryPath);

			return addEntryPoint(entryObject, entryPath, webpackConfig);

		}, {});

};
