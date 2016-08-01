'use strict';

const path = require('path');
const argv = require('yargs')
	.argv;

const projectConfigPath = path.resolve(process.cwd(), argv.projectConfigPath || 'src/common/data');
const config = require(projectConfigPath);

module.exports = config;
