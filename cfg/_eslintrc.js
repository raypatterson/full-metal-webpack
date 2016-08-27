'use strict';

const path = require('path');

const modulesPath = require('../src/webpack/utils/get-modules-path.js');

const RULE = {
	off: 0,
	warn: 1,
	error: 2
};

module.exports = {
	env: {
		es6: true,
		browser: true,
		commonjs: true
	},
	extends: [
		path.join(modulesPath.node, 'eslint-config-xo/index.js')
	],
	rules: {
		'padded-blocks': [
			RULE.warn,
			'always'
		]
	}
};
