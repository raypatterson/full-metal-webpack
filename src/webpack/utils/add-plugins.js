'use strict';

const path = require('path');
const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

const cfg = require('@raypatterson/sws-config');

module.exports = function addPlugins(webpackConfig) {

	/**
	 * Import plugin presets (order matters)
	 * TODO: Import project plugins
	 */

	webpackConfig.plugins.push(new ForceCaseSensitivityPlugin());

	/**
	 * TODO: Not sure how to add this plugin and use ESLint warning
	 * https://github.com/MoOx/eslint-loader#noerrorsplugin
	 */
	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());

	if (cfg.production === true) {

		webpackConfig.plugins.push(new webpack.optimize.OccurrenceOrderPlugin(true));
		webpackConfig.plugins.push(new webpack.optimize.DedupePlugin());
		webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

	} else {

		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

	}

	const filterPlugin = (list, id) => {

		let isLoading = false;

		const name = id.split(':')[0];
		const mode = id.split(':')[1];

		const reportLoad = (name, mode) => {

			console.info(`Load '${name}' plugin in '${mode}' mode.`);

		};

		const reportSkip = (name, mode) => {

			console.info(`Skip '${name}' plugin in '${mode}' mode.`);

		};

		const reportWarn = (name, mode) => {

			console.warn(`No '${mode}' mode for '${name}' plugin.`);

		};

		/**
		 * TODO: This plugin filtering logic is terrible.
		 */
		if (mode) {

			const cfgMode = cfg[mode];

			if (cfgMode === true) {

				reportLoad(name, mode);

				isLoading = true;

			} else if (mode.indexOf('no') === 0) {

				const noMode = mode.split('-')[1];

				if (cfg[noMode]) {

					reportSkip(name, mode);

				} else {

					reportWarn(name, noMode);

				}

			} else if (cfgMode === false) {

				if (mode.indexOf('no') === 0) {

					reportLoad(name, mode);

				} else {

					reportSkip(name, `no-${mode}`);

				}

			} else if (cfgMode === undefined) {

				reportWarn(name, mode);

			}

		} else {

			reportLoad(name, 'default');

			isLoading = true;

		}

		if (isLoading) {

			list.push(name);

		}

		return list;

	};

	const loadPlugin = name => {

		require(path.join('../plugins', name))(webpackConfig);

	};

	[
		'clean-dest:production',
		'debug-flag:debug',
		'lint-styles',
		'common-chunks',
		'split-path',
		'optimize-css:production',
		'stats-graph:production',
		'open-browser:no-production'

	].reduce(filterPlugin, [])
		.forEach(loadPlugin);

};
