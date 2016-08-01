'use strict';

const cfg = require('../../../cfg');

module.exports = webpackConfig => {

	webpackConfig.module.loaders.push({
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: 'url',
		query: {
			limit: cfg.wp.maxInlineFileSizeLimit,
			name: cfg.wp.outputPath
		}
	});

};
