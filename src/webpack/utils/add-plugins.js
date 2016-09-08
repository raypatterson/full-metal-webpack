'use strict';

const path = require('path');

const cfg = require('@raypatterson/sws-config');

/**
 * TODO: Import project plugins
 * TODO: Not sure how to use `NoErrorsPlugin` plugin with ESLint warnings. https://github.com/MoOx/eslint-loader#noerrorsplugin
 */

module.exports = function addPlugins(webpackConfig) {

	const reportStatus = (name, mode, flag, status) => {

		if (cfg.debug === true) {

			console.info(`${status} '${name}' plugin while ${mode} mode is ${flag || flag === undefined ? 'active' : 'inactive'}.`);

		}

	};

	const reportWarn = (name, mode) => {

		if (cfg.debug === true) {

			console.warn(`No ${mode} mode for '${name}' plugin.`);

		}

	};

	const filterPlugin = (list, key) => {

		const keyDelimiter = ':';
		const omitDelimiter = '-';
		const omitPrefix = 'no';
		const defaultMode = 'default';

		const name = key.split(keyDelimiter)[0];

		let mode = key.split(keyDelimiter)[1] || defaultMode;

		const omit = mode.indexOf(omitPrefix) === 0;

		if (omit) {

			mode = mode.split(omitDelimiter)[1];

		}

		const flag = cfg[mode];

		let isLoading = false;

		if (flag === true || mode === defaultMode) {

			isLoading = !omit;

		} else if (flag === false) {

			isLoading = omit;

		} else {

			// Not in default mode, flag not found
			reportWarn(name, mode);

		}

		if (isLoading) {

			reportStatus(name, mode, flag, 'Loading');

			list.push(name);

		} else {

			reportStatus(name, mode, flag, 'Skipping');

		}

		return list;

	};

	const loadPlugin = name => {

		require(path.join('../plugins', name))(webpackConfig);

	};

	[
		// Skip in production
		'hot-module:no-production',
		'if-changed:no-production',
		'open-browser:no-production',
		// Load in debug
		'debug-flag:debug',
		// Load always
		'use-strict',
		'lint-styles',
		/**
		 * TODO: Make code splitting optional?
		 */
		'common-chunks',
		'split-path',
		// Load in production
		'optimize-output:production',
		'stats-graph:production'

	].reduce(filterPlugin, [])
		.forEach(loadPlugin);

};
