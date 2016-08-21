'use strict';

const protocol = 'http';
const domain = 'localhost';
const port = 8080;
const url = `${protocol}://${domain}:${port}`;

const config = {
	protocol,
	domain,
	port,
	url
};

module.exports = config;
