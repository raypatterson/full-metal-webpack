'use strict';

const lookup = require('look-up');

const projectRoot = require('./get-project-root');

module.exports = configName => lookup(`.${configName}rc.{js,json,yml,yaml}`, {
	cwd: projectRoot,
	dot: true
});
