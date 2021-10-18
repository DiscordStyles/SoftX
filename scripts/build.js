// GitHub action used to build scss files to the dist folder.
// You are not meant to run this locally.

const compile = require('./compile');
const {name, build} = require('./config.json');

compile({
	target: build.target,
	output: [...build.outputPath, `${name}.css`]
});