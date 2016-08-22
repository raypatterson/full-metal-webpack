'use strict';

const path = require('path');
const glob = require('globby');
const webpack = require('webpack');
const _ = require('lodash');
const reqAll = require('req-all');

const getEntryData = require('../utils/get-entry-data');

const cfg = require('../../../cfg');

const webpackConfigDefault = require('./defaults');

const webpackConfig = Object.assign({}, webpackConfigDefault);

const hmr = path.join(cfg.file.pkg.root, cfg.file.node, 'webpack/hot/dev-server');
const wds = `${path.join(cfg.file.pkg.root, cfg.file.node, 'webpack-dev-server/client')}?${cfg.server.url}/`;

let entryName;
let entryJs;
let entryHtml;
let entryTmpl;

function createEntryPoint(obj, entryPath) {

	entryName = path.dirname(entryPath);

	entryJs = path.join(cfg.file.absolute.pages, entryPath);
	entryHtml = path.join(entryName, cfg.file.bundle.html);
	entryTmpl = path.join('pages', entryName, cfg.file.bundle.tmpl);

	obj[entryName] = [
		entryJs,
		`file?name=${entryHtml}!extract!html?attrs[]=img:src&root=${cfg.file.source}!@raypatterson/passthough-loader!${entryTmpl}`,
		hmr,
		wds
	];

	return obj;

}

webpackConfig.entry = glob.sync(
		cfg.pattern.js, {
			cwd: cfg.file.absolute.pages
		})
	.reduce(createEntryPoint, {});

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

/**
 * Import loader presets
 * TODO: Import project loaders
 */
_.each(reqAll('../loaders'), loader => loader(webpackConfig));

/**
 * Import plugin presets (order matters)
 * TODO: Import project plugins
 */
webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

[
	'../plugins/clean-dest',
	'../plugins/debug-flag',
	'../plugins/common-chunks',
	'../plugins/split-path',
	'../plugins/stats-graph',
	'../plugins/open-browser'

].forEach(pluginPath => {

	require(pluginPath)(webpackConfig);

});

module.exports = webpackConfig;
