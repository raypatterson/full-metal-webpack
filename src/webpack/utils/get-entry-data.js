'use strict';

const path = require('path');
const fs = require('fs-jetpack');

module.exports = (dir, filename) => {

	let data = {};

	const configPath = path.join(dir, filename);
	const configPathJs = `${configPath}.js`;
	const configPathJson = `${configPath}.json`;

	if (fs.exists(configPathJs)) {

		/* eslint-disable import/no-dynamic-require */
		data = require(configPathJs);
		/* eslint-enable import/no-dynamic-require */

	} else if (fs.exists(configPathJson)) {

		data = fs.read(configPathJson, 'json');

	} else {

		// console.log('no config');

	}

	return data;

};
