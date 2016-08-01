'use strict';

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const cfg = require('../../../cfg');

module.exports = webpackConfig => {

	webpackConfig.plugins.push(new OpenBrowserPlugin({
		url: cfg.server.url
	}));

};
