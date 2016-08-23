'use strict';

const path = require('path');
const argv = require('yargs').argv;

const defaultProjectConfigPath = 'fmw.config.js';
const projectConfigPath = path.resolve(process.cwd(), argv.projectConfigPath || defaultProjectConfigPath);

module.exports = require(projectConfigPath);
