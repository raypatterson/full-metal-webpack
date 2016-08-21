'use strict';

const fs = require('fs-jetpack');

module.exports = loader => {

	return fs.read(loader.resourcePath);

};
