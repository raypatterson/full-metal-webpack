'use strict';

/**
 * TODO: Make everything async to enable the use of `cosmiconfig` maybe?
 * https://github.com/davidtheclark/cosmiconfig
 */

const getConfigCustom = require('./get-config-custom');
const getConfigPreset = require('./get-config-preset');

module.exports = configName => getConfigCustom(configName) || getConfigPreset(configName);
