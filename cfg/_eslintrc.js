'use strict';

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
		'../node_modules/eslint-config-xo/index.js'
	],
	rules: {
		'padded-blocks': [
			RULE.warn,
			'always'
		]
	}
};
