'use strict';

const path = require('path');

const all = '**/*';

const config = {
	all,
	js: `${all}.js`,
	css: `${all}.css`,
	json: `${all}.json`,
	jade: `${all}.jade`,
	html: `${all}.html`,
	templates: `${all}.jade`,
	sass: `${all}.{scss,sass}`,
	svg: `${all}.svg`, // Separate SVG in case it is used as a font & image format
	/**
	 * TODO: See if `woff[0-9]?` font globbing pattern works
	 */
	fonts: `${all}.{ttf,eot,svg,woff,woff2?}`,
	images: `${all}.{jpe?g,png,gif}`,
	ignore: (pattern, dir) => {

		return `!${path.join(dir || '', pattern)}`;

	}
};

module.exports = config;
