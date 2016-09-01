'use strict';

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new OptimizeCssAssetsPlugin());

};
