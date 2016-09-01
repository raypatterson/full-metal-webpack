'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const cfg = require('@raypatterson/sws-config');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig, (err, stats) => {

	console.log('WEBPAAAACK');

	if (err) {

		return console.error(err);

	}

	const jsonStats = stats.toJson();

	if (jsonStats.errors.length > 0) {

		return console.error(jsonStats.errors);

	}

	if (jsonStats.warnings.length > 0) {

		console.warn(jsonStats.warnings);

	}

	console.info('Build Successful');

});

module.exports = function fmw(options) {

	if (options.program.production) {

		console.log('Building Static Files');

	} else {

		console.log('Starting Dev Server');

		const server = new WebpackDevServer(compiler, {

			// contentBase: options.cfg.file.dest,
			hot: true,
			quiet: false,
			noInfo: false,
			publicPath: '/',
			stats: {
				colors: true
			}

		});

		server.listen(cfg.server.port, cfg.server.domain, err => {

			if (err) {

				throw err;

			}

			console.log(`Dev Server started at: ${cfg.server.url}`);

		});

	}

};
