'use strict';

const path = require('path');
const pkgup = require('pkg-up');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const packageRoot = path.dirname(pkgup.sync(__dirname));

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new StyleLintPlugin({
		configFile: path.join(packageRoot, 'cfg/stylelint.config.js'),
		files: '**/*.s?(a|c)ss',
		failOnError: false
	}));

};
