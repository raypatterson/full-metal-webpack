'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const webpackConfig = require('../webpack.config');

const cfg = require('./config');

module.exports = function fmw(options) {

	if (options.program.production) {

		console.log('Build');

	} else {

		console.log('Starting Dev Server');

		const compiler = webpack(webpackConfig);

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
