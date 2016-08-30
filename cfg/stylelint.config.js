'use strict';

const path = require('path');

const modulesPath = require('../src/webpack/utils/get-modules-path.js');

module.exports = {
	extends: [
		path.join(modulesPath.node, 'stylelint-config-standard/index.js')
	],
	rules: {
		indentation: 'tab'
	}
};
