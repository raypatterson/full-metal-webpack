'use strict';

const StyleLintPlugin = require('stylelint-webpack-plugin');

const linterConfig = require('../utils/get-config-file')('stylelint');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		configFile: linterConfig,
		files: '**/*.s?(a|c)ss',
		failOnError: false
	}));

};
