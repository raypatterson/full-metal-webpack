'use strict';

const path = require('path');

const packageRoot = require('./get-package-root');

module.exports = configName => path.join(packageRoot, 'cfg', `${configName}.config.js`);
