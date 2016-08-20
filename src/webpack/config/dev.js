'use strict';

const path = require('path');
const glob = require('globby');
const webpack = require('webpack');
const fs = require('fs-jetpack');
const _ = require('lodash');

const getEntryData = require('../utils/get-entry-data');

const cfg = require('../../../cfg');

const webpackConfigDefault = require('./defaults');

const webpackConfig = Object.assign({}, webpackConfigDefault);

const hmr = path.join(cfg.dir.pkg.root, cfg.dir.node, 'webpack/hot/dev-server');
const wds = `${path.join(cfg.dir.pkg.root, cfg.dir.node, 'webpack-dev-server/client')}?${cfg.server.url}/`;

let entryName;
let entryJs;
let entryHtml;
let entryTmpl;

function createEntryPoint(obj, entryPath) {

	entryName = path.dirname(entryPath);

	entryJs = path.join(cfg.dir.absolute.pages, entryPath);
	entryHtml = path.join(entryName, cfg.file.bundle.html);
	entryTmpl = path.join('pages', entryName, cfg.file.bundle.tmpl);

	obj[entryName] = [
		entryJs,
		`file?name=${entryHtml}!extract!html?attrs[]=img:src&root=${cfg.dir.source}!@raypatterson/passthough-loader!${entryTmpl}`,
		hmr,
		wds
	];

	webpackConfig.commonChunks.push(entryName);

	return obj;

}

webpackConfig.entry = glob.sync(
		cfg.pattern.js, {
			cwd: cfg.dir.absolute.pages
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
		const localsPath = path.relative(cfg.dir.absolute.pages, resourceDir);

		const locals = getEntryData(resourceDir, cfg.file.config);
		locals.path = localsPath === '' ? '' : `/${localsPath}`;

		const common = cfg.public.data;

		callback(null, _.template(fs.read(loader.resourcePath))({
			locals,
			common
		}));

	}
};

require('../loaders/css')(webpackConfig);
require('../loaders/json')(webpackConfig);
require('../loaders/fonts')(webpackConfig);
require('../loaders/images')(webpackConfig);

require('../plugins/debug-flag')(webpackConfig);
require('../plugins/common-chunks')(webpackConfig);
require('../plugins/clean-dest')(webpackConfig);
require('../plugins/open-browser')(webpackConfig);

webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = webpackConfig;
