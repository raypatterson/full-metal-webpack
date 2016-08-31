'use strict';

const path = require('path');
const fs = require('fs-jetpack');

const projectRoot = require('../utils/get-project-root');

const resourceConfigPath = path.resolve(projectRoot, '.modernizr-autorc');

module.exports = webpackConfig => {

	if (fs.exists(resourceConfigPath)) {

		webpackConfig.module.loaders.push({
			test: /\.modernizr-autorc$/,
			loader: 'modernizr-auto-loader'
		});

		webpackConfig
			.resolve
			.alias
			.modernizr$ = resourceConfigPath;

	}

};
