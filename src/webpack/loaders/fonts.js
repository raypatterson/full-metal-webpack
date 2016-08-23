'use strict';

const cfg = require('@raypatterson/sws-config');

module.exports = webpackConfig => {

	webpackConfig.module.loaders.push({
		test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
		loader: 'url',
		query: {
			limit: cfg.wp.maxInlineFileSizeLimit,
			minetype: 'application/font-woff',
			name: cfg.wp.outputPath
		}
	});

	webpackConfig.module.loaders.push({
		test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
		loader: 'file',
		query: {
			name: cfg.wp.outputPath
		}
	});

};
