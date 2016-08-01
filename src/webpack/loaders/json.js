'use strict';

module.exports = webpackConfig => {

	webpackConfig.module.loaders.push({
		test: /\.json$/i,
		loader: 'json'
	});

};
