'use strict';

const StyleLintPlugin = require('stylelint-webpack-plugin');

const resourceConfig = require('../utils/get-resource-config')('stylelint');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		configFile: resourceConfig,
		files: '**/*.s?(a|c)ss',
		failOnError: false
	}));

};
