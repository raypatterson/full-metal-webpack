'use strict';

const path = require('path');
const fs = require('fs-jetpack');

module.exports = function getEntryData(dir, filename) {

	let data = {};

	const configPath = path.join(dir, filename);
	const configPathJs = `${configPath}.js`;
	const configPathJson = `${configPath}.json`;

	if (fs.exists(configPathJs)) {

		data = require(configPathJs);

	} else if (fs.exists(configPathJson)) {

		data = fs.read(configPathJson, 'json');

	} else {

		// console.log('no config');

	}

	return data;

};
