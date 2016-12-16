'use strict';

const path = require('path');
const combineLoaders = require('webpack-combine-loaders');
const Joi = require('webpack-validator').Joi;

const cfg = require('@raypatterson/sws-config');

const addCachedLoader = require('../utils/add-cached-loader');

const getEntryData = require('./get-entry-data');

module.exports = (pageSlug, webpackConfig) => {

	// Allow config to pass validation
	webpackConfig.webpackSchemaExtension.passthough = Joi.any();

	// Add config
	webpackConfig.passthough = {
		callback: (source, loader) => {

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

	const root = cfg.file.absolute.source;
	const pagePath = path.join(cfg.file.absolute.pages, pageSlug);

	const rootPathRelative = path.relative(root, pagePath);
	const pagePathRelative = path.relative(pagePath, root);

	const pageTmpl = path.join(rootPathRelative, cfg.file.bundle.tmpl);
	const pageHtml = path.join(pageSlug, cfg.file.bundle.html);

	// Add parsing loaders
	let templateLoaders = [{
		loader: 'html-loader',
		query: {
			attrs: [
				'img:src'
			],
			root: pagePathRelative
		}
	}, {
		loader: 'passthough-loader'
	}, {
		loader: pageTmpl
	}];

	const LOADER_ID = 'templates';

	// Cache loaders
	templateLoaders = addCachedLoader(LOADER_ID, templateLoaders);

	// Add output loaders that do not work with Cached loader
	templateLoaders = [{
		loader: 'file-loader',
		query: {
			name: pageHtml
		}
	}, {
		loader: 'extract-loader'
	}].concat(templateLoaders);

	return combineLoaders(templateLoaders);

};
