'use strict';

const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

module.exports = webpackConfig => {

	/**
	 * TODO: Not sure how to use `NoErrorsPlugin` plugin with ESLint warnings. https://github.com/MoOx/eslint-loader#noerrorsplugin
	 */
	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
	webpackConfig.plugins.push(new ForceCaseSensitivityPlugin());

};
