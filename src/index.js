'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const httpServer = require('http-server');
// const liveServer = require('live-server');
const opener = require('opener');

const cfg = require('@raypatterson/sws-config');

const webpackConfig = require('../webpack.config');

const startPreviewServer = () => {

	console.log('Starting Preview Server');

	httpServer.createServer({
		root: cfg.file.dest
	}).listen(cfg.server.port, cfg.server.host, () => {

		opener(cfg.server.url);

		console.log(`Preview Server started at: ${cfg.server.url}`);

	});

};

const startProductionBuild = webpackConfig => {

	console.info('Starting Build');

	webpack(webpackConfig, (err, stats) => {

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

		if (cfg.open) {

			startPreviewServer();

		}

	});

};

const startDevServer = webpackConfig => {

	console.info('Starting Dev Server');

	if (cfg.debug === false) {

		const dashboard = new Dashboard();

		webpackConfig.plugins.push(new DashboardPlugin(dashboard.setData));

	}

	const server = new WebpackDevServer(webpack(webpackConfig), {

		hot: true,
		quiet: cfg.debug === false,
		noInfo: cfg.debug === false,
		publicPath: '/',
		stats: {
			colors: true
		}

	});

	server.listen(cfg.server.port, cfg.server.host, err => {

		if (err) {

			throw err;

		}

		console.log(`Dev Server started at: ${cfg.server.url}`);

	});

};

if (cfg.production) {

	startProductionBuild(webpackConfig);

} else {

	startDevServer(webpackConfig);

}

module.exports = true;
