// GitHub action used to build scss files to the dist folder.

const compile = require('./compile');

compile('./src/_base.css', 'dist', 'SoftX.css');
