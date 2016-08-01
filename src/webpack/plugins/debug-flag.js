'use strict';

const webpack = require('webpack');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new webpack.DefinePlugin({
		DEBUG: true
	}));

};
