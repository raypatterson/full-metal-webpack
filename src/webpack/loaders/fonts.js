'use strict';

const HappyPack = require('happypack');
const combineLoaders = require('webpack-combine-loaders');

const cfg = require('@raypatterson/sws-config');

const getCachedLoader = require('../utils/get-cached-loader');

const WOFF_LOADER_ID = 'happy-woff';

const woffLoaders = [{
	loader: 'url-loader',
	query: {
		name: cfg.wp.outputPath,
		limit: cfg.wp.maxInlineFileSizeLimit,
		mimetype: 'application/font-woff'
	}
}];

const woffHappyPack = new HappyPack({
	id: WOFF_LOADER_ID,
	enabled: cfg.production === false,
	threads: 4,
	loaders: [
		combineLoaders(woffLoaders)
	]
});

const woffLoader = {
	test: /\.woff(2)?(\?v=[0-9]\.[0-9]+)?$/i,
	loader: combineLoaders([{
		loader: getCachedLoader('woff', [])
	}, {
		loader: 'happypack/loader',
		query: {
			id: WOFF_LOADER_ID
		}
	}])
};

const FONT_LOADER_ID = 'happy-font';

const fontLoaders = [{
	loader: 'file-loader',
	query: {
		name: cfg.wp.outputPath
	}
}];

const fontHappyPack = new HappyPack({
	id: FONT_LOADER_ID,
	enabled: cfg.production === false,
	threads: 4,
	loaders: [
		combineLoaders(fontLoaders)
	]
});

const fontLoader = {
	test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]+)?$/i,
	loader: combineLoaders([{
		loader: getCachedLoader('font', [])
	}, {
		loader: 'happypack/loader',
		query: {
			id: FONT_LOADER_ID
		}
	}])
};

module.exports = webpackConfig => {

	webpackConfig.plugins.push(woffHappyPack);
	webpackConfig.module.loaders.push(woffLoader);

	webpackConfig.plugins.push(fontHappyPack);
	webpackConfig.module.loaders.push(fontLoader);

};
