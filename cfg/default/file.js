'use strict';

const config = {

	config: 'config',

	bundle: [
		'js',
		'css',
		'html',
		'ejs'
	].reduce((obj, ext) => {

		obj[ext] = `index.${ext}`;

		return obj;

	}, {})
};

module.exports = config;
