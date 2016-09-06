'use strict';

'use strict';

const combineLoaders = require('webpack-combine-loaders');

const addHappyPackLoader = require('../utils/add-happy-pack-loader');
const addCachedLoader = require('../utils/add-cached-loader');

module.exports = webpackConfig => {

	const LOADER_ID = 'json';

	let jsonLoaders = [{
		loader: 'json-loader'
	}];

	jsonLoaders = addHappyPackLoader(LOADER_ID, jsonLoaders, webpackConfig);

	jsonLoaders = addCachedLoader(LOADER_ID, jsonLoaders);

	const jsonLoader = {
		test: /\.json$/i,
		loader: combineLoaders(jsonLoaders)
	};

	webpackConfig.module.loaders.push(jsonLoader);

};
