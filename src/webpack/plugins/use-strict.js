'use strict';

const webpack = require('webpack');
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.NoErrorsPlugin());
	webpackConfig.plugins.push(new ForceCaseSensitivityPlugin());

};
