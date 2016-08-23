'use strict';

const config = {

	/**
	 * Inline base64 URLs for <=8k images, direct URLs for the rest
	 * @type {Number}
	 */
	maxInlineFileSizeLimit: 8192,

	/**
	 * Generic output file path
	 * @type {String}
	 */
	outputName: '[name]',

	/**
	 * Generic output file path
	 * @type {String}
	 */
	outputPath: '[path][name].[ext]',

	/**
	 * Prefix for output file paths
	 * @type {String}
	 */
	publicPath: '/'

};

module.exports = config;
