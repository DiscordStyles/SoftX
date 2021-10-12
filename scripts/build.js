// GitHub action used to build scss files to the dist folder.

const compile = require('./compile');

compile({
	target: ['src', '_base.scss'],
	output: ['dist', 'SoftX.css']
});
