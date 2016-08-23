'use strict';

const _ = require('lodash');
const deepFreeze = require('deep-freeze');
const argv = require('yargs').argv;

const defaults = require('./compose/defaults');
const project = require('./compose/project');

const config = _.merge(defaults, project, argv);

config.pkg = require('./compose/pkg')(config);
config.file.bundle = require('./compose/bundle')(config);

/**
 * ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫
 * Let it go, let it go!
 * Can't hold it back any more.
 * ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫
 */
module.exports = deepFreeze(config);
