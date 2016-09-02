'use strict';

'use strict';

const combineLoaders = require('webpack-combine-loaders');

const getCachedLoader = require('../utils/get-cached-loader');

const jsonLoaders = combineLoaders(getCachedLoader('json', [{
	loader: 'json-loader'
}]));

module.exports = webpackConfig => {

	webpackConfig.module.loaders.push({
		test: /\.json$/i,
		loader: jsonLoaders
	});

};
