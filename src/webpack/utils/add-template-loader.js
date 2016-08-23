'use strict';

const path = require('path');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const getEntryData = require('./get-entry-data');

module.exports = function addTemplateLoader(entryName, webpackConfig) {

	webpackConfig.passthough = {
		callback: function renderTemplate(source, loader) {

			loader.cacheable();

			const callback = loader.async();

			if (!callback) {

				return source;

			}

			const resourceDir = path.dirname(loader.resourcePath);
			const localsPath = path.relative(cfg.file.absolute.pages, resourceDir);

			const locals = getEntryData(resourceDir, cfg.file.config);
			locals.path = localsPath === '' ? '' : `/${localsPath}`;

			const common = cfg.public.data;

			callback(null, cfg.template(loader, {
				locals,
				common
			}));

		}
	};

	const entryHtml = path.join(entryName, cfg.file.bundle.html);
	const entryTmpl = path.join(cfg.file.pages, entryName, cfg.file.bundle.tmpl);

	return combineLoaders([
		{
			loader: 'file',
			query: {
				name: entryHtml
			}
		}, {
			loader: 'extract'
		}, {
			loader: 'html',
			query: {
				attrs: [
					'img:src'
				],
				root: cfg.file.source
			}
		}, {
			loader: '@raypatterson/passthough-loader'
		}, {
			loader: entryTmpl
		}
	]);

};
