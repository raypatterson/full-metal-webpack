'use strict';

'use strict';

const HappyPack = require('happypack');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const getCachedLoader = require('../utils/get-cached-loader');

const LOADER_ID = 'happy-json';

const jsonHappyPack = new HappyPack({
	id: LOADER_ID,
	enabled: cfg.production === false,
	threads: 4,
	loaders: [
		'json-loader'
	]
});

const jsonLoader = {
	test: /\.json$/i,
	loader: combineLoaders([{
		loader: getCachedLoader('json', [])
	}, {
		loader: 'happypack/loader',
		query: {
			id: LOADER_ID
		}
	}])
};

module.exports = webpackConfig => {

	webpackConfig.plugins.push(jsonHappyPack);
	webpackConfig.module.loaders.push(jsonLoader);

};
