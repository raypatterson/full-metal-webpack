'use strict';

module.exports = config => {

	return Object
		.keys(config.file.extensions)
		.reduce((out, key) => {

			out[key] = `${config.file.index}.${config.file.extensions[key]}`;

			return out;

		}, {});

};
